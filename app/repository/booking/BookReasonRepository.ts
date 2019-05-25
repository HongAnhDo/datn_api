import { cx_book_resn as BookReason } from "../../entities/booking/cx_book_resn";
import { Repository, getConnectionManager } from "typeorm";

export default class BookReasonRepository {
    private bookReasonRepo: Repository<BookReason>;
    constructor() {
        this.bookReasonRepo = getConnectionManager().get("chungxe_booking").getRepository(BookReason);
    }

    public async getAll(){
        return await this.bookReasonRepo.find();
    }

    public async getById(id: number){
        return await this.bookReasonRepo.findOne({"book_resn_id": id})
    }

    public async getByName(name: string){
        return await this.bookReasonRepo.findOne({"book_resn_name": name})
    }
}