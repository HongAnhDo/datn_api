import { cx_book_src } from "../../entities/booking/cx_book_src";
import { Repository, getConnectionManager } from "typeorm";

export default class BookSourceRepository {
    private bookSourceRepository: Repository<cx_book_src>;
    constructor() {
        this.bookSourceRepository = getConnectionManager().get("chungxe_booking").getRepository(cx_book_src);
    }

    public async getAll(){
        return await this.bookSourceRepository.find();
    }

    public async getById(id: number){
        return await this.bookSourceRepository.findOne({"book_src_id": id})
    }

    public async getByName(name: string){
        return await this.bookSourceRepository.findOne({"book_src_name": name})
    }
}