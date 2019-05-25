import { cx_user_img } from "../../entities/user/cx_user_img";
import { cx_user_acc } from "../../entities/user/cx_user_acc";

export default class UserResDTO {

    private user_acc_id: number;
    private user_part_id: number;
    private user_role_id: number;
    private user_acc_name: string;
    private user_acc_full_name: string;
    private user_acc_pass: string;
    private user_acc_tokn: string;
    private user_acc_emai: string;
    private user_acc_phon: string;
    private user_acc_img: string;
    private disb_api_ids: string;
    private user_acc_last_logn: Date;
    private user_acc_crta: Date;
    private user_acc_upda: Date;
    private user_acc_del: Date;
    private user_imgs: cx_user_img[];

    constructor(user: cx_user_acc) {
        this.user_acc_id = user.user_acc_id
        this.user_part_id = user.user_part_id
        this.user_role_id = user.user_role_id
        this.user_acc_name = user.user_acc_name
        this.user_acc_full_name = user.user_acc_full_name
        this.user_acc_pass = user.user_acc_pass
        this.user_acc_tokn = user.user_acc_tokn
        this.user_acc_emai = user.user_acc_emai
        this.user_acc_phon = user.user_acc_phon
        this.user_acc_img = user.user_acc_img 
        this.disb_api_ids = user.disb_api_ids
        this.user_acc_last_logn = user.user_acc_last_logn
        this.user_acc_crta = user.user_acc_crta
        this.user_acc_upda = user.user_acc_upda
        this.user_acc_del = user.user_acc_del
        this.user_imgs = new Array<cx_user_img>();
    }

    getUserAccId(){
        return this.user_acc_id
    }
    getUserpartId (){
        return this.user_part_id
    }
    getUserRoleId (){
        return this.user_role_id
    }
    getUserAccName(){
        return this.user_acc_name
    }
    getUserAccFullname (){
        return this.user_acc_full_name
    }
    getUserAccPass(){
        return this.user_acc_pass
    }
    getUserAccTokn (){
        return this.user_acc_tokn
    }
    getUserAccEmai(){
        return this.user_acc_emai
    }
    getUserAccPhon (){
        return this.user_acc_phon
    }
    getUserAccImg(){
        return this.user_acc_img
    }
    getDisbApiIds (){
        return this.disb_api_ids
    }
    getUserAccLastLogn (){
        return this.user_acc_last_logn
    }
    getUserAccCrta (){
        return this.user_acc_crta
    }
    getUserAccUpda (){
        return this.user_acc_upda
    }
    getUserAccDel (){
        return this.user_acc_del
    }
    getUserImgs(){
        return this.user_imgs;
    }
    setUserAccId(user_acc_id: number){
        this.user_acc_id = user_acc_id
    }
    setUserpartId (user_part_id: number){
        this.user_part_id = user_part_id
    }
    setUserRoleId (user_role_id: number){
        this.user_role_id = user_role_id
    }
    setUserAccName(user_acc_name: string){
        this.user_acc_name = user_acc_name
    }
    setUserAccFullname (user_acc_full_name: string){
        this.user_acc_full_name = user_acc_full_name
    }
    setUserAccPass(user_acc_pass: string){
        this.user_acc_pass = user_acc_pass
    }
    setUserAccTokn (user_acc_tokn: string){
        this.user_acc_tokn = user_acc_tokn
    }
    setUserAccEmai(user_acc_emai: string){
        this.user_acc_emai = user_acc_emai
    }
    setUserAccPhon (user_acc_phon: string){
        this.user_acc_phon = user_acc_phon
    }
    setUserAccImg(user_acc_img: string){
        this.user_acc_img = user_acc_img
    }
    setDisbApiIds (disb_api_ids: string){
        this.disb_api_ids = disb_api_ids
    }
    setUserAccLastLogn (user_acc_last_logn: Date){
        this.user_acc_last_logn = user_acc_last_logn
    }
    setUserAccCrta (user_acc_crta: Date){
        this.user_acc_crta = user_acc_crta
    }
    setUserAccUpda (user_acc_upda: Date){
        this.user_acc_upda = user_acc_upda
    }
    setUserAccDel (user_acc_del: Date){
        this.user_acc_del = user_acc_del
    }
    setUserImgs(user_imgs: cx_user_img[]){
        this.user_imgs = user_imgs;
    }

}
