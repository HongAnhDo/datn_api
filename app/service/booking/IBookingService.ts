import BookingResDTO from "../../dto/booking/BookingResDTO";
import BookingReqDTO from "../../dto/booking/BookingReqDTO";
import {cx_book as Booking} from '../../entities/booking/cx_book'
import { UpdateResult } from "typeorm";
import BookingAffResDTO from "../../dto/booking/BookingAffResDTO";
import BookingResFullDTO from "../../dto/booking/BookingResFullDTO";

export default interface IBookingService{
    getAll(): Promise<BookingResDTO[]>;
    delete(id: number): Promise<UpdateResult>;
    getList(index : number): Promise<Booking[]>;
    getBookingsUser(user_acc_id: number,index : number): Promise<Booking[]>
    getOne(id: number): Promise<BookingResDTO>;
    create(bookingReq: BookingReqDTO): Promise<BookingResDTO>
    getByCode(code: string): Promise<BookingResDTO>;
    getByCodeFullResponse(code: string): Promise<BookingResFullDTO>;
    calculateDeliPrice(bookingReq: BookingReqDTO): Promise<any>;
    calculatePromoPrice(bookingReq: BookingReqDTO): Promise<any>;
    getDetailPrice(bookingReq: BookingReqDTO): Promise<any>;
    getBookingsByUserId(user_acc_id: number): Promise<any>;
    getBookingsByToken(token: string): Promise<any>;
    updateLevel(book_id: number, book_stt_id: number):Promise<any>; 
    getBookingsByUtmSource( data: Object ): Promise<BookingAffResDTO[]>;
    editQuickBooking(data: Object): Promise<BookingResFullDTO>;
    editBooking(data: Object): Promise<BookingResFullDTO>;
    findBookingForStatistic(obj: Object): Promise<Object>
    findStatisticLevel(obj: Object): Promise<Object>
    findStatisticLevelForWeek(obj: Object): Promise<Object>

}