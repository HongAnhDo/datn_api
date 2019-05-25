import { cx_book_prie_detl } from "../../entities/booking/cx_book_prie_detl";
import { cx_book_prie_type } from "../../entities/booking/cx_book_prie_type";

export default class BookingPriceDetailDTO {
    private book_prie_detl_id: number;
    private book_id: number;
    private book_prie_type: cx_book_prie_type;
    private prie_type_qaty: number | null;
    private unit_prie: number | null;
    private detl_prie_tota: number | null;

    constructor(priceDetail: cx_book_prie_detl) {
        this.book_prie_detl_id = priceDetail.book_prie_detl_id;
        this.book_id = priceDetail.book_id;
        this.book_prie_type = new cx_book_prie_type();
        this.book_prie_type.book_prie_type_id = priceDetail.book_prie_type_id;
        this.prie_type_qaty = priceDetail.prie_type_qaty;
        this.unit_prie = priceDetail.unit_prie;
        this.detl_prie_tota = priceDetail.detl_prie_tota;
    }

    public getBookPrieDtlId() {
        return this.book_prie_detl_id
    }

    public setBookPrieDtlId(book_prie_detl_id: number) {
        this.book_prie_detl_id = book_prie_detl_id
    }

    public getBookId() {
        return this.book_id
    }

    public setBookId(book_id: number) {
        this.book_id = book_id
    }

    public getBookPrieType() {
        return this.book_prie_type
    }

    public setBookPrieType(book_prie_type: cx_book_prie_type) {
        this.book_prie_type = book_prie_type
    }

    public getPrieTypeQaty() {
        return this.prie_type_qaty
    }

    public setPrieTypeQaty(prie_type_qaty: number) {
        this.prie_type_qaty = prie_type_qaty
    }

    public getUnitPrie() {
        return this.unit_prie
    }

    public setUnitPrie(unit_prie: number) {
        this.unit_prie = unit_prie
    }

    public getDetlPrieTota() {
        return this.detl_prie_tota
    }

    public setDetlPrieTota(detl_prie_tota: number) {
        this.detl_prie_tota = detl_prie_tota
    }

}