import { Request, Response, NextFunction } from "express";
import PartnerService from "../../service/partner/impl/PartnerService";
import IPartnerService from "../../service/partner/IPartnerService";
import { MyUtil } from "../../utils/MyUtil";
import ICityService from "../../service/partner/ICityService";
import CityService from "../../service/partner/impl/CityService";
import HolidayService from "../../service/partner/impl/HolidayService";
import WdayService from "../../service/partner/impl/WdayService";
import ProcedureService from "../../service/partner/impl/ProcedureService";
import PayMethodService from "../../service/partner/impl/PayMethodService";
import PartWdayService from "../../service/partner/impl/PartWdayService";
import PartProcService from "../../service/partner/impl/PartProcService";
import PartPayMethService from "../../service/partner/impl/PartPayMethService";
import PartHoliService from "../../service/partner/impl/PartHoliService"
import PartnerReqDTO from "../../dto/partner/PartnerReqDTO";
import { cx_part as Partner } from "../../entities/partner/cx_part"
import { cx_wday as WeekDay } from "../../entities/partner/cx_wday"
import { cx_part_wday as PartWeekDay } from "../../entities/partner/cx_part_wday"
import { cx_holi as Holiday } from "../../entities/partner/cx_holi"
import { cx_part_holi as PartHoliday } from "../../entities/partner/cx_part_holi"
import { cx_pay_meth as PayMenthod } from "../../entities/partner/cx_pay_meth"
import { cx_part_pay_meth as PartPayMenthod } from "../../entities/partner/cx_part_pay_meth"
import { cx_proc as Procedure } from "../../entities/partner/cx_proc"
import { cx_part_proc as PartProcedure } from "../../entities/partner/cx_part_proc"
import { JoinAttribute } from "../../../node_modules/typeorm/query-builder/JoinAttribute";

export default class PartnerController {
    private partnerService: PartnerService;
    private cityService: ICityService;
    private wdayService: WdayService;
    private partWdayService: PartWdayService;
    private payMethodService: PayMethodService;
    private partPayMethService: PartPayMethService;
    private procedureService: ProcedureService;
    private partProcService: PartProcService;
    private holidayService: HolidayService;
    private partHoliService: PartHoliService;

    constructor() {
        this.partnerService = new PartnerService();
        this.cityService = new CityService();
        this.payMethodService = new PayMethodService();
        this.partPayMethService = new PartPayMethService();
        this.wdayService = new WdayService();
        this.partWdayService = new PartWdayService();
        this.procedureService = new ProcedureService();
        this.partProcService = new PartProcService();
        this.holidayService = new HolidayService();
        this.partHoliService = new PartHoliService();

    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Partners ==> GET");

        await this.partnerService.getPartners().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public getPartnerOptions = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get  Partners options==> GET");
        var options = req.query;
        await this.partnerService.findByOptions(options).then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public editPartner = async (req: Request, res: Response) => {
        console.log("create a new partner ==> POST");
        var body = req.body;
        if (!body) {
            MyUtil.handleError({ message: "Date is empty" }, res);
            return;
        }
        req.body = Object.assign(req.body, { type_post: 1 })
        await this.postPartner(req, res);
    }

    public postPartner = async (req: Request, res: Response) => {
        console.log("create a new partner ==> POST");
        var body = req.body;
        let holis = body.holis;
        let wdays = body.wdays;
        let pays = body.pays;
        let procs = body.procs;
        let isEdit = body["type_post"] ? true : false;

        if (!(body && (body.city_id || body.city_name) && body.part_name && body.part_phon)) {
            var message = (body && body.city_id && body.city_name) ? "" : "thành phố";
            message = message + ((body && body.part_name) ? "" : " tên đối tác");
            message = message + ((body && body.part_phon) ? "" : " số điện thoại")
            MyUtil.handleError({ message: "Dữ liệu " + message +" là bắt buộc" }, res);

        } else {
            let partner = new Partner();
            let wDayPart = new Array<PartWeekDay>();
            let procePart = new Array<PartProcedure>();
            let holiPart = new Array<PartHoliday>();
            let payMenthPart = new Array<PartPayMenthod>()

            let check1, check2, check3, check4, check = true;
            if (holis)
                await this.getPartHolidays(body.holis, res, holiPart)
                    .catch((err) => {
                        MyUtil.handleError(err, res)
                        check = false
                    })
                    .then((result) => check1 = result);
            if (wdays)
                await this.getPartWDays(wdays, res, wDayPart)
                    .catch((err) => {
                        MyUtil.handleError(err, res)
                        check = false
                    })
                    .then((result) => {
                        check2 = result
                    });
            if (procs)
                await this.getProducePart(procs, res, procePart)
                    .catch((err) => {
                        MyUtil.handleError(err, res)
                        check = false
                    })
                    .then((result) => check3 = result);
            if (pays)
                await this.getPays(pays, res, payMenthPart)
                    .catch((err) => {
                        MyUtil.handleError(err, res)
                        check = false
                    })
                    .then((result) => check4 = result);

            delete body["pays"]
            delete body["wdays"]
            delete body["procs"]
            delete body["holis"]
            if (!body["part_crta"])
                body = Object.assign(body, { "part_crta": new Date() })
            partner = body;
            partner["part_slug"] = MyUtil.slug(partner.part_name)
            let checkPartner = true;

            if (check) {
                if (!partner["part_id"])
                    await this.partnerService.getPartnerByName(partner.part_name, partner.vhc_type_id)
                        .catch(err => MyUtil.handleError(err, res))
                        .then((result) => { if (result) checkPartner = false });
                if (!checkPartner) {
                    let err = { "message": "part_name already exist" };
                    MyUtil.handleError(err, res);
                    return;
                } else {

                    let part_id = partner["part_id"] ? partner["part_id"] : null;
                    let checkEnd = false, data;
                    if (isEdit)
                        data = await this.partnerService.updatePartner(partner["part_id"], partner).catch(err => MyUtil.handleError(err, res))
                    else
                        data = await this.partnerService.createPartner(partner)
                            .then((result) => { part_id = result.part_id })
                            .catch(err => MyUtil.handleError(err, res))

                    if (part_id) {
                        if (check1) {
                            this.setPartId(holiPart, part_id);
                            if (isEdit)
                                await this.partHoliService.deleteByPartId(part_id).catch((err) => { MyUtil.handleError(err, res); checkEnd = true })
                            if (!checkEnd)
                                await this.partHoliService.createList(holiPart).catch((err) => MyUtil.handleError(err, res));
                        }
                        if (check2) {
                            this.setPartId(wDayPart, part_id);
                            if (isEdit)
                                await this.partWdayService.deleteByPartId(part_id).catch((err) => { MyUtil.handleError(err, res); checkEnd = true })
                            if (!checkEnd)
                                await this.partWdayService.createList(wDayPart).catch((err) => MyUtil.handleError(err, res))
                        }
                        if (check3) {
                            this.setPartId(procePart, part_id);
                            if (isEdit)
                                await this.partProcService.deleteByPartId(part_id).catch((err) => { MyUtil.handleError(err, res); checkEnd = true })
                            if (!checkEnd)
                                await this.partProcService.createList(procePart).catch((err) => MyUtil.handleError(err, res))
                        }
                        if (check4) {
                            this.setPartId(payMenthPart, part_id);
                            if (isEdit)
                                await this.partPayMethService.deleteByPartId(part_id).catch((err) => { MyUtil.handleError(err, res); checkEnd = true })
                            if (!checkEnd)
                                await this.partPayMethService.createList(payMenthPart).catch((err) => MyUtil.handleError(err, res))

                        }
                    } else {
                        let err = { "message": "error" };
                        MyUtil.handleError(err, res);
                        return;
                    }
                    if (checkEnd) {
                        MyUtil.handleError({ message: "error" }, res)
                        return;
                    }
                    MyUtil.handleSuccess(data, res)
                }
            } else
                return MyUtil.handleError({ message: "error" }, res)

        }
    }

    setPartId = (obj: any[], part_id: number) => {
        obj.map(function (item) {
            item.part_id = part_id;
            return item;
        })
    }

    getPartWDays = async (str: string, res: Response, wDayPart: Array<PartWeekDay>) => {
        let arr;
        let check = true;

        if (str != undefined) {
            arr = MyUtil.convertListMap(str);

            for (var i = 0; i < arr.length; i++) {
                let item = arr[i]
                let name = (item[0] + "").toString().trim();
                let option = await this.wdayService.getWeekDayByname(name).catch(err => MyUtil.handleError(err, res))
                let wDay = new PartWeekDay();

                if (option) {
                    wDay.wday_id = option ? option.wday_id : null;
                    wDay.part_wday_exta_fee = item[1];
                    wDayPart.push(wDay)
                } else {
                    check = false;
                    let err = { "message": "wday " + item[0] + " không tồn tại" };
                    MyUtil.handleError(err, res);
                }

            }
        }
        return check;
    }

    getPays = async (str: string, res: Response, result: Array<PartPayMenthod>) => {
        let arr;
        let check = true;

        if (str) {
            str = str.replace(/\/r\/n/g, '');
            arr = MyUtil.trimArray(str, ",");

            for (var i = 0; i < arr.length; i++) {
                let item = arr[i].toString().trim()

                let option = await this.payMethodService.getPayMethodByName(item).catch(err => MyUtil.handleError(err, res))

                let payMenth = new PartPayMenthod();
                if (option) {
                    payMenth.pay_meth_id = option ? option.pay_meth_id : null;
                    result.push(payMenth)
                } else {
                    check = false;
                    let err = { "message": "menth " + item + " không tồn tại" };
                    MyUtil.handleError(err, res);
                }

            }
        }
        return check;
    }

    getPartHolidays = async (str: string, res: Response, result: Array<PartHoliday>) => {
        let arr;
        let check = true;
        if (str && str !== undefined) {
            arr = MyUtil.convertListMap(str.trim());

            for (var i = 0; i < arr.length; i++) {
                let item = arr[i]
                let name = (item[0] + "").trim();
                let option = await this.holidayService.getHoliByName(name).catch(err => MyUtil.handleError(err, res))
                let partHoli = new PartHoliday();
                let holi = new Holiday();
                if (option) {
                    partHoli.holi_id = option ? option["holi_id"] : null;
                    partHoli.part_holi_exta_fee = item[1];
                    result.push(partHoli)
                } else {
                    check = false;
                    let err = { "message": "holi " + item[0] + " không tồn tại" };
                    MyUtil.handleError(err, res);
                }

            }
        }
        return check;
    }
    getProducePart = async (str: string, res: Response, result: Array<PartProcedure>) => {
        let arr, check = true;

        if (str && str !== "" && str !== undefined) {
            arr = MyUtil.convertListMap(str);
            check = true;

            for (var i = 0; i < arr.length; i++) {
                let item = arr[i]
                let name = (item[0] + "").toString().trim();

                let option = await this.procedureService.getProcedureBySlug(MyUtil.slug(name.trim())).catch(err => MyUtil.handleError(err, res))
                let proce = new PartProcedure();

                if (option) {
                    proce.proc_id = option ? option.proc_id : null;
                    if (item.length > 1)
                        proce.part_proc_note = item[1];
                    result.push(proce)
                } else {
                    check = false;
                    let err = { "message": "produce " + item[0] + " not exits" };
                    MyUtil.handleError(err, res);
                }

            }
        }
        return check;
    }
    getDetail = async (req: Request, res: Response, next: NextFunction) => {
        await this.partnerService.getDetailPartner(req.query.part_id, 0).catch(err => MyUtil.handleError(err, res))
            .then(result => MyUtil.handleSuccess(result, res))
    }


    delete = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received delete partner ==> PUT");
        var part_id = req.body.part_id;

        await this.partnerService.delete(part_id).then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));

    }

}