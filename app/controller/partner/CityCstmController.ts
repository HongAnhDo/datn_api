import { Request, Response, NextFunction } from "express";
import CityCstmService from "../../service/partner/impl/CityCstmService";
import ICityCstmService from "../../service/partner/ICityCstmService";
import { MyUtil } from "../../utils/MyUtil";
import { cx_city_cstm as CityCustomer } from "../../entities/partner/cx_city_cstm";

export default class PartnerController {
    private cityService: ICityCstmService;

    constructor() {
        this.cityService = new CityCstmService()
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Citie cstm ==> GET");

        await this.cityService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public postCreate = async (req: Request, res: Response) => {
        console.log("create a new city cstm ==> POST");
        if (!(req.body && req.body.city_name)) {
            MyUtil.handleError({ message: "No data!" }, res);
        } else {
            var newCity = new CityCustomer();
            newCity.city_cstm_name = req.body.city_name;

            var city = null;
            await this.cityService.getCityByName(newCity.city_cstm_name).then(result => city = result);

            if (city) MyUtil.handleError({ message: "City is existed!!" }, res);
            else await this.cityService.create(newCity)
                .then(result => MyUtil.handleSuccess(result, res))
                .catch(err => MyUtil.handleError(err, res))
        }
    }

}