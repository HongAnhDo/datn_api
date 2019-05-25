import { Request, Response, NextFunction } from "express";
import BookingServiceImpl from "../../service/booking/BookingServiceImpl";
import IBookingService from "../../service/booking/IBookingService";
import { MyUtil } from "../../utils/MyUtil";
import BookingReqDTO from "../../dto/booking/BookingReqDTO";
import { Utils } from "../../utils/Validate";
import IUserAccountService from "../../service/user/IUserAccountService";
import UserAccountService from "../../service/user/UserAccountServiceImpl";

var email = require("../../config/email")

export default class BookingController {
    private bookingService: IBookingService;
    private userService: IUserAccountService;

    constructor() {
        this.bookingService = new BookingServiceImpl();
        this.userService = new UserAccountService();
    }
    public getList = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all bookings ==> GET");
        var index = req.query.index;
        await this.bookingService.getList(index).then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public getBookingsUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get bookings user ==> GET");
        if (!req.query) {
            MyUtil.handleError({ "message": "Param is not empty" }, res)
        }
        var index = req.query["index"];
        index = index ? index : 0;
        var token = req.headers.authorization;
        var user_acc_id = req.query.user_acc_id;

        var user;
        if (token)
            user = await this.userService.getUserByToken(token);
        if (user && (user["user_role_id"] != 1 || user["user_acc_id"] == user_acc_id)) {
            await this.bookingService.getBookingsUser(user_acc_id, index).then((result) =>
                MyUtil.handleSuccess(result, res)
            ).catch(err => next(err));
        } else {
            MyUtil.handleError({ "message": "permission denied" }, res)
        }

    };

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all bookings ==> GET");

        await this.bookingService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public getByCode = async (req: Request, res: Response) => {
        console.log("get a booking by code ==> GET");

        var code = req.params.code;
        if (!code) MyUtil.handleError({ message: "No data!" }, res);

        await this.bookingService.getByCode(code)
            .then(data => {
                MyUtil.handleSuccess(data, res)
            })
            .catch(err => MyUtil.handleError(err, res))
    }

    public getByCodeFullResponse = async (req: Request, res: Response) => {
        console.log("get a booking by code ==> GET");

        var code = req.params.code;
        if (!code) MyUtil.handleError({ message: "No data!" }, res);

        await this.bookingService.getByCodeFullResponse(code)
            .then(data => {
                MyUtil.handleSuccess(data, res)
            })
            .catch(err => MyUtil.handleError(err, res))
    }

    public postCreate = async (req: Request, res: Response) => {
        console.log("create a new booking ==> POST");

        if (!req.body) {
            MyUtil.handleError({ message: "No data!" }, res);
        }
        var bookReq = new BookingReqDTO(req.body);

        if (!Utils.isEmailAddress(bookReq.getCstmEmai())) MyUtil.handleError({ message: "Email is not true!" }, res);
        if (!Utils.isPhoneNumber(bookReq.getCstmPhon())) MyUtil.handleError({ message: "Phone number is not true!" }, res);
        if (bookReq.getVhcPartId() <= 0 && bookReq.getVhcPartName() === "") MyUtil.handleError({ message: "Vehicle info is wrong!" }, res);

        await this.bookingService.create(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    }

    public getCalculateDeliPrice = async (req: Request, res: Response) => {
        console.log("get delivery price for booking");

        if (!req.query) {
            MyUtil.handleError({ message: "No data!" }, res);
        }
        // console.log(req.query)
        var bookReq = new BookingReqDTO(req.query);
        if (!bookReq || bookReq.getVhcPartId() < 0 || !((bookReq.getCstmDeliAddrLat() && bookReq.getCstmDeliAddrLng()) || bookReq.getCstmDeliAddr())) MyUtil.handleError({ message: "Data is not enough!!" }, res);

        await this.bookingService.calculateDeliPrice(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public getDetailPrice = async (req: Request, res: Response) => {
        console.log("get detail price for booking");
        if (!req.query) {
            MyUtil.handleError({ message: "No data!" }, res);
        }
        var bookReq = new BookingReqDTO(req.query);
        if (!bookReq || bookReq.getVhcPartId() < 0 || !bookReq.getBookRentDate() || !bookReq.getBookRetunDate()) MyUtil.handleError({ message: "Data is not enough!!" }, res);

        await this.bookingService.getDetailPrice(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public getPromotionPrice = async (req: Request, res: Response) => {
        console.log("get promotion by promotion code");
        if (!req.query) MyUtil.handleError({ message: "No data!" }, res);
        var bookReq = new BookingReqDTO(req.query);
        if (!bookReq || !bookReq.getBookRentDate() || !bookReq.getBookRetunDate() || !bookReq.getPromoCode()) MyUtil.handleError({ message: "Data is not enough!!" }, res);

        await this.bookingService.calculatePromoPrice(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    }

    public getBookingsByUserId = async (req: Request, res: Response) => {
        console.log("get all bookings of user by user_acc_id");
        if (!req.query) MyUtil.handleError({ message: "User's id is not be empty!" }, res);
        var user_acc_id = req.query.user_acc_id;
        if (!user_acc_id || (user_acc_id <= 0)) MyUtil.handleError({ message: "User's id is not be empty!" }, res);

        await this.bookingService.getBookingsByUserId(user_acc_id)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public getBookingsByToken = async (req: Request, res: Response) => {
        console.log("get all bookings of user by user_acc_tokn");
        if (!req.query) MyUtil.handleError({ message: "User's id is not be empty!" }, res);
        var token = req.headers.authorization;
        if (!token) MyUtil.handleError({ message: "User's token is not be empty!" }, res);

        await this.bookingService.getBookingsByToken(token)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSendEmail = async (req: Request, res: Response) => {
        console.log("send email => POST");
        if (!req.body) MyUtil.handleError({ message: "Email body is not empty!" }, res);
        if (!req.body.cstm_emai) MyUtil.handleError({ message: "Receiver's email is not empty!" }, res);
        if (!req.body.subject) MyUtil.handleError({ message: "Subject is not empty!" }, res);
        if (!req.body.content) MyUtil.handleError({ message: "Content is not empty!" }, res);
        var options = {
            sender: req.body.sender,
            receiver: req.body.cstm_emai,
            subject: req.body.subject,
            content: req.body.content,
        }
        await email.sendMail(options)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSendRequirement = async (req: Request, res: Response) => {
        console.log("send requirement special=> POST");
        if (!req.body) MyUtil.handleError({ message: "Body is not empty!" }, res);
        if (!req.body.email) MyUtil.handleError({ message: "Email body is not empty!" }, res);
        if (!req.body.subject) MyUtil.handleError({ message: "Subject is not empty!" }, res);
        if (!req.body.content) MyUtil.handleError({ message: "Content is not empty!" }, res);
        var options = {
            sender: req.body.sender,
            receiver: req.body.email,
            subject: req.body.subject,
            content: req.body.content,
        }
        await email.sendMail(options)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public delete = async (req: Request, res: Response) => {
        console.log("put delete=> PUT");
        var id = req.body.book_id;

        await this.bookingService.delete(id).then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));
    }

    public updateLevel = async (req: Request, res: Response) => {
        console.log("put level=> PUT");
        var book_id = req.body.book_id;
        var book_stt_id = req.body.book_stt_id;

        await this.bookingService.updateLevel(book_id, book_stt_id).then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));
    }

    public getBookingByAffId = async (req: Request, res: Response) => {
        console.log("get bookings by affiliate's id=> GET");
        if (!req.query) MyUtil.handleError("Request's params are not null!!", res)
        await this.bookingService.getBookingsByUtmSource(req.query)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));
    }

    public editQuickBook = async (req: Request, res: Response) => {
        console.log("Edit quick booking");
        var body = req.body;
        if (!body) {
            MyUtil.handleError({ message: "Date is empty" }, res);
            return;
        }
        var result = await this.bookingService.editQuickBooking(body)
            .catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res)

    }
    public editBooking = async (req: Request, res: Response) => {
        console.log("Edit booking");
        var body = req.body;
        if (!body  ) {
            MyUtil.handleError({ message: "Date is empty" }, res);
            return;
        }else if(!body["book_code"]){
            MyUtil.handleError({ message: "book_code is require" }, res);
            return;
        }
        var result = await this.bookingService.editBooking(body)
            .catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res)

    }

    public statisticReason = async (req: Request, res: Response) => {
        console.log("Statistic reason");
        var data = req.query;
        if (!data  ) {
            MyUtil.handleError({ message: "Date is empty" }, res);
            return;
        }else if(!data["date_start"] || !data["date_end"]){
            MyUtil.handleError({ message: "Data is not true" }, res);
            return;
        }
        var result = await this.bookingService.findBookingForStatistic(data)
            .catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res)

    }

    public statisticLevel = async (req: Request, res: Response) => {
        console.log("Statistic level");
        var data = req.query;
        if (!data  ) {
            MyUtil.handleError({ message: "Date is empty" }, res);
            return;
        }else if(!data["date_start"] || !data["date_end"]){
            MyUtil.handleError({ message: "Data is not true" }, res);
            return;
        }
        var result = await this.bookingService.findStatisticLevel(data)
            .catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res)

    }
    public statisticLevelWeek = async (req: Request, res: Response) => {
        console.log("Statistic level week");
        var data = req.query;
        if (!data  ) {
            MyUtil.handleError({ message: "Date is empty" }, res);
            return;
        }else if(!data["date_start"] || !data["date_end"]){
            MyUtil.handleError({ message: "Data is not true" }, res);
            return;
        }
        var result = await this.bookingService.findStatisticLevelForWeek(data)
            .catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res)

    }
}