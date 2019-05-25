import { Request, Response, NextFunction } from "express";
import VehicleController from '../vehicle/VehicleController'
import { MyUtil } from "../../utils/MyUtil";
import MotoController from "../vehicle/MotoController";
import VehiclePartController from "../partner/VehiclePartController"
import PartnerController from "../partner/PartnerController"
import VehiclePartService from "../../service/partner/impl/VehiclePartService";
import VehicleService from "../../service/vehicle/VehicleService";


export default class AppController {
    private carController;
    private motoController;
    private vehiclePartController;
    private partnerController;
    private vhcPartService;
    private vhcService;

    constructor() {
        this.carController = new VehicleController();
        this.motoController = new MotoController();
        this.vehiclePartController = new VehiclePartController();
        this.partnerController = new PartnerController();
        this.vhcPartService = new VehiclePartService();
        this.vhcService = new VehicleService()
    }

    public index = async (req: Request, res: Response) => {
        res.render('index.ejs');

    }
    public uploadCar = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file.path) {
            var err = { message: "Open file error" }
            res.send((err) => MyUtil.handleError(err, res))
        } else {
            var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
            let vehicles = MyUtil.convertCar(arr)
            for (let i = 0; i < vehicles.length; i++) {
                let data = vehicles[i].vehicle

                req.body = data;

                await this.carController.postVehicle(req, res);
            }
            MyUtil.handleSuccess({}, res);

        }
    }

    public uploadMoto = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file.path) {
            var err = { message: "Open File Error" }
            res.send((err) => MyUtil.handleError(err, res))
        } else {
            var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
            let vehicles = MyUtil.convertMoto(arr)
            for (let i = 0; i < vehicles.length; i++) {

                let data = vehicles[i].moto
                req.body = data;
                await this.motoController.postVehicle(req, res);
            }
            MyUtil.handleSuccess({}, res);

        }
    }

    public uploadVehiclePartner = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file.path) {
            var err = { message: "Open File Error" }
            res.send((err) => MyUtil.handleError(err, res))
        } else {
            var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
            let vehicles = MyUtil.convertVehiclePart(arr)
            for (let i = 0; i < vehicles.length; i++) {
                req.body = vehicles[i]
                await this.vehiclePartController.postVehicle(req, res);
            }
            MyUtil.handleSuccess({}, res);

        }
    }

    public uploadPartner = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file.path) {
            var err = { message: "Open File Error" }
            res.send((err) => MyUtil.handleError(err, res))
        } else {
            var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
            let partners = MyUtil.convertPartner(arr)
            for (let i = 0; i < partners.length; i++) {
                req.body = partners[i]
                await this.partnerController.postPartner(req, res);
            }
            MyUtil.handleSuccess({}, res);

        }
    }



    public exportGGSheet = async (req: Request, res: Response, next: NextFunction) => {
        var GoogleSpreadsheet = require('google-spreadsheet');
        var doc = new GoogleSpreadsheet('1tYmkW7PQ2GK335QlABidl5zIw6-MS6hxPIPcW-VxTSo');
        var creds = require('./client_secret.json');
        var async = require('async');
        var sheet;
        var booking = req.body.booking;

        if (!booking) {
            res.send({ message: "No data" });
            return;
        }
        var vhc_id, vehicle;
        vehicle =await this.vhcPartService.getOne(booking.vhc_part_id);
        vhc_id = vehicle["vhc_id"]
        if (vhc_id) {
            var vhc = await this.vhcService.getOne(vhc_id)

            async.series([
                function setAuth(step, error) {
                    doc.useServiceAccountAuth(creds, step);
                    console.log(step, error)
                },
                function getInfoAndWorksheets(step) {
                    doc.getInfo(function (err, info) {
                        if (err) {
                            res.send({ message: err });
                            return;
                        }
                        sheet = info.worksheets.find(x => x.title === 'Customer list [updated]');
                        step();
                    });
                },
                function workingWithRows(step) {
                    var data =
                    {
                        stt: "",
                        book_crta: MyUtil.getDateExport(booking.book_crta),
                        book_code: booking.book_code,
                        cstm_name: booking.cstm_name,
                        gioi_tinh: "",
                        cstm_phon: "'"+booking.cstm_phon + "",
                        cstm_emai: booking.cstm_emai,
                        cstm_deli_addr: booking.book_deli_from_id == 1 ? booking.cstm_deli_addr : "Nhận xe tại đại lý",
                        addr_live: "",
                        city_name: booking.city_name,
                        book_rent_date: MyUtil.getDateExport(booking.book_rent_date),
                        book_retun_date: MyUtil.getDateExport(booking.book_retun_date),
                        vhc_type_name: booking.vhc_type_name,
                        quick_note: "",
                        vhc_seat_num: vhc.vhc_seat_num ? (vhc.vhc_seat_num + " chỗ") : null,
                        vhc_bran_name: vhc.vhc_bran_name,
                        vhc_tms_name: vhc.vhc_tms_name,
                        source: "Mail",
                        level: "",
                        book_deli: "",
                        reason: "",
                        level2: "",
                        history_call: "",
                        purpose_rent: "",
                        schedule:"",
                        next_step:"",
                        time:"",
                        session:"",
                        part_name:vehicle.part_name,
                        price: booking.book_prie_tota,
                        year_old:"",
                        hour:""
                    }
                    sheet.addRow(data, function (err, value) {
                        if (err) {
                            res.send({ message: err })
                        } else {

                            res.send({ message: err, data: value["title"] })
                        }
                    });
                    step()

                }])
        } else {
            res.send({ message: "error" })
        }

    }


}