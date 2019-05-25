export default class BookingReqDTO {
    private use_acc_id: number;
    private cstm_name: string;
    private cstm_phon: string;
    private cstm_emai: string;
    private cstm_deli_addr: string;
    private cstm_deli_addr_lat: number;
    private cstm_deli_addr_lng: number;
    private cstm_pay_meth_id: number;
    private vhc_part_id: number;
    private vhc_part_name: string;
    private book_rent_date: string;
    private book_retun_date: string;
    private book_deli_form_id: number;
    private promo_code: string;
    private book_note: string;
    private book_src_key: string;
    private utm_medium: string;
    private utm_campaign: string;
    private utm_content: string;
    private aff_sub: string;
    private book_schl: string;
    private book_rent_pupo: string;
    private his_call: string
    private cstm_addr_live: string
    private book_resn_id: number;
    private book_resn_name: string;
    private book_note_cskh: string;
    private book_src: string;

    constructor(reqBody) {
        this.use_acc_id = reqBody["use_acc_id"];
        this.cstm_name = reqBody.cstm_name;
        this.cstm_phon = reqBody.cstm_phon;
        this.cstm_emai = reqBody.cstm_emai;
        this.cstm_deli_addr = reqBody.cstm_deli_addr;
        this.cstm_deli_addr_lat = reqBody["cstm_deli_addr_lat"];
        this.cstm_deli_addr_lng = reqBody["cstm_deli_addr_lng"];
        this.cstm_pay_meth_id = reqBody.cstm_pay_meth_id;
        this.vhc_part_id = reqBody.vhc_part_id;
        this.vhc_part_name = reqBody.vhc_part_name;
        this.book_rent_date = reqBody.book_rent_date;
        this.book_retun_date = reqBody.book_retun_date;
        this.book_deli_form_id = reqBody.book_deli_form_id;
        this.promo_code = reqBody.promo_code;
        this.book_note = reqBody["book_note"];
        this.book_src_key = reqBody["book_src_key"];
        this.utm_medium = reqBody["utm_medium"];
        this.utm_campaign = reqBody["utm_campaign"];
        this.utm_content = reqBody["utm_content"];
        this.aff_sub = reqBody["aff_sub"];
        this.book_schl = reqBody["book_schl"];
        this.book_rent_pupo = reqBody["book_rent_pupo"];
        this.his_call = reqBody["his_call"];
        this.cstm_addr_live = reqBody["cstm_addr_live"];
        this.book_resn_id = reqBody["book_resn_id"];
        this.book_resn_name = reqBody["book_resn_name"];
        this.book_note_cskh = reqBody["book_note_cskh"];
        this.book_src = reqBody["book_src"];
    }

    getSrc(){
        return this.book_src;
    }
    getUseAccId() {
        return this.use_acc_id
    }
    getCstmName() {
        return this.cstm_name
    }
    getCstmPhon() {
        return this.cstm_phon
    }
    getCstmEmai() {
        return this.cstm_emai
    }
    getCstmDeliAddr() {
        return this.cstm_deli_addr
    }
    getCstmDeliAddrLat() {
        return this.cstm_deli_addr_lat
    }
    getCstmDeliAddrLng() {
        return this.cstm_deli_addr_lng
    }
    getCstmPayMethId() {
        return this.cstm_pay_meth_id
    }
    getVhcPartId() {
        return this.vhc_part_id
    }
    getVhcPartName() {
        return this.vhc_part_name
    }
    getBookRentDate() {
        return this.book_rent_date
    }
    getBookRetunDate() {
        return this.book_retun_date
    }
    getBookDeliFormId() {
        return this.book_deli_form_id
    }
    getPromoCode() {
        return this.promo_code
    }
    getBookNote() {
        return this.book_note
    }
    getBookSrcKey() {
        return this.book_src_key
    }
    getUtmMedium() {
        return this.utm_medium
    }
    getUtmCampaign() {
        return this.utm_campaign
    }
    getUtmContent() {
        return this.utm_content
    }
    getAffSub() {
        return this.aff_sub
    }

    getBookSchedule(){
        return this.book_schl;
    }
    getRentPurpose(){
        return this.book_rent_pupo;
    }

    getHistoryCall(){
        return this.his_call;
    }

    getCstmAddressLive(){
        return this.cstm_addr_live;
    }

    getBookReasonId(){
        return this.book_resn_id;
    }

    getBookReasonName(){
        return this.book_resn_name;
    }
    getNoteCSKH(){
        return this.book_note_cskh;
    }
    setSrc(book_src){
        this.book_src = book_src;
    }

    setBookNote(book_note: string) {
        this.book_note = book_note
    }

    setUseAccId(use_acc_id: number) {
        this.use_acc_id = use_acc_id
    }
    setCstmName(cstm_name: string) {
        this.cstm_name = cstm_name
    }
    setCstmPhon(cstm_phon: string) {
        this.cstm_phon = cstm_phon
    }
    setCstmEmai(cstm_emai: string) {
        this.cstm_emai = cstm_emai
    }
    setCstmDeliAddr(cstm_deli_addr: string) {
        this.cstm_deli_addr = cstm_deli_addr
    }
    setCstmDeliAddrLat(cstm_deli_addr_lat: number) {
        this.cstm_deli_addr_lat = cstm_deli_addr_lat
    }
    setCstmDeliAddrLng(cstm_deli_addr_lng: number) {
        this.cstm_deli_addr_lng = cstm_deli_addr_lng
    }
    setCstmPaymethId(cstm_pay_meth_id: number) {
        this.cstm_pay_meth_id = cstm_pay_meth_id
    }
    setVhcPartId(vhc_part_id: number) {
        this.vhc_part_id = vhc_part_id
    }
    setVhcPartName(vhc_part_name: string) {
        this.vhc_part_name = vhc_part_name
    }
    setBookRentDate(book_rent_date: string) {
        this.book_rent_date = book_rent_date
    }
    setBookRetunDate(book_retun_date: string) {
        this.book_retun_date = book_retun_date
    }
    setBookDeliFormId(book_deli_form_id: number) {
        this.book_deli_form_id = book_deli_form_id
    }
    setPromoCode(promo_code: string) {
        this.promo_code = promo_code
    }
    setBookSrcKey(book_src_key: string) {
        this.book_src_key = book_src_key;
    }
    setUtmMedium(utm_medium: string) {
        this.utm_medium = utm_medium
    }
    setUtmCampaign(utm_campaign: string) {
        this.utm_campaign = utm_campaign
    }
    setUtmContent(utm_content: string) {
        this.utm_content = utm_content
    }
    setAffSub(aff_sub: string) {
        this.aff_sub = aff_sub
    }

    setBookSchedule(book_schl: string){
        this.book_schl = book_schl;
    }
    setRentPurpose(book_rent_pupo){
        this.book_rent_pupo = book_rent_pupo;
    }

    setHistoryCall(his_call){
        this.his_call = his_call;
    }

    setCstmAddressLive(cstm_addr_live){
        this.cstm_addr_live = cstm_addr_live;
    }

    setBookReasonId(book_resn_id){
        this.book_resn_id = book_resn_id;
    }

    setBookReasonName(book_resn_name){
        this.book_resn_name = book_resn_name;
    }

    setNoteCSKH(book_note_cskh: string){
        this.book_note_cskh = book_note_cskh;
    }
}