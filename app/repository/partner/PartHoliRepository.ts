import {cx_part_holi as PartHoli} from "../../entities/partner/cx_part_holi"
import { Repository, getConnectionManager } from "typeorm";

export default class PartHoliRepository{
    private partHoliRepo: Repository<PartHoli>;
    constructor() {
        this.partHoliRepo = getConnectionManager().get("chungxe_partner").getRepository(PartHoli);
    }

    public async getAll() {
        return await this.partHoliRepo.find();
    }
    public async getOne(id: number){
        return await this.partHoliRepo.findOne({"part_holi_id": id})
    }
    public async create(partHoli: PartHoli){
        return await this.partHoliRepo.save(partHoli);
    }
    public async createList(partHoli: PartHoli[]){
        return await this.partHoliRepo.save(partHoli);
    }

    public async findByPartId(id: number){
        return await this.partHoliRepo.find({"part_id": id});
    }

    public async delete(id: number){
        let partHoli = await this.getOne(id);
        await this.partHoliRepo.delete(id);
        return partHoli;
    }

    public async deleteByPartId(id: number){
        return await this.partHoliRepo.delete({part_id: id}); 
    }
}