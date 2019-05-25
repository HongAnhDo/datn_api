import ICityCstmService from "../ICityCstmService";
import CityCstmRepository from "../../../repository/partner/CityCstmRepository";
import { cx_city_cstm as CityCustomer } from "../../../entities/partner/cx_city_cstm";

export default class CityService implements ICityCstmService {
    private cityRepository = new CityCstmRepository();

    public async getAll(){
        return await this.cityRepository.getAll();
    }

    public async getCityById(id: number){
        return await this.cityRepository.findById(id);
    }

    public async getCityByName(name: string){
        return await this.cityRepository.findByName(name);
    }

    public async create(city: CityCustomer) {
        return await this.cityRepository.create(city);
    }
}