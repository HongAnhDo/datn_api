import { cx_book } from "../../entities/booking/cx_book";

export default class BookingAffResDTO {

    private book_id: number;
    private book_code: string;
    private vhc_type_id: number;
    private vhc_type_name: string;
    private cstm_name: string;
    private cstm_phon: string;
    private cstm_emai: string;
    private book_rent_date: Date;
    private book_retun_date: Date;
    private book_note: string;
    private book_stt: string;
    private book_prie_tota: number;
    private book_crta: Date;
    private book_upda: Date;
    private book_del: Date;
    private book_src_key: string;
    private aff_sub: string;

    constructor(book: cx_book) {
        this.book_id = book.book_id;
        this.book_code = book.book_code;
        this.cstm_name = book.cstm_name;
        this.cstm_phon = book.cstm_phon;
        this.cstm_emai = book.cstm_emai;
        this.book_rent_date = book.book_rent_date;
        this.book_retun_date = book.book_retun_date;
        this.book_note = book.book_note;
        this.book_stt = "";
        this.book_prie_tota = book.book_prie_tota;
        this.book_crta = book.book_crta;
        this.book_upda = book.book_upda;
        this.book_del = book.book_del;
        this.book_src_key = book.book_src_key;
        this.aff_sub = book.aff_sub;
        this.vhc_type_id = book.vhc_type_id;
        this.vhc_type_name = book.vhc_type_name;
    }
    getBookId(){
        return this.book_id
    }
    getBookCode(){
        return this.book_code
    }
    getCstmName(){
        return this.cstm_name
    }
    getCstmPhon(){
        return this.cstm_phon
    }
    getCstmEmai(){
        return this.cstm_emai
    }
    getBookRentDate(){
        return this.book_rent_date
    }
    getBookRetunDate(){
        return this.book_retun_date
    }
    getBookNote(){
        return this.book_note;
    }
    getBookStt(){
        return this.book_stt
    }
    getBookPrieTota(){
        return this.book_prie_tota
    } 
    getBookCrta(){
        return this.book_crta
    }
    getBookUpda(){
        return this.book_upda
    }
    getBookDel(){
        return this.book_del
    }
    getBookSrcKey(){
        return this.book_src_key;
    }
    getAffSub(){
        return this.aff_sub
    }
    getVHcTypeId(){
        return this.vhc_type_id
    }
    getVhcTypeName(){
        return this.vhc_type_name
    }

    setBookId(book_id: number){
        this.book_id = book_id
    }
    setBookCode(book_code: string){
        this.book_code = book_code
    }
    setCstmName(cstm_name: string){
        this.cstm_name = cstm_name
    }
    setCstmPhon(cstm_phon: string){
        this.cstm_phon = cstm_phon
    }
    setCstmEmai(cstm_emai: string){
        this.cstm_emai = cstm_emai
    }
    setBookRentDate(book_rent_date: Date){
        this.book_rent_date = book_rent_date
    }
    setBookRetunDate(book_retun_date: Date){
        this.book_retun_date = book_retun_date
    }
    setBookNote(book_note: string){
        this.book_note = book_note
    }
    setBookStt(book_stt: string){
        this.book_stt = book_stt
    }
    setBookPrieTota(book_prie_tota: number){
        this.book_prie_tota = book_prie_tota
    } 
    setBookCrta(book_crta: Date){
        this.book_crta = book_crta
    }
    setBookUpda(book_upda: Date){
        this.book_upda = book_upda
    }
    setBookDel(book_del: Date){
        this.book_del = book_del
    }
    setBookSrcKey(book_src_key: string){
        this.book_src_key = book_src_key;
    }
    setAffSub(aff_sub: string){
        this.aff_sub = aff_sub
    }
    setVhcTypeId(vhc_type_id: number){
        this.vhc_type_id = vhc_type_id
    }
    setVhcTypeName(vhc_type_name: string){
        this.vhc_type_name = vhc_type_name
    }
}