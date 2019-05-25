
import { cx_book_src as BookSource} from "../../entities/booking/cx_book_src";
import BookSourceRepository from "../../repository/booking/BookSourceRepository";

export default class BookSourceService {
    private bookSourceRepository;
    constructor(){
        this.bookSourceRepository = new BookSourceRepository();

    }

    public async getAll(){
        return await this.bookSourceRepository.getAll();
    }

}