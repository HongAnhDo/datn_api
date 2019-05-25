import{cx_vhc as Vehicle} from  '../../../entities/vehicle/cx_vhc'
import { UpdateResult } from 'typeorm';

export default interface IVehicleRepository{
    getAll(): Promise<Array<Vehicle>>
    getOne(id: number): Promise<Vehicle>
    create(vehicle: Vehicle):Promise<Vehicle>
    createList(list: Array<Vehicle>): Promise<Array<Vehicle>>
    delete(id: number): Promise<UpdateResult>
    update(id: number, vehicle: Vehicle): Promise<Vehicle> 
    findByVehicleName(name: string): Promise<Vehicle>
    findByVehicleOption(option: any): Promise<any>
    findIn(arr: string[]): Promise<any>
    findByName(vhc_slug: string): Promise<Vehicle>
}