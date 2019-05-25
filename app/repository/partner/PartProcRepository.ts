import {cx_part_proc as PartProcedure} from "../../entities/partner/cx_part_proc"
import { Repository, getConnectionManager } from "typeorm";

export default class PartProcedureRepository{
    private partProcRepo: Repository<PartProcedure>;
    constructor() {
        this.partProcRepo = getConnectionManager().get("chungxe_partner").getRepository(PartProcedure);
    }

    public async getAll() {
        return await this.partProcRepo.find();
    }
    public async getOne(id: number){
        return await this.partProcRepo.findOne({"part_proc_id": id})
    }
    public async save(partProc: PartProcedure){
        return await this.partProcRepo.save(partProc);
    }
    public async delete(id: number){
        let partProc = await this.getOne(id);
        await this.partProcRepo.delete(id);
        return partProc;
    }
    public async createList(partProc: PartProcedure[]){
        return await this.partProcRepo.save(partProc);
    }
    public async findByPartId(id: number){
        return await this.partProcRepo.find({"part_id": id});
    }
    public async deleteByPartId(id: number){
        return await this.partProcRepo.delete({part_id: id}); 
    }
}