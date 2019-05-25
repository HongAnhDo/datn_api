import { cx_wday as Wday} from "../../entities/partner/cx_wday";
import WdayService from '../../service/partner/impl/WdayService'
import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";

export default class WdayController {
    
    private wdayService ;

    constructor(){
        this.wdayService = new WdayService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Wdays ==> GET");

        await this.wdayService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
