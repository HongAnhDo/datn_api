import { cx_proc as Procedure } from "../../entities/partner/cx_proc";
import ProduceService from '../../service/partner/impl/ProcedureService'
import { MyUtil } from "../../utils/MyUtil";
import { Request, Response, NextFunction } from "express";

export default class ProcedureController {

    private procService;

    constructor() {
        this.procService = new ProduceService();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all produces ==> GET");

        await this.procService.getAll().then((result) => {
            MyUtil.handleSuccess(result, res)
        }
        ).catch(err => next(err));
    };


}
