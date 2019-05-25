import {cx_vhc_part as VehiclePart} from '../../entities/partner/cx_vhc_part'
import { UpdateResult } from 'typeorm';

export default interface IVehiclePartService {
    getAll(): Promise<Array<VehiclePart>>
    getList(index, options): Promise<Array<VehiclePart>>
    getListLimit(numberLimit: number): Promise<Array<VehiclePart>>
    getFeaturedProducts(): Promise<Array<VehiclePart>> 
    getOne(id: number): Promise<VehiclePart>
    create(vehicle: VehiclePart):Promise<VehiclePart>
    delete(id: number): Promise<UpdateResult>
    update(id: number, vehicle: VehiclePart): Promise<VehiclePart> 
    findByVehicleName(name: string): Promise<VehiclePart>
    findByVehicleOption(option: any): Promise<any>
    createList(list: Array<VehiclePart>):Promise<Array<VehiclePart>> 
    findVehicles(vehicleIds: number[], partnerIds: number[], price_from: number, price_to: number, vhc_part_hide: number): Promise<any> 
    findVehiclesLimit(index:number,vehicleIds: number[], partnerIds: number[], price_from: number, price_to: number, vhc_part_hide: number): Promise<any>
    sumVehicle(vhc_type_id: number): Promise<number>
}