
export default class UserReqDTO {

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

    constructor(req) {
        this.user_acc_id = req.user_acc_id
        this.user_part_id = req.user_part_id
        this.user_role_id = req.user_role_id
        this.user_acc_name = req.user_acc_name
        this.user_acc_full_name = req.user_acc_full_name
        this.user_acc_pass = req.user_acc_pass
        this.user_acc_tokn = req.user_acc_tokn
        this.user_acc_emai = req.user_acc_emai
        this.user_acc_phon = req.user_acc_phon
        this.user_acc_img = req.user_acc_img 
        this.disb_api_ids = req.disb_api_ids
        this.user_acc_last_logn = req.user_acc_last_logn
        this.user_acc_crta = req.user_acc_crta
        this.user_acc_upda = req.user_acc_upda
        this.user_acc_del = req.user_acc_del
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

}
