import { cx_vhc_opt_map as OptionMap } from "../../../entities/vehicle/cx_vhc_opt_map";
import { Connection, Repository } from 'typeorm';
import ConnectVehicleSql from "../../../connect/ConnectVehicleSql";
import IOptionMapRepository from "./IOptionMapRepository";
import { getConnectionManager } from 'typeorm'

export default class OptionMapRepository extends ConnectVehicleSql implements IOptionMapRepository {

    private optionMapRepo: Repository<OptionMap>;

    constructor() {
        super();
        this.optionMapRepo = getConnectionManager().get("chungxe_vehicle").getRepository(OptionMap);

    }


    public async getAll(): Promise<Array<OptionMap>> {
        return await this.optionMapRepo.find();
    }

    public async getOne(id: number): Promise<OptionMap> {
        return await this.optionMapRepo.findOne(id);
    }

    public async create(optionMap: OptionMap): Promise<OptionMap> {
        let result = await this.findByOptions({ vhc_opt_id: optionMap.vhc_opt_id, vhc_id: optionMap.vhc_id })
        if (result)
            return;
        return await this.optionMapRepo.save(optionMap);
    }

    public async createList(list: Array<OptionMap>): Promise<Array<OptionMap>> {
        let result = await this.optionMapRepo.save(list);
        return result;
    }

    public async delete(id: number): Promise<OptionMap> {
        let optionMap = await this.getOne(id);
        await this.optionMapRepo.delete(id);
        return optionMap;

    }
    public async update(id: number, optionMap: OptionMap): Promise<OptionMap> {
        await this.optionMapRepo.update(id, optionMap);
        return this.getOne(id);
    }

    public async findByOptionId(optionId: number): Promise<OptionMap> {
        let optionMap = this.optionMapRepo.findOne({ "vhc_opt_id": optionId })
        return optionMap;
    }

    public async findByVehicleId(vehicleId: number): Promise<OptionMap[]> {
        return await this.optionMapRepo.find({ "vhc_id": vehicleId })

    }

    public async findByOptions(options: any): Promise<any> {
        return await this.optionMapRepo.findOne(options);
    }

    public async deleteByVehicleId(id: number){
        return await this.optionMapRepo.delete({vhc_id: id}); 
    }

    // connect(): Promise<Connection[]> {
    //     return super.connect();
    // }

}