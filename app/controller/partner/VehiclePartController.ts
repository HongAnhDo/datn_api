
import { cx_vhc_part as VehiclePartner } from "../../entities/partner/cx_vhc_part";
import { Request, Response, NextFunction } from "express";
import { MyUtil } from '../../utils/MyUtil';
import VehiclePartService from "../../service/partner/impl/VehiclePartService";
import VehicleService from "../../service/vehicle/VehicleService"
import VehicleController from "../../controller/vehicle/VehicleController"
import PartnerController from "../../controller/partner/PartnerController"
import PartnerService from "../../service/partner/impl/PartnerService"
import MotoService from "../../service/vehicle/MotoService";
import ImageService from '../../service/vehicle/ImageService'
import BookingService from '../../service/booking/BookingServiceImpl'

export default class VehiclePartController {
    private vehicleService: VehicleService;
    private partnerService: PartnerService;
    private vehiclePartService: VehiclePartService;
    private vehicleController: VehicleController;
    private motoService: MotoService;
    private partnerController: PartnerController;
    private imageService: ImageService
    private bookingService: BookingService

    constructor() {
        this.vehicleService = new VehicleService();
        this.vehiclePartService = new VehiclePartService();
        this.partnerService = new PartnerService();
        this.vehicleController = new VehicleController();
        this.partnerController = new PartnerController();
        this.motoService = new MotoService();
        this.imageService = new ImageService();
        this.bookingService = new BookingService();
    }


    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllVehicle ==> GET");

        await this.vehiclePartService.getAll()
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    };

    deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received delete vehicle partner ==> PUT");
        var id = req.body.vhc_part_id;

        await this.vehiclePartService.delete(id).then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));

    }

    editVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received EDIT vehicle partner ==> PUT")
        var check, vhc_part_id, end = false;
        if (!req.body) {
            MyUtil.handleError({ message: "Data is not null" }, res)
            return;
        }
        vhc_part_id = req.body["vhc_part_id"]
        let vehicle: VehiclePartner = new VehiclePartner();
        check = await this.handleCheckVehiclePartner(req.body, res, 2).catch(err => MyUtil.handleError(err, res))
        if (check) {
            vehicle = check;
            var vhc;
            if (vehicle.vhc_id) {
                vehicle["vhc_part_slug"] = MyUtil.slug(vehicle.vhc_part_name);
                vhc = await this.vehiclePartService.update(vhc_part_id, vehicle).catch(err => { MyUtil.handleError(err, res); end = true })
                if (end)
                    return;

                MyUtil.handleSuccess(vhc, res)
                return;
            }

        }
        return;
    };

    handleCheckVehiclePartner = async (value, res, type) => {
        let checkVehicle;
        var end = false;
        let vehicle: VehiclePartner = new VehiclePartner();

        let data = value;
        let vhc_bran_name = value["vhc_bran_name"];
        let vch_modl_name = value["vhc_modl_name"];
        let vhc_part_name;
        let vch_name = value["vhc_name"];
        if (!vch_modl_name) {
            data["vch_modl_name"] = null
            vhc_part_name = vhc_bran_name + " " + vch_name + " " + value["vhc_part_year"];
        } else {
            vhc_part_name = vhc_bran_name + " " + vch_modl_name + " " + vch_name + " " + value["vhc_part_year"];
        }
        data["vhc_part_name"] = vhc_part_name;

        delete data["vhc_bran_id"]
        vehicle = data;
        let obj = { "vhc_part_name": vhc_part_name, "part_id": value["part_id"] }

        checkVehicle = await this.vehiclePartService.findByVehicleOption(obj).catch(err => {
            MyUtil.handleError(err, res);
            end = true
        })
        if (end) return false;

        if (checkVehicle && checkVehicle.length > 0 && type == 1) {
            checkVehicle = false
            let err = { "message": vhc_part_name + " already exist" };
            MyUtil.handleError(err, res);
            end = true;
        }
        else {
            if (!vehicle["vhc_id"])
                if (vch_modl_name) {
                    await this.vehicleService.findIdByName(vhc_bran_name, vch_modl_name, vch_name)
                        .then((result) => {
                            vehicle.vhc_id = result ? result.vhc_id : null
                        })
                        .catch((err) => { MyUtil.handleError(err, res); end = true })
                } else {
                    await this.motoService.findIdByName(vhc_bran_name, vch_name)
                        .then((result) => {
                            vehicle.vhc_id = result ? result.vhc_id : null
                        })
                        .catch((err) => { MyUtil.handleError(err, res); end = true })
                }
        }

        if (end) return false;
        return vehicle;

    }

    postVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received postVehiclePartner ==> POST");
        let checkVehicle;
        var check;
        let vehicle: VehiclePartner = new VehiclePartner();
        check = await this.handleCheckVehiclePartner(req.body, res, 1).catch(err => MyUtil.handleError(err, res))
        if (check) {
            vehicle = check;
            var vhc;
            if (vehicle.vhc_id) {
                vehicle["vhc_part_slug"] = MyUtil.slug(vehicle.vhc_part_name);
                vhc = await this.vehiclePartService.create(vehicle).catch(err => MyUtil.handleError(err, res))
                MyUtil.handleSuccess(vhc, res)
                return;
            }

        }
    };

    postListVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by name==> GET");
        let list = new Array<VehiclePartner>();
        let checkVehicle, check = true;
        if (req.body) {
            list = req.body;
            for (let i = 0; i < list.length; i++) {
                let item = list[i];

                let vehicle: VehiclePartner = new VehiclePartner();
                let name = item.vhc_part_name + "";
                vehicle = item;
                checkVehicle = await this.vehicleService.findByVehicleName(name).catch(err => MyUtil.handleError(err, res))
                if (checkVehicle) {
                    checkVehicle = false
                    let err = { "message": "vhc_part_name already exist" };
                    MyUtil.handleError(err, res);
                    check = false;
                    break;
                }
            }
            if (check) {
                var result = await this.vehiclePartService.createList(list).catch(err => MyUtil.handleError(err, res))
                MyUtil.handleSuccess(result, res)
            } else
                MyUtil.handleSuccess(result, res);
        }
        else {
            var err = { message: "Data none" }
            MyUtil.handleError(err, res)
        }

    }

    getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by id==> GET");
        let id = req.query.vhc_part_id;

        var result = await this.vehiclePartService.getOne(id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getVehicleByName = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by name==> GET");
        let id = req.query.vhc_part_name;

        var result = await this.vehiclePartService.findByVehicleName(id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getVehicleOption = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by option==> GET");
        let option = req.query;

        var result = await this.vehiclePartService.findByVehicleOption(option).catch(err => MyUtil.handleError(err, res))

        MyUtil.handleSuccess(result, res);
    }

    getListFeatured = async (req: Request, res: Response, next: NextFunction) => {
        console.log("GET list short")
        var result = [], list, arrIdVhcs = []
        list = await this.bookingService.getListLimit(30).catch(err => console.log(err))
        var arrIds = []
        if (list) {
            list.forEach(element => {
                if (arrIds.indexOf(element.vhc_part_id) == -1) {
                    arrIds.push(element.vhc_part_id);
                }
            });

            for (let i = 0; i < arrIds.length; i++) {
                let vehicle;
                vehicle = await this.vehiclePartService.getDetailVehicleShort(arrIds[i]).catch((err) => MyUtil.handleError(err, res))
                if (vehicle != {} && vehicle["vhc"] && arrIdVhcs.indexOf(vehicle["vhc"]["vhc_id"]) == -1) {
                    arrIdVhcs.push(vehicle["vhc"]["vhc_id"])
                    var vhc_imgs = await this.imageService.findByImageTable("cx_vhc", vehicle.vhc_id).catch(err => { throw new Error(err) })
                    vehicle.vhc = Object.assign(vehicle.vhc, { "vhc_imgs": vhc_imgs })
                    result.push(vehicle);
                }
                if (result.length > 15)
                    break;
            }

        }
        MyUtil.handleSuccess(result, res);

    }

    getListVehicles = async (req: Request, res: Response, next: NextFunction) => {
        console.log("GET list short")
        let params = req.query;
        let url = req.originalUrl;
        if (params) {
            let fromBackend = params["from_backend"];

            let vehicles, partners, vehiclePartners, listVehicle = [];
            let vehicleIds = [], partnerIds = []
            let option1 = {}, option2 = {}
            let vhc_part_hide = 0;
            if (params["vhc_part_hide"])
                vhc_part_hide = params.vhc_part_hide;

            if (params.vhc_type_id) {
                option1["vhc_type_id"] = Number.parseInt(params.vhc_type_id)
                option2["vhc_type_id"] = Number.parseInt(params.vhc_type_id)
            }

            option2["part_del"] = null;
            if (params.vhc_bran_id && params.vhc_bran_id != 0) {
                option1["vhc_bran_id"] = Number.parseInt(params.vhc_bran_id)
            }

            if (params.vhc_seat_id && params.vhc_seat_id != 0) {
                option1["vhc_seat_id"] = params.vhc_seat_id
            }

            if (params.vhc_tms_id && params.vhc_tms_id != 0) {
                option1["vhc_tms_id"] = Number.parseInt(params.vhc_tms_id)
            }

            if (params.city_id) {
                option2["city_id"] = params.city_id;
            }

            vehicles = await this.vehicleService.findByVehicleOption(option1).catch((err) => MyUtil.handleError({ "message": "qqq" }, res))

            if (vehicles) {
                for (let i = 0; i < vehicles.length; i++) {
                    vehicleIds.push(vehicles[i]["vhc_id"])
                }
            }

            if (params.part_id) {
                partnerIds.push(params.part_id)
            } else {
                partners = await this.partnerService.findByOptions(option2).catch((err) => MyUtil.handleError(err, res))
                if (partners) {
                    for (let i = 0; i < partners.length; i++) {
                        partnerIds.push(partners[i]["part_id"])
                    }
                }
            }
            if (fromBackend) {
                var index = params["index"];
                index = index ? index : 0;
                console.log(index)
                vehiclePartners = await this.vehiclePartService.findVehiclesLimit(index, vehicleIds, partnerIds, null, null, vhc_part_hide).catch(err => MyUtil.handleError(err, res))
                if (vehiclePartners)
                    vehiclePartners = [vehiclePartners, vehiclePartners.length]
            } else
                vehiclePartners = await this.vehiclePartService.findVehicles(vehicleIds, partnerIds, params.price_from, params.price_to, vhc_part_hide).catch(err => MyUtil.handleError(err, res))

            if (vehiclePartners[1] > 0) {

                let list = vehiclePartners[0]
                for (let i = 0; i < vehiclePartners[1]; i++) {
                    var vehicle;
                    if (url.includes("/get-list-short")) {
                        vehicle = await this.vehiclePartService.getDetailVehicleShort(list[i].vhc_part_id).catch((err) => MyUtil.handleError(err, res))
                    }
                    else if (url.indexOf("get-list-for-app")) {
                        vehicle = await this.vehiclePartService.getDetailVehicleForApp(list[i].vhc_part_id).catch((err) => MyUtil.handleError(err, res))
                    }
                    else {
                        vehicle = await this.vehiclePartService.getDetailVehicle(list[i].vhc_part_id, 0).catch((err) => MyUtil.handleError(err, res))
                    }
                    if (vehicle)
                        listVehicle.push(vehicle)
                }
            }
            if (!fromBackend) {
                listVehicle = this.sortList(listVehicle);
            }
            MyUtil.handleSuccess(listVehicle, res)
        } else {
            MyUtil.handleError({ message: "No params request" }, res);
        }
    }

    getListOptionShort = async (req: Request, res: Response, next: NextFunction) => {
        console.log("GET list option short")
        let params = req.query;
        let url = req.originalUrl;
        if (params) {
            let fromBackend = params["from_backend"];

            let vehicles, partner, vehiclePartners, listVehicle = [];
            let vehicleIds = [], partnerIds = []
            let option1 = {}, option2 = {}

            let vhc_part_hide = 0;

            if (params.vhc_bran_id && params.vhc_bran_id != 0) {
                option1["vhc_bran_id"] = Number.parseInt(params.vhc_bran_id)
            }

            if (params.vhc_seat_id && params.vhc_seat_id != 0) {
                option1["vhc_seat_id"] = params.vhc_seat_id
            }

            if (params.vhc_tms_id && params.vhc_tms_id != 0) {
                option1["vhc_tms_id"] = Number.parseInt(params.vhc_tms_id)
            }

            vehicles = await this.vehicleService.findByVehicleOption(option1).catch((err) => MyUtil.handleError({ "message": "error find vehicle" }, res))

            if (vehicles) {
                for (let i = 0; i < vehicles.length; i++) {
                    vehicleIds.push(vehicles[i]["vhc_id"])
                }
            }
            partnerIds.push(params.part_id)

            vehiclePartners = await this.vehiclePartService.findVehicles(vehicleIds, partnerIds, null, null, vhc_part_hide).catch(err => MyUtil.handleError(err, res))

            if (vehiclePartners[1] > 0) {
                listVehicle = vehiclePartners[0]
            }
            if (!fromBackend) {
                listVehicle = this.sortList(listVehicle);
            }

            MyUtil.handleSuccess(listVehicle, res)
        } else {
            MyUtil.handleError({ message: "No params request" }, res);
        }
    }

    sumVehicle =  async (req: Request, res: Response, next: NextFunction) => {
        let vhc_type_id = req.query["vhc_type_id"];
        if(vhc_type_id != undefined && vhc_type_id != null){
            var sum = await this.vehiclePartService.sumVehicle(vhc_type_id).catch(err =>{throw new Error(err)})
            MyUtil.handleSuccess({sum: sum}, res)
        }else{
            MyUtil.handleError({"message": "params not true"}, res)
        }
    }

    getAllVehiclePartner = async (req: Request, res: Response, next: NextFunction) => {
    }

    getDetailVehicleParter = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Get detail vehicle")
        let vch_part_id = req.query.vhc_part_id;
        let fromBackend = req.query["from_backend"];
        let type = 0;
        if(fromBackend){
            type = 1;
        }
        let result = await this.vehiclePartService.getDetailVehicle(vch_part_id, type).catch((err) => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    updateSimple = async (req: Request, res: Response, next: NextFunction) => {
        var vehiclePart = await this.vehiclePartService.getOne(req.body.vhc_part_id);
        vehiclePart = Object.assign(vehiclePart, { "vhc_part_hide": req.body.vhc_part_hide })
        if (vehiclePart)
            var result = await this.vehiclePartService.update(req.body.vhc_part_id, vehiclePart).then(result => MyUtil.handleSuccess(result, res))
                .catch(err => MyUtil.handleError({ message: "Updata fail" }, res))
    }

    sortList = (list) => {
        list.sort(function (a, b) { return 0.5 - Math.random() });
        return list;
    }

}