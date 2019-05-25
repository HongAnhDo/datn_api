import { cx_pay_meth as Paymenthod} from "../../entities/partner/cx_pay_meth";
import PayMenthodService from '../../service/partner/impl/PayMethodService'
import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";

export default class PaymenthodController {
    
    private payMenthodService ;

    constructor(){
        this.payMenthodService = new PayMenthodService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Paymenthods ==> GET");

        await this.payMenthodService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
