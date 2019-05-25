import IUserAccountService from "./IUserAccountService";
import UserAccountRepository from "../../repository/user/UserAccountRepository";
import { cx_user_acc as UserAccount } from "../../entities/user/cx_user_acc";
import { Utils } from "../../utils/Validate";
import { MyUtil } from "../../utils/MyUtil";
import UserImageRepository from "../../repository/user/UserImageRepository";
import UserResDTO from "../../dto/user/UserResDTO";
import { cx_user_img } from "../../entities/user/cx_user_img";

export default class UserAccountService implements IUserAccountService {

    private userRepo: UserAccountRepository;
    private userImgRepo: UserImageRepository;

    constructor() {
        this.userRepo = new UserAccountRepository();
        this.userImgRepo = new UserImageRepository();
    }

    public async getAll(): Promise<Array<UserResDTO>> {
        var users = new Array<UserAccount>();
        await this.userRepo.getAll()
            .then(data => users = data)
            .catch(err => { throw new Error(err) })

        var result = new Array<UserResDTO>();
        for (let i = 0; i < users.length; i++) {
            let userRes = new UserResDTO(users[i])
            await this.userImgRepo.findByUserId(users[i].user_acc_id)
                .then(data => userRes.setUserImgs(data))
                .catch(err => console.log(err))
            result.push(userRes);
        }
        return result;
    }

    public async getOne(id: number): Promise<UserResDTO> {
        if (id <= 0 || (!id)) throw new Error("User's id is not true!")
        var user = new UserAccount();
        await this.userRepo.getOne(id)
            .then(data => user = data)
            .catch(err => { throw new Error(err) })

        let result = new UserResDTO(user);
        await this.userImgRepo.findByUserId(user.user_acc_id)
            .then(data => result.setUserImgs(data))
            .catch(err => { throw new Error(err) })
        return result;
    }

    public async getUserByToken(token: string): Promise<UserResDTO> {
        if (!token) throw new Error("Token is invalid!");
        var user = new UserAccount();

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed!");
        var result = new UserResDTO(user);
        var id = MyUtil.getUserIdByToken(token);
        if (id <= 0 || (!id) || (user.user_acc_id !== id)) throw new Error("Token is not true!");

        let userImgs = new Array<cx_user_img>();
        await this.userImgRepo.findByUserId(id)
            .then(data => userImgs = data)
            .catch(err => console.log(err));

        result.setUserImgs(userImgs);
        // console.log(result)
        return result;
    }

    public async register(user: UserAccount): Promise<UserResDTO> {
        if (!user) throw new Error("User is not null!")
        if (user.user_acc_name) {
            if (!Utils.checkUsername(user.user_acc_name)) throw new Error("Username is not true format")
            else await this.userRepo.findByUserName(user.user_acc_name)
                .then(data => {
                    if (data) throw new Error("User is existed!!")
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.user_acc_emai) {
            if (!Utils.isEmailAddress(user.user_acc_emai)) throw new Error("Email is not true format")
            else await this.userRepo.findByEmail(user.user_acc_emai)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.user_acc_phon) {
            if (!Utils.isPhoneNumber(user.user_acc_phon)) throw new Error("Phone is not true format")
            else await this.userRepo.findByPhone(user.user_acc_phon)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.user_acc_pass && Utils.checkPassword(user.user_acc_pass)) {
            user.user_acc_pass = MyUtil.getHashPass(user.user_acc_pass);
        } else throw new Error("Password is not true format")

        if ((!user.user_acc_name) && user.user_acc_phon) user.user_acc_name = user.user_acc_phon;
        else if ((!user.user_acc_name) && (!user.user_acc_phon) && user.user_acc_emai) user.user_acc_name = user.user_acc_emai;

        user.user_acc_crta = new Date();

        var newUser = new UserAccount();
        await this.userRepo.create(user)
            .then(data => newUser = data)
            .catch(err => { throw new Error(err) })

        if (!newUser) throw new Error("Error creating a new user")

        newUser.user_acc_tokn = MyUtil.getToken(newUser);
        await this.userRepo.update(newUser.user_acc_id, newUser)
            .then(data => newUser = data)
            .catch(err => { throw new Error(err) })

        let result = new UserResDTO(newUser);
        await this.userImgRepo.findByUserId(newUser.user_acc_id)
            .then(data => result.setUserImgs(data))
            .catch(err => { throw new Error(err) })

        return result;
    }

    public async delete(id: number): Promise<UserAccount> {
        await this.userImgRepo.deleteByUserId(id)
            .then(data => console.log(data))
            .catch(err => { throw new Error(err) })
        return await this.userRepo.delete(id);
    }

    public async update(token: string, userAccount: UserAccount): Promise<UserResDTO> {
        var user = new UserAccount();
        if (!token) throw new Error("Token is invalid!!");

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not true");

        var id = MyUtil.getUserIdByToken(token);
        if ((!id) || (id <= 0) || (user.user_acc_id !== id)) throw new Error("Token is not true!");

        userAccount.user_acc_id = id;
        var check = false;
        var isPhone = false;

        if (user.user_acc_name === user.user_acc_phon) isPhone = true;
        if (user.user_acc_name === user.user_acc_emai) isPhone = false;

        if (userAccount.user_acc_phon) {
            if (!Utils.isPhoneNumber(userAccount.user_acc_phon)) throw new Error("Phone number is not format!")
            let user1 = new UserAccount();
            await this.userRepo.findByPhone(userAccount.user_acc_phon)
                .then(data => user1 = data)
                .catch(err => console.log(err))
            if (!user1) check = check && true;
            else {
                if (user1.user_acc_phon === user.user_acc_phon) check = check && true;
                else throw new Error("Phone number is existed!!")
            }
            if (isPhone || userAccount.user_acc_phon) userAccount.user_acc_name = userAccount.user_acc_phon;
        }

        if (userAccount.user_acc_emai) {
            if (!Utils.isEmailAddress(userAccount.user_acc_emai)) throw new Error("Email is not format!");
            let user1 = new UserAccount();
            await this.userRepo.findByEmail(userAccount.user_acc_emai)
                .then(data => user1 = data)
                .catch(err => console.log(err))
            if (!user1) check = check && true;
            else {
                if (user1.user_acc_emai === user.user_acc_emai) check = check && true;
                else throw new Error("Email is existed!!")
            }
            if (!isPhone && (!userAccount.user_acc_phon)) userAccount.user_acc_name = userAccount.user_acc_emai;
        }

        if (userAccount.user_acc_pass) {
            if (!Utils.checkPassword(userAccount.user_acc_pass)) throw new Error("Password is not true format");
            userAccount.user_acc_pass = MyUtil.getHashPass(userAccount.user_acc_pass);
        }
        // userAccount.user_acc_tokn = MyUtil.getToken(userAccount)
        userAccount.user_acc_upda = new Date();
        console.log("user account: ", userAccount);
        let updatedUser = await this.userRepo.update(id, userAccount);

        let result = new UserResDTO(updatedUser);
        await this.userImgRepo.findByUserId(updatedUser.user_acc_id)
            .then(data => result.setUserImgs(data))
            .catch(err => { throw new Error(err) })
        return result;
    }

    public async changePassword(token: string, data: object): Promise<UserResDTO> {
        if ((!token) || (!data) || (!data["old_pass"]) || (!data["new_pass"])) throw new Error("Bạn chưa nhập đủ thông tin!");
        var user = new UserAccount();

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed!");

        var user_acc_id = MyUtil.getUserIdByToken(token);
        if (!user_acc_id || (user_acc_id <= 0) || (user.user_acc_id !== user_acc_id)) throw new Error("Token is not true!");

        if (!MyUtil.checkPass(data["old_pass"], user.user_acc_pass)) throw new Error("Mật khẩu không đúng!")

        if (Utils.checkPassword(data["new_pass"])) {
            user.user_acc_pass = MyUtil.getHashPass(data["new_pass"]);
        } else throw new Error("Password is not true format")

        user.user_acc_tokn = MyUtil.getToken(user);
        user.user_acc_upda = new Date();
        var newUser = new UserAccount();
        await this.userRepo.update(user.user_acc_id, user)
            .then(data => newUser = data)
            .catch(err => { throw new Error(err) })

        let result = new UserResDTO(newUser);
        await this.userImgRepo.findByUserId(newUser.user_acc_id)
            .then(data => result.setUserImgs(data))
            .catch(err => { throw new Error(err) })
        return result;
    }

    public async findByUsername(username: string): Promise<UserAccount> {
        return await this.userRepo.findByUserName(username);
    }

    public async findByEmail(email: string): Promise<UserAccount> {
        return await this.userRepo.findByEmail(email);
    }

    public async findByPhone(phone: any): Promise<UserAccount> {
        return await this.userRepo.findByPhone(phone);
    }

    public async login(username: string, password: string): Promise<UserResDTO> {

        if (!username || !password) throw new Error("Data is not enough!");

        let check = 0;

        if (Utils.isEmailAddress(username)) {
            check = 1;
        } else if (Utils.isPhoneNumber(username)) {
            check = 2;
        }

        if (check == 0) throw new Error("Email or phone is not true!")
        else {
            let user = new UserAccount();
            await this.userRepo.findByUserName(username)
                .then(data => user = data)
                .catch(err => console.log(err))
            if (!user) {
                if (check == 1) {
                    await this.userRepo.findByEmail(username)
                        .then(data => user = data)
                        .catch(err => console.log(err))
                } else if (check == 2) {
                    await this.userRepo.findByPhone(username)
                        .then(data => user = data)
                        .catch(err => console.log(err))
                }
            }
            if (!user) throw new Error("Email or phone is not true!")

            let checkPassword = MyUtil.checkPass(password, user.user_acc_pass);
            console.log("checkPassword", checkPassword)
            if (!checkPassword) throw new Error("Password is not true!");

            user.user_acc_tokn = MyUtil.getToken(user);
            user.user_acc_last_logn = new Date();
            user.user_acc_upda = new Date();
            await this.userRepo.update(user.user_acc_id, user)
                .then(data => user = data)
                .catch(err => { throw new Error(err) })

            let result = new UserResDTO(user);
            await this.userImgRepo.findByUserId(user.user_acc_id)
                .then(data => result.setUserImgs(data))
                .catch(err => { throw new Error(err) })
            return result
        }
    }

    public async logout(token: string): Promise<UserAccount> {
        var user = new UserAccount();
        if (!token) throw new Error("Token is invalid!!");

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed");

        var id = MyUtil.getUserIdByToken(token);
        if (!id || (id <= 0) || (user.user_acc_id !== id)) throw new Error("Token is not true!");

        user.user_acc_tokn = "";
        user.user_acc_upda = new Date();
        await this.userRepo.update(user.user_acc_id, user)
            .then(data => user = data)
            .catch(err => { throw new Error(err) })
        return user
    }

    public async loginAdmin(username: string, password: string): Promise<UserAccount> {

        if (!username || !password) throw new Error("Data is not enough!");

        let check = 0;

        if (Utils.isEmailAddress(username)) {
            check = 1;
        } else if (Utils.isPhoneNumber(username)) {
            check = 2;
        }

        if (check == 0) throw new Error("Email or phone is not true!")
        else {
            let user = new UserAccount();
            await this.userRepo.findByUserName(username)
                .then(data => user = data)
                .catch(err => console.log(err))
            if (!user) {
                if (check == 1) {
                    await this.userRepo.findByEmail(username)
                        .then(data => user = data)
                        .catch(err => console.log(err))
                } else if (check == 2) {
                    await this.userRepo.findByPhone(username)
                        .then(data => user = data)
                        .catch(err => console.log(err))
                }
            }
            if (!user) throw new Error("Email or phone is not true!")

            let checkPassword = MyUtil.checkPass(password, user.user_acc_pass);
            
            if (!checkPassword) throw new Error("Password is not true!");
            if (user.user_role_id != 2) throw new Error("Account not true!")

            user.user_acc_tokn = MyUtil.getToken(user);
            user.user_acc_last_logn = new Date();
            user.user_acc_upda = new Date();
            await this.userRepo.update(user.user_acc_id, user)
                .then(data => user = data)
                .catch(err => { throw new Error(err) })
            return user
        }
    }

    public async updateUserImages(token: string, userImgs: cx_user_img[]): Promise<UserResDTO> {
        if (!userImgs || (userImgs.length <= 0)) throw new Error("User's images is not null!");
        var user = new UserAccount();
        if (!token) throw new Error("Token is invalid!!");

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not true");

        var id = MyUtil.getUserIdByToken(token);
        if ((!id) || (id <= 0) || (user.user_acc_id !== id)) throw new Error("Token is not true!");
        let imgs = await this.userImgRepo.findByUserId(id);
        console.log("old user's images: ", imgs);
        console.log("new user's images: ", userImgs);
        if (imgs && imgs.length > 0) {
            for (let i = 0; i < userImgs.length; i++) {
                for (let j = 0; j < imgs.length; j++) {
                    if ((userImgs[i].proc_id == imgs[j].proc_id) && (userImgs[i].proc_img_indx == imgs[j].proc_img_indx)) {
                        userImgs[i].user_img_id = imgs[j].user_img_id;
                        break;
                    }
                }
            }
        }
        for (let i = 0; i < userImgs.length; i++) {
            userImgs[i].user_acc_id = id;

            await this.userImgRepo.save(userImgs[i])
                .catch(err => { throw new Error(err) })
        }
        user.user_acc_upda = new Date();
        await this.userRepo.update(id, user)
            .catch(err => { throw new Error(err) })

        return await this.getOne(user.user_acc_id);
    }
}