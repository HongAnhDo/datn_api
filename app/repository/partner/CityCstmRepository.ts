import {cx_city_cstm as CityCustomer} from "../../entities/partner/cx_city_cstm"
import { Repository, getConnectionManager } from "typeorm";

export default class CityRepository{
    private cityRepo: Repository<CityCustomer>;
    constructor() {
        this.cityRepo = getConnectionManager().get("chungxe_partner").getRepository(CityCustomer);
    }

    public async getAll() {
        return await this.cityRepo.find();
    }
    public async findById(id: number){
        return await this.cityRepo.findOne({"city_cstm_id": id})
    }
    public async create(city: CityCustomer){
        return await this.cityRepo.save(city);
    }
    
    public async findByName(cityName: string){
        return await this.cityRepo.findOne({"city_cstm_name": cityName})
    }
    
}