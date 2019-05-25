import { cx_part_proc as PartProduce} from "../../entities/partner/cx_part_proc";
import PartProcService from '../../service/partner/impl/PartProcService'
import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";

export default class PartProcController {
    
    private partProcService ;

    constructor(){
        this.partProcService = new PartProcService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Holidays ==> GET");

        await this.partProcService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

    public deleteByPartId = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received delete Produce by Part id ==> DELETE");
        var part_id = parseInt(req.query.part_id);
        await this.partProcService.deleteByPartId(part_id).then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
