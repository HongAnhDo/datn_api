import { cx_part as Partner } from "../../entities/partner/cx_part"
import { Repository, getConnectionManager, UpdateResult } from "typeorm";

export default class PartnerRepository {
    private partnerRepository: Repository<Partner>;
    constructor() {
        this.partnerRepository = getConnectionManager().get("chungxe_partner").getRepository(Partner);
    }

    public async getAll() {
        return await this.partnerRepository.find({"part_del": null});
    }
    public async getOne(id: number) {
        return await this.partnerRepository.findOne({ "part_id": id })
    }
    public async save(partner: Partner) {
        await this.partnerRepository.save(partner);
        return await this.findByName(partner.part_name, partner.vhc_type_id);
    }

    public async update(part_id: number, partner: Partner) {
       return await this.partnerRepository.update(part_id, partner);
    }

    public async findByName(name: string, vhc_type_id: number) {
        return await this.partnerRepository.findOne({ "part_name": name, "vhc_type_id": vhc_type_id });
    }

    public async findByEmail(email: string) {
        return await this.partnerRepository.findOne({ "part_emai": email })
    }

    public async findByPhone(phone: string) {
        return await this.partnerRepository.findOne({ "part_phon": phone });
    }

    public async findByOptions(options: any) {
        return await this.partnerRepository.find(options);
    }

    public async delete(id: number): Promise<UpdateResult> {
        return await this.partnerRepository.update(id, {"part_del": new Date()});
    }
    public async count(vhc_type_id: number) : Promise<number>{
        var opt ={}
        if(vhc_type_id != undefined && vhc_type_id != null)
            opt ={vhc_type_id: vhc_type_id}
        return await this.partnerRepository.count(opt)
    }

}