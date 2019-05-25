import { cx_holi as Holiday} from "../../entities/partner/cx_holi";
import HolidayService from '../../service/partner/impl/HolidayService'
import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";

export default class HolidayController {
    
    private holiService ;

    constructor(){
        this.holiService = new HolidayService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Holidays ==> GET");

        await this.holiService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
