
import { cx_book_stt as BookStatus} from "../../entities/booking/cx_book_stt";
import BookStatusRepository from "../../repository/booking/BookStatusRepository";

export default class BookStatusService {
    private bookStatusRepository;
    constructor(){
        this.bookStatusRepository = new BookStatusRepository();

    }

    public async getAll(){
        return await this.bookStatusRepository.getAll();
    }

}