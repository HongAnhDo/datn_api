import { cx_book_stt } from "../../entities/booking/cx_book_stt";
import { cx_book_fedbak } from "../../entities/booking/cx_book_fedbak";
import { cx_book } from "../../entities/booking/cx_book";
import { cx_pay_meth } from "../../entities/partner/cx_pay_meth";
import BookingPriceDetailDTO from "./BookingPriceDetailDTO";
import { cx_vhc_img } from "../../entities/vehicle/cx_vhc_img";

export default class BookingResDTO {

    private book_id: number;
    private book_code: string;
    private use_acc_id: number;
    private cstm_name: string;
    private cstm_phon: string;
    private cstm_emai: string;
    private cstm_deli_addr: string;
    private cstm_pay_meth: cx_pay_meth;
    private vhc_part_id: number;
    private vhc_part_name: string;
    private part_id: number;
    private part_name: string;
    private city_id: number;
    private city_name: string;
    private vhc_type_id: number;
    private vhc_type_name: string;
    private book_rent_date: Date;
    private book_retun_date: Date;
    private book_note: string;
    private book_day_num: number;
    private book_exta_hour_num: number;
    private book_wday_num: number;
    private book_holi_num: number;
    private book_deli_form_id: number;
    private promo_code: string;
    private promo_val: number;
    private book_stt: cx_book_stt;
    private book_prie_tota: number;
    private book_crta: Date;
    private book_upda: Date;
    private book_del: Date;
    private book_fedbak: cx_book_fedbak[];
    private book_prie_detl : BookingPriceDetailDTO[];
    private vhc_imgs: cx_vhc_img[];
    private book_src_key: string;
    private utm_medium: string;
    private utm_campaign: string;
    private utm_content: string;
    private aff_sub: string;

    constructor(book: cx_book) {
        this.book_id = book.book_id;
        this.book_code = book.book_code;
        this.use_acc_id = book.use_acc_id;
        this.cstm_name = book.cstm_name;
        this.cstm_phon = book.cstm_phon;
        this.cstm_emai = book.cstm_emai;
        this.cstm_deli_addr = book.cstm_deli_addr;
        this.cstm_pay_meth = new cx_pay_meth();
        this.cstm_pay_meth.pay_meth_id = book.cstm_pay_meth_id;
        this.vhc_part_id = book.vhc_part_id;
        this.vhc_part_name = book.vhc_part_name;
        this.part_id = book.part_id;
        this.part_name = book.part_name;
        this.city_id = book.city_id;
        this.city_name = book.city_name;
        this.vhc_type_id = book.vhc_type_id;
        this.vhc_type_name = book.vhc_type_name;
        this.book_rent_date = book.book_rent_date;
        this.book_retun_date = book.book_retun_date;
        this.book_note = book.book_note;
        this.book_day_num = book.book_day_num;
        this.book_exta_hour_num = book.book_exta_hour_num;
        this.book_wday_num = book.book_wday_num;
        this.book_holi_num = book.book_holi_num;
        this.book_deli_form_id = book.book_deli_form_id;
        this.promo_code = book.promo_code;
        this.promo_val = book.promo_val;
        this.book_stt = new cx_book_stt();
        this.book_stt.book_stt_id = book.book_stt_id;
        this.book_prie_tota = book.book_prie_tota;
        this.book_crta = book.book_crta;
        this.book_upda = book.book_upda;
        this.book_del = book.book_del;
        this.book_fedbak = new Array<cx_book_fedbak>();
        this.book_prie_detl = new Array<BookingPriceDetailDTO>();
        this.vhc_imgs = new Array<cx_vhc_img>();
        this.book_src_key = book.book_src_key;
        this.utm_medium = book.utm_medium;
        this.utm_campaign = book.utm_campaign;
        this.utm_content = book.utm_content;
        this.aff_sub = book.aff_sub;
    }
    getBookId(){
        return this.book_id
    }

    getBookCode(){
        return this.book_code
    }
    getUseAccId(){
        return this.use_acc_id
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
    getCstmDeliAddr(){
        return this.cstm_deli_addr
    }
    getCstmPayMeth(){
        return this.cstm_pay_meth
    }
    getVhcPartId(){
        return this.vhc_part_id
    }
    getVhcPartName(){
        return this.vhc_part_name
    }
    getPartId(){
        return this.part_id
    }
    getPartName(){
        return this.part_name
    }
    getCityId(){
        return this.city_id
    }
    getCityName(){
        return this.city_name
    }
    getVhcTypeId(){
        return this.vhc_type_id
    }
    getVhcTypeName(){
        return this.vhc_type_name
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
    getBookDayNum(){
        return this.book_day_num
    }
    getBookExtaHourNum(){
        return this.book_exta_hour_num
    }
    getBookWdayNum(){
        return this.book_wday_num
    }
    getBookHoliNum(){
        return this.book_holi_num
    }
    getBookDeliFormId(){
        return this.book_deli_form_id
    }
    getPromoCode(){
        return this.promo_code
    }
    getPromoVal(){
        return this.promo_val
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
    getBookFedbak(){
        return this.book_fedbak
    }

    getVhcImgs(){
        return this.vhc_imgs
    }

    getBookPrieDetl(){
        return this.book_prie_detl
    }

    getBookSrcKey(){
        return this.book_src_key;
    }

    getUtmMedium(){
        return this.utm_medium
    }

    getUtmCampaign(){
        return this.utm_campaign
    }

    getUtmContent(){
        return this.utm_content
    }

    getAffSub(){
        return this.aff_sub
    }

    setBookId(book_id: number){
        this.book_id = book_id
    }
    setBookCode(book_code: string){
        this.book_code = book_code
    }
    setUseAccId(use_acc_id: number){
        this.use_acc_id = use_acc_id
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
    setCstmDeliAddr(cstm_deli_addr: string){
        this.cstm_deli_addr = cstm_deli_addr
    }
    setCstmPaymeth(cstm_pay_meth: cx_pay_meth){
        this.cstm_pay_meth = cstm_pay_meth
    }
    setVhcPartId(vhc_part_id: number){
        this.vhc_part_id = vhc_part_id
    }
    setVhcPartName(vhc_part_name: string){
        this.vhc_part_name = vhc_part_name
    }
    setPartId(part_id: number){
        this.part_id = part_id
    }
    setPartName(part_name: string){
        this.part_name = part_name
    }
    setCityId(city_id: number){
        this.city_id = city_id
    }
    setCityName(city_name: string){
        this.city_name = city_name
    }
    setVhcTypeId(vhc_type_id: number){
        this.vhc_type_id = vhc_type_id
    }
    setVhcTypeName(vhc_type_name: string){
        this.vhc_type_name = vhc_type_name
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
    setBookDayNum(book_day_num: number){
        this.book_day_num = book_day_num
    }
    setBookExtaHourNum(book_exta_hour_num: number){
        this.book_exta_hour_num = book_exta_hour_num
    }
    setBookWdayNum(book_wday_num: number){
        this.book_wday_num = book_wday_num
    }
    setBookHoliNum(book_holi_num: number){
        this.book_holi_num = book_holi_num
    }
    setBookDeliFormId(book_deli_form_id: number){
        this.book_deli_form_id = book_deli_form_id
    }
    setPromoCode(promo_code: string){
        this.promo_code = promo_code
    }
    setPromoVal(promo_val: number){
        this.promo_val = promo_val
    }
    setBookStt(book_stt: cx_book_stt){
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
    setBookFedBak(book_fedbak: cx_book_fedbak[]){
        this.book_fedbak = book_fedbak
    }
    setBookPrieDetl(book_prie_detl: BookingPriceDetailDTO[]){
        this.book_prie_detl = book_prie_detl
    }
    setVhcImgs(vhc_imgs: cx_vhc_img[]){
        this.vhc_imgs = vhc_imgs
    }
    setBookSrcKey(book_src_key: string){
        this.book_src_key = book_src_key;
    }
    setUtmMedium(utm_medium: string){
        this.utm_medium = utm_medium
    }
    setUtmCampaign(utm_campaign: string){
        this.utm_campaign = utm_campaign
    }
    setUtmContent(utm_content: string){
        this.utm_content = utm_content
    }
    setAffSub(aff_sub: string){
        this.aff_sub = aff_sub
    }
}