import { cx_user_acc as UserAccount } from "../../entities/user/cx_user_acc";
import { Request, Response, NextFunction } from "express";
import IUserAccountService from "../../service/user/IUserAccountService";
import UserAccountServiceImpl from "../../service/user/UserAccountServiceImpl";
import { MyUtil } from "../../utils/MyUtil";
import { cx_user_img } from "../../entities/user/cx_user_img";
import * as express from 'express';


export default class UserAccountController {
    private userAccountService: IUserAccountService;
    app = express();

    constructor() {
        this.userAccountService = new UserAccountServiceImpl()
    }

    public getAll = async (req: Request, res: Response) => {
        console.log("Received getAllUserAccounts ==> GET");

        await this.userAccountService.getAll()
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };

    public getOne = async (req: Request, res: Response) => {
        console.log("Received user by id ==> GET");
        // console.log(req.params);
        var user_acc_id = req.params.user_acc_id
        if (!user_acc_id) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);
        await this.userAccountService.getOne(user_acc_id)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };

    public getUserByToken = async (req: Request, res: Response) => {
        console.log("get user account by token ==> GET")
        var token = req.headers.authorization;

        await this.userAccountService.getUserByToken(token)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    }

    public putLogin = async (req: Request, res: Response) => {
        console.log("login user by email/phone and password => PUT")
        // console.log(req.body)
        if (!req.body || req.body == {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        let username = req.body.user_acc_name;
        let password = req.body.user_acc_pass;

        if (!username || !password) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.userAccountService.login(username, password)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }


    public putLoginAdmin = async (req: Request, res: Response) => {
        console.log("login user by email/phone and password => PUT")
        // console.log(req.body)
        if (!req.body || req.body == {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        let username = req.body.user_acc_name;
        let password = req.body.user_acc_pass;

        if (!username || !password) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.userAccountService.loginAdmin(username, password)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSignup = async (req: Request, res: Response) => {
        console.log("create a new user ==> POST");
        // console.log("req.body: ", req.body);
        if (!req.body || req.body === {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        if (((!req.body.user_acc_emai) && (!req.body.user_acc_phon)) || (!req.body.user_acc_pass)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        let user = new UserAccount();
        user = req.body;
        console.log("user: ", user);
        await this.userAccountService.register(user)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }



    public putLogout = async (req: Request, res: Response) => {
        console.log("Logout user ==> PUT")
        var token = req.headers.authorization;
        if (!token) MyUtil.handleError({ message: "Token is invalid" }, res);
        await this.userAccountService.logout(token)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public putUpdateUser = async (req: Request, res: Response) => {
        console.log("update user ==> PUT")
        console.log("request data: ", req.body);
        var token = req.headers.authorization;
        var user = new UserAccount();
        user = req.body
        if (!user || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        await this.userAccountService.update(token, user)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public putChangePassword = async (req: Request, res: Response) => {
        console.log("change password ==> PUT")
        console.log("request data: ", req.body)
        var token = req.headers.authorization;
        if (!req.body || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.userAccountService.changePassword(token, req.body)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))

    }

    public postUploadAvatar = async (req: Request, res: Response) => {
        console.log("upload avatar ==> POST")
        console.log(req.file);
        if (!req.file) MyUtil.handleError("File is not null", res);
        let path = `/uploads/users/${req.file.filename}`
        path = " http://localhost:8081" + path
        var token = req.headers.authorization;
        var user = new UserAccount();
        user.user_acc_img = path;

        await this.userAccountService.update(token, user)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))

    }

    public postUploadProcedure = async (req: Request, res: Response) => {
        console.log("upload procedure ==> POST ");
        console.log(req.file);
        if (!req.file) MyUtil.handleError("File is not null", res);
        var userImgs = new Array<cx_user_img>();

        let token = req.headers.authorization;
        let proc_id = req.body.proc_id;
        let proc_img_indx = req.body.proc_img_indx;

        if (!token || (!proc_id) || (!proc_img_indx)) MyUtil.handleError("token or procedure's id is not null", res);

        let userImg = new cx_user_img();
        let path = `/uploads/users/${req.file.filename}`
        console.log("ENV: ", this.app.get('env'));
        path = " http://localhost:8081" + path;
        userImg.user_img_url = path;
        userImg.proc_id = proc_id;
        userImg.proc_img_indx = proc_img_indx;
        userImg.user_img_name = req.file.filename;
        userImgs.push(userImg);

        await this.userAccountService.updateUserImages(token, userImgs)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

}
