import { cx_book as Booking, cx_book } from "../../entities/booking/cx_book"
import { Repository, getConnectionManager, UpdateResult, MoreThan, LessThan, Between } from "typeorm";

export default class BookingRepository {
    private bookRepository: Repository<Booking>;
    constructor() {
        this.bookRepository = getConnectionManager().get("chungxe_booking").getRepository(Booking);
    }

    public async getAll() {
        var bookings = await this.bookRepository
            .createQueryBuilder("cx_book")
            .orderBy("cx_book.book_id", "DESC")
            .limit(40)
            .getMany();
        return bookings
    }

    public async getList(index) {
        var bookings = await this.bookRepository
            .createQueryBuilder("cx_book")
            .where({ "book_del": null })
            .orderBy("cx_book.book_id", "DESC")
            .offset(100 * parseInt(index))
            .limit(100)
            .getMany();
        return bookings
    }

    public async getBookingsUser(use_acc_id, index) {
        var bookings = await this.bookRepository
            .createQueryBuilder("cx_book")
            .where({ "book_del": null, "user_acc_id": use_acc_id })
            .orderBy("cx_book.book_id", "DESC")
            .offset(100 * parseInt(index))
            .limit(100)
            .getMany();
        return bookings
    }

    public async getListLimit(numberLimit) {
        var bookings = await this.bookRepository
            .createQueryBuilder("cx_book")
            .where({ "book_del": null })
            .orderBy("cx_book.book_id", "DESC")
            .limit(numberLimit)
            .getMany();

        return bookings
    }
    public async getOne(id: number) {
        return await this.bookRepository.findOne({ book_id: id })
    }
    public async create(booking: Booking) {
        return await this.bookRepository.save(booking);
    }
    public async update(id: number, booking: Booking): Promise<any> {
        return await this.bookRepository.update(id, booking);
    }

    public async updateLevel(book_id: number, book_stt_id): Promise<any> {
        return await this.bookRepository.update(book_id, { "book_stt_id": book_stt_id });
    }
    public async edit(book_id: number, obj): Promise<any> {
        return await this.bookRepository.update(book_id, obj);
    }
    public async findByCode(code: string) {
        return await this.bookRepository.find({ book_code: code });
    }
    public async findByUserId(user_acc_id: number) {
        return await this.bookRepository.find({ use_acc_id: user_acc_id });
    }
    public async delete(id: number): Promise<UpdateResult> {
        return await this.bookRepository.update(id, { "book_del": new Date() });
    }
    public async findBySourceKey(sourceKey: string, affSub: string, sDate: Date, eDate: Date, sort: 'DESC' | 'ASC') {
        var options = affSub ? {
            book_src_key: sourceKey,
            aff_sub: affSub,
            book_crta: Between(sDate, eDate)
        } : {
                book_src_key: sourceKey,
                book_crta: Between(sDate, eDate)
            }
        var bookings = await this.bookRepository.find({
            where: options,
            order: {
                book_crta: sort
            }
        })
        return bookings
    }

    public async findBookingForStatistic(date_start, date_end, vhc_type_id): Promise<any> {
        let obj = {};
        obj["book_del"] = null

        if (date_start && date_end)
            obj["book_crta"] = Between(date_start, date_end);
        if (vhc_type_id)
            obj["vhc_type_id"] = vhc_type_id;

        var bookings = await this.bookRepository
            .createQueryBuilder("cx_book")
            .where(obj)
            .getMany();
        return bookings;
    }
    
   
}