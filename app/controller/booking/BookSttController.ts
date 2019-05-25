import { cx_book_stt as BookStatus} from "../../entities/booking/cx_book_stt";
import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";
import BookStatusService from "../../service/booking/BookStatusService";

export default class BookStatusController {
    
    private bookStatusService ;

    constructor(){
        this.bookStatusService = new BookStatusService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Status ==> GET");

        await this.bookStatusService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

    getByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get status by name==> GET");
        let name = req.query.book_stt_name;
        var result = await this.bookStatusService.getByName(name).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    }

    getById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get status  by id==> GET");
        let id = req.query.book_stt_id;
        var result = await this.bookStatusService.getOne(id).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });
    }
   
}
