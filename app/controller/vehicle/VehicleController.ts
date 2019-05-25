
import { cx_vhc as Vehicle } from "../../entities/vehicle/cx_vhc";
import { cx_vhc_opt_map as OptionMap } from '../../entities/vehicle/cx_vhc_opt_map'
import { cx_vhc_img as ImageVehicle } from '../../entities/vehicle/cx_vhc_img'
import { Request, Response, NextFunction } from "express";
import { MyUtil } from '../../utils/MyUtil';
import VehicleService from "../../service/vehicle/VehicleService";
import OptionMapService from "../../service/vehicle/OptionMapService";
import ImageService from "../../service/vehicle/ImageService";
import OptionService from "../../service/vehicle/OptionService";
import TypeService from "../../service/vehicle/TypeVehicleService"
import BrandService from "../../service/vehicle/BrandService"
import TransissionService from "../../service/vehicle/TransmissionService"
import DesignService from "../../service/vehicle/DesignService"
import FuelService from "../../service/vehicle/FuelService"
import ModelService from "../../service/vehicle/ModelService"
import SeatService from "../../service/vehicle/SeatService"
import { HandleCheck } from "../../utils/HandleCheck";
import { type } from "os";


export default class VehicleController {
    private vehicleService: VehicleService;
    private optionService: OptionService;
    private optMapService: OptionMapService;
    private imageService: ImageService;
    private typeService: TypeService;
    private brandService: BrandService;
    private transissionService: TransissionService;
    private designService: DesignService;
    private fuelService: FuelService;
    private modelService: ModelService;
    private seatService: SeatService

    constructor() {
        this.vehicleService = new VehicleService();
        this.optionService = new OptionService();
        this.optMapService = new OptionMapService();
        this.imageService = new ImageService();
        this.typeService = new TypeService();
        this.brandService = new BrandService();
        this.transissionService = new TransissionService();
        this.designService = new DesignService();
        this.fuelService = new FuelService();
        this.modelService = new ModelService();
        this.seatService = new SeatService();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllVehicle ==> GET");

        await this.vehicleService.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    // editVehicle = async (req: Request, res: Response, next: NextFunction) => {
    //     console.log("Received editVehicle ==> PUT");
    //     var vehicle: Vehicle = new Vehicle();
    //     var id = req.body.vch_id;
    //     vehicle = req.body;

    //     await this.vehicleService.update(id, vehicle).then((result) => {
    //         MyUtil.handleSuccess(result, res)
    //     }).catch(err => MyUtil.handleError(err, res));

    // };

    postVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received postVehicle ==> POST");

        let checkVehicle, checkOptions = [];
        checkOptions[0] = true
        let vehicle: Vehicle = new Vehicle(), optionMaps: Array<OptionMap> = new Array<OptionMap>();
        let check = await this.convertDataVehicle(req, res);
        let isEdit = (req.body["type_post"] && req.url == "/edit-car") ? true : false

        if (!check) {
            MyUtil.handleError({ "message": "Data not true" }, res);
            return;
        }

        vehicle = check[0]
        let vhc_imgs = check[1]
        let vhc_opts = check[2]

        let result;
        vehicle["vhc_slug"] = MyUtil.slug(vehicle.vhc_bran_name + " " + vehicle.vhc_modl_name + " " + vehicle.vhc_name)
        if (!isEdit)
            checkVehicle = await this.vehicleService.findByName(vehicle.vhc_slug).catch(err => MyUtil.handleError(err, res))
        else checkVehicle = false

        if (checkVehicle) {
            checkVehicle = false
            let err = { "message": "vehicle is already exist" };
            MyUtil.handleError(err, res);
            return
        }
        else {
            if (vhc_opts !== undefined && vhc_opts.trim().toString() != null) {
                checkOptions = await this.getOptionsFromVehicle(vhc_opts, res, optionMaps);
            }
            if (checkOptions[0]) {
                if (isEdit) {
                    var vhc = await this.vehicleService.getOne(vehicle.vhc_id)
                    vehicle = Object.assign(vhc, vehicle)
                    result = await this.vehicleService.update(vehicle.vhc_id, vehicle).catch(err => MyUtil.handleError(err, res))
                }
                else
                    result = await this.vehicleService.create(vehicle).catch(err => MyUtil.handleError(err, res))

                let vch_id = result ? result.vhc_id : 0;
                optionMaps = checkOptions[1] ? checkOptions[1] : []
                optionMaps.map(function (optMap) {
                    optMap.vhc_id = vch_id;
                    return optMap;
                })

                if (result) {
                    if (isEdit) {
                        await this.optMapService.deleteByVehicleId(vch_id)
                       
                    }
                    if (vhc_opts && vhc_opts != undefined && vhc_opts.trim() != "") {
                        for (let i = 0; i < optionMaps.length; i++)
                            await this.optMapService.create(optionMaps[i]).catch(err => MyUtil.handleError(err, res));
                    }
                    var img;
                    if (vhc_imgs && vhc_imgs != undefined && vhc_imgs.trim() != "") {
                        if (isEdit){
                             img  = await this.imageService.update(vehicle.vhc_id, vhc_imgs)
                        }
                        if(!isEdit || img == undefined){
                            await this.postListImageVehicle(vhc_imgs, result, res).catch(err => MyUtil.handleError(err, res));
                        }
                    }
                }

                return result;

            }
        }
    };

    postCar = async (req: Request, res: Response, next: NextFunction) => {
        var result = await this.postVehicle(req, res, next);
        MyUtil.handleSuccess(result, res)
    }

    editCar = async (req: Request, res: Response, next: NextFunction) => {
        req.body = Object.assign(req.body, { type_post: 1 })
        console.log("Received edittVehicle ==> POST")
        var result = await this.postVehicle(req, res, next);
        MyUtil.handleSuccess(result, res)
    }

    deleteVehicle = async (vhc_id) => {
    }

    convertDataVehicle = async (req, res) => {
        let checkOptions = [], checkBrand, checkType, checkTransisssion, checkFuel, checkModel, checkDesign, checkSeat;
        checkOptions[0] = true
        let vehicle: Vehicle = new Vehicle();

        let data = req.body;

        if (!(data && data["vhc_name"] && data["vhc_bran_name"] && data["vhc_type_name"] && data["vhc_modl_name"]
            && data["vhc_fuel_name"] && data["vhc_seat_num"] && data["vhc_tms_name"] && data["vhc_dgn_name"])) {
            MyUtil.handleError({ message: "data is not true" }, res)
            return false
        }

        let vhc_imgs = req.body.vhc_imgs, vhc_opts = req.body.vhc_opts;
        let vhc_egin_num = req.body.vhc_egin_num;

        checkType = await HandleCheck.checkOptionVehicle(this.typeService, MyUtil.slug(data["vhc_type_name"]))
        if (checkType)
            checkBrand = await HandleCheck.checkBrandVehicle(this.brandService, { "vhc_bran_name": data["vhc_bran_name"], vhc_type_id: checkType["vhc_type_id"] })
        checkDesign = await HandleCheck.checkOptionVehicle(this.designService, data["vhc_dgn_name"])
        checkFuel = await HandleCheck.checkOptionVehicle(this.fuelService, MyUtil.slug(data["vhc_fuel_name"]))
        checkModel = await HandleCheck.checkOptionVehicle(this.modelService, data["vhc_modl_name"])
        checkSeat = await HandleCheck.checkOptionVehicle(this.seatService, data["vhc_seat_num"])
        checkTransisssion = await HandleCheck.checkOptionVehicle(this.transissionService, MyUtil.slug(data["vhc_tms_name"]))

        if (!checkBrand || !checkDesign || !checkFuel || !checkModel || !checkTransisssion || !checkSeat) {
            MyUtil.handleError({ message: "data is not true" }, res)

            return false
        }
        data["vhc_type_id"] = checkType["vhc_type_id"]
        data["vhc_type_name"] = checkType["vhc_type_name"]
        data["vhc_bran_id"] = checkBrand["vhc_bran_id"]
        data["vhc_bran_name"] = checkBrand["vhc_bran_name"]
        data["vhc_seat_id"] = checkSeat["vhc_seat_id"]
        data["vhc_seat_num"] = checkSeat["vhc_seat_num"]
        data["vhc_modl_id"] = checkModel["vhc_modl_id"]
        data["vhc_modl_name"] = checkModel["vhc_modl_name"]
        data["vhc_tms_id"] = checkTransisssion["vhc_tms_id"]
        data["vhc_tms_name"] = checkTransisssion["vhc_tms_name"]
        data["vhc_dgn_id"] = checkDesign["vhc_dgn_id"]
        data["vhc_dgn_name"] = checkDesign["vhc_dgn_name"]
        data["vhc_fuel_id"] = checkFuel["vhc_fuel_id"]
        data["vhc_fuel_name"] = checkFuel["vhc_fuel_name"]
        vehicle["vhc_slug"] = MyUtil.slug(data["vhc_bran_name"] + " " + vehicle["vhc_modl_name"] + " " + vehicle["vhc_name"])
        if (checkBrand["vhc_type_id"] !== checkType["vhc_type_id"]) {
            MyUtil.handleError({ message: "brand invalid" }, res)
            return false;
        }

        delete data["vhc_opts"];
        delete data["vhc_imgs"]

        vehicle = data;
        vehicle["vhc_egin_num"] = parseFloat(vhc_egin_num);
        vehicle["vhc_slug"] = MyUtil.slug(vehicle.vhc_bran_name + " " + vehicle.vhc_modl_name + " " + vehicle.vhc_name)

        return [vehicle, vhc_imgs, vhc_opts]
    }

    postListImageVehicle = async (images: string, vehicle, res: Response) => {
        let list;
        if (images !== undefined && images.trim() != "") {
            list = MyUtil.trimArray(images, ",");
        }
        var slug = JSON.stringify(vehicle.vhc_slug)

        let arr: Array<ImageVehicle> = new Array<ImageVehicle>();
        if (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i]) {
                    let imageVehicle = new ImageVehicle();
                    imageVehicle.vhc_img_link = list[i];
                    imageVehicle.vhc_img_name = MyUtil.slug(slug + " " + i);
                    imageVehicle.vhc_tbl_id = vehicle.vhc_id;
                    imageVehicle.vhc_tbl_name = "cx_vhc"
                    arr.push(imageVehicle)
                }

            }
            await this.imageService.createList(arr).catch((error) => MyUtil.handleError(error, res));
        }

    }

    getOptionsFromVehicle = async (options: string, res: Response, optionMaps: Array<OptionMap>) => {
        let list = MyUtil.trimArray(options, ",");
        let checkOptions = true;

        for (var i = 0; i < list.length; i++) {
            let option = await this.optionService.findByName(list[i]).catch(err => MyUtil.handleError(err, res))
            let optionMap = new OptionMap();
            if (option) {
                optionMap.vhc_opt_id = option ? option.vhc_opt_id : null;
                optionMaps.push(optionMap)
            } else {
                checkOptions = false;
                let err = { "message": "option " + list[i] + " không tồn tại" };
                MyUtil.handleError(err, res);
            }

        }
        return [checkOptions, optionMaps];
    }

    postListVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle vehicle  by name==> GET");
        let list = new Array<Vehicle>();
        list = req.body;
        var result = await this.vehicleService.createList(list).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);

    }

    getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle vehicle  by id==> GET");
        let vhc_id = req.query.vhc_id;

        let result = await this.vehicleService.getDetailVehicle(vhc_id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }
    getOne = async (vhc_id) => {
        return await this.vehicleService.getOne(vhc_id)
    }

    getVehicleByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Vehicle vehicle  by name==> GET");
        let id = req.query.vhc_name;

        var result = await this.vehicleService.findByVehicleName(id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getVehicleOption = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle vehicle  by option==> GET");
        let option = req.query;
        var result = await this.vehicleService.findByVehicleOption(option).catch(err => MyUtil.handleError(err, res))

        MyUtil.handleSuccess(result, res);
    }

    // getDetailVehicle = async (vhc_id: number) => {
    //     let vch_id = vhc_id;
    //     let vehicle;

    //     if (vch_id) {
    //         let vhc_imgs, vhc_opts;
    //         vehicle = await this.vehicleService.getOne(vch_id).catch(err => MyUtil.handleErrorFunction(err))
    //         let optionIds = [];
    //         await this.optMapService.findByVehicleId(vch_id)
    //             .catch(err => MyUtil.handleErrorFunction(err))
    //             .then(result => {
    //                 let length = result ? result.length : 0;
    //                 for (let i = 0; i < length; i++) {
    //                     optionIds[i] = result[i].vhc_opt_id;
    //                 }

    //             })
    //         if (optionIds.length > 0) {
    //             await this.optionService.findIds(optionIds).then(result => {
    //                 if (result) {
    //                     vehicle["vhc_opts"] = result
    //                 };
    //             })
    //         }

    //         await this.imageService.findByImageTable("cx_vhc", vch_id).catch(err => MyUtil.handleErrorFunction(err))
    //             .then(result => {
    //                 vhc_imgs = result;
    //             })
    //         if (vhc_imgs) {
    //             vehicle["vhc_imgs"] = vhc_imgs
    //         }

    //         return vehicle;

    //     } else {
    //         let err = { message: "vhc_id not exits" }
    //         MyUtil.handleErrorFunction(err)
    //     }
    // }

}