import { cx_user_acc as UserAccount } from "../../entities/user/cx_user_acc";
import UserResDTO from "../../dto/user/UserResDTO";
import { cx_user_img } from "../../entities/user/cx_user_img";

export default interface IUserAccountService {
    getAll(): Promise<Array<UserResDTO>>
    getOne(id: number): Promise<UserResDTO>
    getUserByToken(token: string): Promise<UserResDTO>
    register(userAccount: UserAccount):Promise<UserResDTO>
    delete(id: number): Promise<UserAccount>
    update(token: string, userAccount: UserAccount): Promise<UserResDTO>
    findByEmail(email: string): Promise<UserAccount>
    findByPhone(phone: any): Promise<UserAccount>
    findByUsername(username: string) : Promise<UserAccount>
    login( username: string, password: string): Promise<UserResDTO>
    loginAdmin( username: string, password: string): Promise<UserAccount>
    logout(token: string): Promise<UserAccount>;
    changePassword(token: string, data: object): Promise<UserResDTO>;
    updateUserImages(token: string, userImgs: cx_user_img[]): Promise<UserResDTO>;
}


