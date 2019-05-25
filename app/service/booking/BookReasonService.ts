
import { cx_book_resn as BookReson} from "../../entities/booking/cx_book_resn";
import BookReasonRepository from "../../repository/booking/BookReasonRepository";

export default class BookReasonService {
    private bookReasonRepository;
    constructor(){
        this.bookReasonRepository = new BookReasonRepository();

    }

    public async getAll(){
        return await this.bookReasonRepository.getAll();
    }

    public async getByName(name: string){
        return await this.bookReasonRepository
    }

}