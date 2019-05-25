import { cx_vhc_moto as Vehicle } from "../../../entities/vehicle/cx_vhc_moto";
import IMotoRepository from "./IMotoRepository";
import { Connection, Repository, getConnectionManager, UpdateResult } from 'typeorm';
import ConnectVehicleSql from "../../../connect/ConnectVehicleSql";

export default class MotoRepository extends ConnectVehicleSql implements IMotoRepository {

    private vehicleRepo: Repository<Vehicle>;
    constructor() {
        super();
        this.vehicleRepo = getConnectionManager().get("chungxe_vehicle").getRepository(Vehicle);
    }

    public async getAll(): Promise<Array<Vehicle>> {
        let type = 2;
        return await this.vehicleRepo.find({ "vhc_type_id": type })
    }

    public async getOne(id: number): Promise<Vehicle> {
        return await this.vehicleRepo.findOne(id);
    }

    public async create(vehicle: Vehicle): Promise<Vehicle> {
        await this.vehicleRepo.save(vehicle);
        return await this.findByName(vehicle.vhc_slug)
    }

    public async delete(id: number): Promise<UpdateResult> {
        return await this.vehicleRepo.update(id, {"vhc_del": new Date()});
    }
    public async update(id: number, vehicle: Vehicle): Promise<Vehicle> {
        await this.vehicleRepo.update(id, vehicle);
        return await this.getOne(id);
    }

    public async findByVehicleName(name: string): Promise<Vehicle> {
        return await this.vehicleRepo.findOne({ "vhc_name": name })
    }

    public async findByVehicleOption(option: any): Promise<any> {
        return  await this.vehicleRepo.find(option)

    }

    public async findByName(vhc_slug: string): Promise<Vehicle> {
        return  await this.vehicleRepo.findOne({vhc_slug: vhc_slug, vhc_type_id: 2})

    }


    public async createList(list: Array<Vehicle>): Promise<Array<Vehicle>> {
        let vehicle = await this.vehicleRepo.save(list)
        return vehicle;
    }

    public async findIdByName(bran_name, vhc_name):Promise <Vehicle>{
        return  await this.vehicleRepo.findOne({vhc_bran_name:bran_name, vhc_name: vhc_name})
    }


}