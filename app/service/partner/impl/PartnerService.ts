import IPartnerService from "../IPartnerService";
import { cx_part as Partner } from "../../../entities/partner/cx_part"
import PartnerRepository from "../../../repository/partner/PartnerRepository";
import { UpdateResult } from "typeorm";
import HolidayService from "../../../service/partner/impl/HolidayService";
import WdayService from "../../../service/partner/impl/WdayService";
import ProcedureService from "../../../service/partner/impl/ProcedureService";
import PayMethodService from "../../../service/partner/impl/PayMethodService";
import PartWdayService from "../../../service/partner/impl/PartWdayService";
import PartProcService from "../../../service/partner/impl/PartProcService";
import PartPayMethService from "../../../service/partner/impl/PartPayMethService";
import PartHoliService from "../../../service/partner/impl/PartHoliService"


export default class PartnerService implements IPartnerService {

    private partnerRepository : PartnerRepository;
    private wdayService: WdayService;
    private partWdayService: PartWdayService;
    private payMethodService: PayMethodService;
    private partPayMethService: PartPayMethService;
    private procedureService: ProcedureService;
    private partProcService: PartProcService;
    private holidayService: HolidayService;
    private partHoliService: PartHoliService;

    constructor(){
        this.payMethodService = new PayMethodService();
        this.partPayMethService = new PartPayMethService();
        this.wdayService = new WdayService();
        this.partWdayService = new PartWdayService();
        this.procedureService = new ProcedureService();
        this.partProcService = new PartProcService();
        this.holidayService = new HolidayService();
        this.partHoliService = new PartHoliService();
        this.partnerRepository = new PartnerRepository()
    }

    public async getPartners() {
        return await this.partnerRepository.getAll();
    }
    public async getPartnerById(id: number) {
        return await this.partnerRepository.getOne(id)
    }
    public async getPartnerByName(name: string, vhc_type_id: number): Promise<Partner> {
        return await this.partnerRepository.findByName(name, vhc_type_id);
    }

    public async getPartnerByEmail(email: string): Promise<Partner> {
        return await this.partnerRepository.findByEmail(email);
    }
    public async getPartnerByPhone(phone: string): Promise<Partner> {
        return await this.partnerRepository.findByPhone(phone);
    }

    public async createPartner(partner: Partner): Promise<Partner> {
        await this.partnerRepository.save(partner);
        return await this.getPartnerByName(partner.part_name, partner.vhc_type_id);
    }

    public async updatePartner(part_id, partner: Partner): Promise<UpdateResult> {
       return await this.partnerRepository.update(part_id,partner);
        
    }

    public async findByOptions(options: any): Promise<any> {
        return await this.partnerRepository.findByOptions(options)
    }

    public async delete(id: number): Promise<UpdateResult> {
        return await this.partnerRepository.delete(id);
    }

    getDetailPartner = async (part_id: number, type: number) => {
        let partner;

        if (part_id) {
            let part_procs = [], part_pay_meths = [], part_wdays = [], part_holis = [];
            let procIds = [], payIds = [], wdayIds = [], holiIds = []
            let procs, pays, holis, ways
            partner = await this.getPartnerById(part_id).catch(err => { throw new Error(err) });
            if(type == 1){
                delete partner["part_ctac_mobi"];
                delete partner["part_ctac_name"];
                delete partner["part_ctac_mobi"];
                delete partner["part_pay_acc"];
                delete partner["part_web"];
                delete partner["part_phone"]
            }
            await this.partProcService.findByPartId(part_id)
                .catch(err => { throw new Error(err) })
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        procIds.push(result[i].proc_id);

                    }
                    procs = result

                })
            for (let i = 0; i < procIds.length; i++) {
                await this.procedureService.getOne(procIds[i]).then(result => {
                    if (result) {
                        let procedure = {};
                        procedure["part_proc_id"] = procs[i].part_proc_id;
                        procedure["proc"] = result
                        procedure["part_proc_note"] = procs[i].part_proc_note;
                        procedure["part_proc_note_en"] = procs[i].part_proc_note_en;
                        part_procs.push(procedure)
                    };
                })
            }
            partner["part_procs"] = part_procs;

            //pay
            await this.partPayMethService.findByPartId(part_id)
                .catch(err => { throw new Error(err) })
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        payIds.push(result[i].pay_meth_id);

                    }

                })
            if (payIds.length > 0)
                await this.payMethodService.findIn(payIds).then(result => {
                    if (result) {
                        partner["part_pay_meths"] = result;
                    };
                })
            else {
                partner["part_pay_meths"] = [];
            }
            //wday
            await this.partWdayService.findByPartId(part_id)
                .catch(err => { throw new Error(err) })
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        wdayIds.push(result[i].wday_id);

                    }
                    ways = result

                })
            for (let i = 0; i < wdayIds.length; i++) {
                await this.wdayService.getOne(wdayIds[i]).then(result => {
                    if (result) {
                        let way = {};
                        way["part_way_id"] = ways[i].part_way_id;
                        way["wday"] = result
                        way["part_wday_exta_fee"] = ways[i].part_wday_exta_fee;
                        part_wdays.push(way)


                    };
                })
                    .catch(err => { throw new Error(err) })
            }
            partner["part_wdays"] = part_wdays;

            //holis
            await this.partHoliService.findByPartId(part_id)
                .catch(err => { throw new Error(err) })
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        holiIds.push(result[i].holi_id);

                    }
                    holis = result

                })
            for (let i = 0; i < holiIds.length; i++) {
                await this.holidayService.getOne(holiIds[i]).then(result => {
                    if (result) {
                        let holi = {};
                        holi["part_holi_id"] = holis[i].part_holi_id;
                        holi["holi"] = result
                        holi["part_holi_exta_fee"] = holis[i].part_holi_exta_fee;
                        part_holis.push(holi)


                    };
                }).catch(err => { throw new Error(err) })
            }
            partner["part_holis"] = part_holis;



        } else {
            let err = "part_id not exits"
            throw new Error(err)
        }
        return partner;
    }

   
}

