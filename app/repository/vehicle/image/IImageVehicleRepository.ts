import { cx_vhc_img as ImageVehicle } from "../../../entities/vehicle/cx_vhc_img";

export default interface IImageVehicleRepository {
    getAll(): Promise<Array<ImageVehicle>>
    getOne(id: number): Promise<ImageVehicle>
    create(imageVehicle: ImageVehicle):Promise<ImageVehicle>
    createList(list: Array<ImageVehicle>):Promise< Array<ImageVehicle>>
    delete(id: number): Promise<ImageVehicle>
    update(vhc_id: number, vhc_link: string): Promise<ImageVehicle> 
    findByImageTable(tableName: string, tableId: number): Promise<ImageVehicle[]>
}