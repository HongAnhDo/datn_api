import { cx_user_img } from "../../entities/user/cx_user_img";
import { Repository, getConnectionManager } from "typeorm";

export default class UserImageRepository {
    private userImageRepo: Repository<cx_user_img>;

    constructor() {
        this.userImageRepo = getConnectionManager().get("chungxe_user").getRepository(cx_user_img);
    }

    public async findByUserId(user_acc_id: number) {
        return await this.userImageRepo.find({ user_acc_id: user_acc_id });
    }

    public async deleteByUserId(user_acc_id: number) {
        return await this.userImageRepo.delete({ user_acc_id: user_acc_id });
    }

    public async save(user_img: cx_user_img) {
        return await this.userImageRepo.save(user_img);
    }

}