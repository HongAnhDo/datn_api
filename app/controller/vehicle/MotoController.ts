
import { cx_vhc_moto as Vehicle } from "../../entities/vehicle/cx_vhc_moto";
import { cx_vhc_img as ImageVehicle } from '../../entities/vehicle/cx_vhc_img'
import { Request, Response, NextFunction } from "express";
import { MyUtil } from '../../utils/MyUtil';
import MotoService from "../../service/vehicle/MotoService";
import ImageService from "../../service/vehicle/ImageService";
import VehicleService from "../../service/vehicle/VehicleService";
import OptionMapService from "../../service/vehicle/OptionMapService";
import OptionService from "../../service/vehicle/OptionService";
import TypeService from "../../service/vehicle/TypeVehicleService"
import BrandService from "../../service/vehicle/BrandService"
import TransissionService from "../../service/vehicle/TransmissionService"
import DesignService from "../../service/vehicle/DesignService"
import FuelService from "../../service/vehicle/FuelService"
import { HandleCheck } from "../../utils/HandleCheck";


export default class MotoController {
    private imageService: ImageService;
    private typeService: TypeService;
    private brandService: BrandService;
    private transissionService: TransissionService;
    private designService: DesignService;
    private fuelService: FuelService;
    private motoService: MotoService

    constructor() {
        this.motoService = new MotoService();
        this.imageService = new ImageService();
        this.typeService = new TypeService();
        this.brandService = new BrandService();
        this.transissionService = new TransissionService();
        this.designService = new DesignService();
        this.fuelService = new FuelService();

    }


    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllMoto ==> GET");

        await this.motoService.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editVehicle ==> PUT");

        var vehicle: Vehicle = new Vehicle();
        var id = req.body.vhc_id;

        vehicle = req.body;

        await this.motoService.update(id, vehicle).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res));

    };

    postVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received postVehicle ==> POST");

        let checkVehicle;
        let isEdit = (req.body["type_post"] && req.url == "/edit-motorbike") ? true : false
        let check = await this.convertDataVehicle(req, res);
        if (!check)
            return;
        let vehicle: Vehicle = new Vehicle();
        vehicle = check[0];
        let vhc_imgs = check[1];

        if (!isEdit)
        checkVehicle = await this.motoService.findByName(vehicle.vhc_slug).catch(err => MyUtil.handleError(err, res))
        else checkVehicle = false
        if (checkVehicle) {
            let err = { "message": "vehicle is already exist" };
            MyUtil.handleError(err, res);
            return
        }
        else {
            let result;
            if (isEdit) {
                var vhc = await this.motoService.getOne(vehicle.vhc_id)
                vehicle = Object.assign(vhc, vehicle)
                result = await this.motoService.update(vehicle.vhc_id, vehicle).catch(err => MyUtil.handleError(err, res))
            }
            else result = await this.motoService.create(vehicle).catch(err => MyUtil.handleError(err, res))
            if (result) {
                var img;
                if (isEdit){
                    img  = await this.imageService.update(vehicle.vhc_id, vhc_imgs)
               }
               if(!isEdit || img == undefined){
                   await this.postListImageVehicle(vhc_imgs, result, res).catch(err => MyUtil.handleError(err, res));
               }

            }
            return result;
        }
    };

    postMotorbike = async (req, res, next) => {
        var result = await this.postVehicle(req, res, next);
        MyUtil.handleSuccess(result, res);
    }

    convertDataVehicle = async (req, res) => {
        let checkBrand, checkType, checkTransisssion, checkFuel, checkDesign;
        let data = req.body;
        let vehicle;

        if (!(data && data["vhc_name"] && data["vhc_bran_name"] && data["vhc_type_name"])) {
            MyUtil.handleError({ message: "data invalid" }, res)
            return false;
        }

        let vhc_imgs = req.body.vhc_imgs;
        let vhc_egin_num = req.body.vhc_egin_num;

        checkType = await HandleCheck.checkOptionVehicle(this.typeService, MyUtil.slug(data["vhc_type_name"] + ""))
        if (checkType)
            checkBrand = await HandleCheck.checkBrandVehicle(this.brandService, { "vhc_bran_name": data["vhc_bran_name"], vhc_type_id: checkType["vhc_type_id"] })

        checkFuel = await HandleCheck.checkOptionVehicle(this.fuelService, MyUtil.slug(data["vhc_fuel_name"] + ""))
        checkTransisssion = await HandleCheck.checkOptionVehicle(this.transissionService, MyUtil.slug(data["vhc_tms_name"] + ""))

        if (!checkBrand || !checkFuel || !checkTransisssion || !checkType) {
            MyUtil.handleError({ message: "data is not true" }, res)
            return false;
        }
        data["vhc_type_id"] = checkType["vhc_type_id"]
        data["vhc_type_name"] = checkType["vhc_type_name"]
        data["vhc_bran_id"] = checkBrand["vhc_bran_id"]
        data["vhc_bran_name"] = checkBrand["vhc_bran_name"]
        data["vhc_fuel_id"] = checkFuel["vhc_fuel_id"]
        data["vhc_fuel_name"] = checkFuel["vhc_fuel_name"]
        data["vhc_tms_id"] = checkTransisssion["vhc_tms_id"]
        data["vhc_tms_name"] = checkTransisssion["vhc_tms_name"]

        // if (checkBrand["vhc_type_id"] !== checkType["vhc_type_id"]) {
        //     console.log(checkBrand["vhc_type_id"])
        //     console.log(checkType["vhc_type_id"])
        //     console.log(checkBrand["vhc_bran_name"])
        //     MyUtil.handleError({ message: "brand invalid" }, res)
        //     return false;
        // }

        delete data["vhc_imgs"]

        vehicle = data;
        vehicle["vhc_egin_num"] = parseFloat(vhc_egin_num);
        vehicle["vhc_slug"] = MyUtil.slug(vehicle.vhc_bran_name + " " + vehicle.vhc_name);
        // console.log(vehicle)
        return [vehicle, vhc_imgs]

    }


    postListImageVehicle = async (images: string, vehicle, res: Response) => {
        let list;

        if (images !== undefined && images.toString().trim() !== "") {
            list = MyUtil.trimArray(images, ",");
        }
        let arr: Array<ImageVehicle> = new Array<ImageVehicle>();
        if (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i]) {
                    let imageVehicle = new ImageVehicle();
                    imageVehicle.vhc_img_link = list[i];
                    imageVehicle.vhc_img_name = MyUtil.slug(vehicle.vhc_bran_name + " " + vehicle.vhc_name);
                    imageVehicle.vhc_tbl_id = vehicle.vhc_id;
                    imageVehicle.vhc_tbl_name = "cx_vhc"
                    arr.push(imageVehicle)
                }

            }
            await this.imageService.createList(arr).catch((error) => MyUtil.handleError(error, res));
        }

    }

    getVehicleById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Vehicle vehicle  by id==> GET");
        let id = req.query.vhc_id;

        var result = await this.motoService.getDetailVehicle(id).catch(err => MyUtil.handleError(err, res))

        MyUtil.handleSuccess(result, res);
    }

    getVehicleByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Vehicle vehicle  by name==> GET");
        let id = req.query.vhc_name;

        var result = await this.motoService.findByVehicleName(id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getVehicleOption = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle vehicle  by option==> GET");
        let option = req.query;

        var result = await this.motoService.findByVehicleOption(option).catch(err => MyUtil.handleError(err, res))

        MyUtil.handleSuccessList(result, res);
    }
    editMoto = async (req: Request, res: Response, next: NextFunction) => {
        req.body = Object.assign(req.body, { type_post: 1 })
        console.log("Received edittVehicle ==> POST")
        var result = await this.postVehicle(req, res, next);
        MyUtil.handleSuccess(result, res)
    }

}