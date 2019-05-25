import { Repository, getConnectionManager } from "typeorm";
import { cx_promo } from "../../entities/booking/cx_promo";

export default class PromoRepository {
    private promoRepository: Repository<cx_promo>;
    constructor() {
        this.promoRepository = getConnectionManager().get("chungxe_booking").getRepository(cx_promo);
    }

    public async getAll(){
        return await this.promoRepository.find();
    }

    public async getById(id: number){
        return await this.promoRepository.findOne(id)
    }

    public async getByCode(code: string){
        return await this.promoRepository.findOne({promo_code: code})
    }
}