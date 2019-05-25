import { cx_vhc_part as VehiclePartner } from "../../entities/partner/cx_vhc_part"
import { cx_part as Partner } from "../../entities/partner/cx_part"

import { Repository, getConnectionManager, In, Between, UpdateResult } from "typeorm";

export default class VehiclePartRepository {
    private vehicleRepo: Repository<VehiclePartner>;
    constructor() {
        this.vehicleRepo = getConnectionManager().get("chungxe_partner").getRepository(VehiclePartner);
    }

    public async getListLimit(numberLimit) {
        var vehicles = await this.vehicleRepo
            .createQueryBuilder("cx_vhc_part")
            .where({ "vhc_part_del": null, vhc_part_hide: 0 })
            .orderBy("cx_vhc_part.vhc_part_id", "DESC")
            .limit(numberLimit)
            .getMany();

        return vehicles
    }

    public async getList(index, options) {
        options = Object.assign(options, { "vhc_part_del": null })
        var vehicles = await this.vehicleRepo
            .createQueryBuilder("cx_vhc_part")
            .where(options)
            .orderBy("cx_vhc_part.vhc_part_id", "DESC")
            .offset(100 * parseInt(index))
            .limit(100)
            .getMany();
        return vehicles;
    }


    public async getAll(): Promise<Array<VehiclePartner>> {
        return await this.vehicleRepo.find();
    }

    public async getFeaturedProducts(): Promise<Array<VehiclePartner>> {
        return await this.vehicleRepo.createQueryBuilder("cx_vhc_part")
            .limit(20)
            .getMany();;
    }

    public async getOne(id: number): Promise<VehiclePartner> {
        return await this.vehicleRepo.findOne({ "vhc_part_id": id });
    }

    public async create(vehicle: VehiclePartner): Promise<VehiclePartner> {
        return await this.vehicleRepo.save(vehicle);
    }

    public async delete(id: number): Promise<UpdateResult> {
        return await this.vehicleRepo.update(id, { "vhc_part_del": new Date() });

    }
    public async update(id: number, vehicle: VehiclePartner): Promise<VehiclePartner> {
        await this.vehicleRepo.update(id, vehicle);
        return await this.getOne(id);
    }

    public async findByVehicleName(name: string): Promise<VehiclePartner> {
        return await this.vehicleRepo.findOne({ "vhc_part_name": name })
    }

    public async findByVehicleOption(option: any): Promise<any> {
        var option1 = Object.assign(option, { "vhc_part_del": null })
        return await this.vehicleRepo.find(option1);

    }


    public async createList(list: Array<VehiclePartner>): Promise<Array<VehiclePartner>> {
        let vehicle = await this.vehicleRepo.save(list)
        return vehicle;
    }

    public async sumVehicle(vhc_type_id: number): Promise<number> {
        const photosSums = await getConnectionManager().get("chungxe_partner")
            .createQueryBuilder()
            .select("SUM(cx_vhc_part.vhc_part_qaty_tota)", "sum")
            .from(VehiclePartner, "cx_vhc_part")
            .where("cx_part.vhc_type_id = :id", {id: vhc_type_id})
            .from(Partner, "cx_part")
            .andWhere("cx_vhc_part.part_id = cx_part.part_id")
            .getRawOne()

        return photosSums["sum"];

    }

    public async findVehicles(vehicleIds: number[], partnerIds: number[], price_from: number, price_to: number, vhc_part_hide): Promise<any> {
        let obj = {};
        obj["vhc_part_del"] = null
        if ((vhc_part_hide == 0 || vhc_part_hide == 1) && vhc_part_hide)
            obj["vhc_part_hide"] = vhc_part_hide;
        if (vehicleIds.length > 0)
            obj["vhc_id"] = In(vehicleIds);
        else
            return []
        if (partnerIds.length > 0)
            obj["part_id"] = In(partnerIds);
        else
            return 0;
        if (price_from && price_to)
            obj["vhc_part_defa_prie"] = Between(price_from, price_to)

        let vehicle = await this.vehicleRepo.findAndCount(obj)

        return vehicle;
    }

    public async findVehiclesLimit(index, vehicleIds: number[], partnerIds: number[], price_from: number, price_to: number, vhc_part_hide): Promise<any> {
        let obj = {};
        obj["vhc_part_del"] = null
        // if ((vhc_part_hide == 0 || vhc_part_hide == 1) && vhc_part_hide)
        //     obj["vhc_part_hide"] = vhc_part_hide;
        if (vehicleIds.length > 0)
            obj["vhc_id"] = In(vehicleIds);
        else
            return []
        if (partnerIds.length > 0)
            obj["part_id"] = In(partnerIds);
        else
            return 0;
        if (price_from && price_to)
            obj["vhc_part_defa_prie"] = Between(price_from, price_to)

        var vehicles = await this.vehicleRepo
            .createQueryBuilder("cx_vhc_part")
            .where(obj)
            .orderBy("cx_vhc_part.vhc_part_id", "DESC")
            .offset(100 * parseInt(index))
            .limit(100)
            .getMany();
        // console.log(vehicles)
        return vehicles;
    }

}