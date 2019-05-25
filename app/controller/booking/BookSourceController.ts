import { cx_book_src as BookSource} from "../../entities/booking/cx_book_src";
import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";
import BookSourceService from "../../service/booking/BookSourceService";

export default class BookSourceController {
    
    private bookSourceService ;

    constructor(){
        this.bookSourceService = new BookSourceService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all source ==> GET");

        await this.bookSourceService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
