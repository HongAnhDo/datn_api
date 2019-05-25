import {cx_city_cstm as CityCustomer} from "../../entities/partner/cx_city_cstm" 

export default interface ICityService {
    getAll(): Promise<CityCustomer[]>;
    getCityById(id: number): Promise<CityCustomer>;
    getCityByName(name: string): Promise<CityCustomer>;
    create(city: CityCustomer): Promise<CityCustomer>;
}