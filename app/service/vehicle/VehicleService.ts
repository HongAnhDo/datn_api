import { cx_vhc as Vehicle } from "../../entities/vehicle/cx_vhc";
import VehicleRepository from "../../repository/vehicle/vehicle/VehicleRepository";
import { find } from "../../../node_modules/cfb/types";
import MotoRepository from "../../repository/vehicle/moto/MotoRepository";
import ImageService from "../../service/vehicle/ImageService";
import OptionService from "../../service/vehicle/OptionService";
import OptionMapService from "../../service/vehicle/OptionMapService";
import { UpdateResult } from "typeorm";

export default interface IVehicleService {
    getAll(): Promise<Array<Vehicle>>
    getOne(id: number): Promise<Vehicle>
    create(vehicle: Vehicle): Promise<Vehicle>
    delete(id: number): Promise<UpdateResult>
    update(id: number, vehicle: Vehicle): Promise<Vehicle>
    findByVehicleName(name: string): Promise<Vehicle>
    findByVehicleOption(option: any): Promise<any>
    createList(list: Array<Vehicle>): Promise<Array<Vehicle>>
    findIn(list: string[]): Promise<Array<any>>
    findByName(vhc_slug:string): Promise<Vehicle>
}


export default class VehicleService implements IVehicleService {

    private vehicleRepo: VehicleRepository;
    private imageService : ImageService
    private optService : OptionService
    private optMapService : OptionMapService

    constructor() {
        this.vehicleRepo = new VehicleRepository();
        this.imageService = new ImageService();
        this.optService = new OptionService();
        this.optMapService = new OptionMapService()
    }

    public async getAll(): Promise<Array<Vehicle>> {
        return await this.vehicleRepo.getAll();
    }

    public async getOne(id: number): Promise<Vehicle> {
        return await this.vehicleRepo.getOne(id);
    }

    public async create(Vehicle: Vehicle): Promise<Vehicle> {
        return await this.vehicleRepo.create(Vehicle);
    }

    public async delete(id: number): Promise<UpdateResult> {
        return await this.vehicleRepo.delete(id);
    }
    public async update(id: number, Vehicle: Vehicle): Promise<Vehicle> {
        return await this.vehicleRepo.update(id, Vehicle);
    }
    

    public async findByVehicleName(name: string): Promise<Vehicle> {
        return await this.vehicleRepo.findByVehicleName(name)
    }

    public async findByVehicleOption(option: any): Promise<any> {
        return await this.vehicleRepo.findByVehicleOption(option);
    }

    public async createList(list: Array<Vehicle>): Promise<Array<Vehicle>> {
        return await this.vehicleRepo.createList(list);
    }
    public async findIn(list: string[]): Promise<Array<Vehicle>> {
        return await this.vehicleRepo.findIn(list);
    }
    public async findIdByName(bran_name, modl_name, vhc_name): Promise<Vehicle> {
        return await this.vehicleRepo.findIdByName(bran_name, modl_name, vhc_name);
    }

    public async findByName(vhc_slug): Promise<Vehicle> {
        return await this.vehicleRepo.findByName(vhc_slug);
    }

    getDetailVehicle = async (vhc_id: number) => {
        let vch_id = vhc_id;
        let vehicle;

        if (vch_id) {
            let vhc_imgs, vhc_opts;
            vehicle = await this.getOne(vch_id).catch(err => {throw new Error(err)})
            let optionIds = [];
            await this.optMapService.findByVehicleId(vch_id)
                .catch(err =>  {throw new Error(err)})
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        optionIds[i] = result[i].vhc_opt_id;
                    }

                })
            if (optionIds.length > 0) {
                await this.optService.findIds(optionIds).then(result => {
                    if (result) {
                        vehicle["vhc_opts"] = result
                    };
                })
            }

            await this.imageService.findByImageTable("cx_vhc", vch_id).catch(err => {throw new Error(err)})
                .then(result => {
                    vhc_imgs = result;
                })
            if (vhc_imgs) {
                vehicle["vhc_imgs"] = vhc_imgs
            }

            return vehicle;

        } else {
            let err = "vhc_id not exits"
            {throw new Error(err)}
        }
    }

}