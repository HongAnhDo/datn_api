import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";
import BookReasonService from "../../service/booking/BookReasonService";

export default class BookReasonController {
    
    private bookReasonService ;

    constructor(){
        this.bookReasonService = new BookReasonService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Reason ==> GET");

        await this.bookReasonService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

    getByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get reason by name==> GET");
        let name = req.query.book_resn_name;
        var result = await this.bookReasonService.getByName(name).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    }

    getById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get reason  by id==> GET");
        let id = req.query.book_resn_id;
        var result = await this.bookReasonService.getOne(id).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });
    }

   
}
