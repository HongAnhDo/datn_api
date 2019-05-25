import VehicleDTO from '../dto/vehicle/VehicleImportDTO'
import MotoDTO from '../dto/vehicle/MotoDTO'
import PartnerImportDTO from '../dto/partner/PartnerImportDTO'
import VehiclePartDTO from '../dto/partner/VehiclePartImportDTO'
import { cx_user_acc } from '../entities/user/cx_user_acc';
import * as bcrypt from "bcrypt";
var Excel = require('exceljs');
const slug = require('slug')

var jwt = require('jsonwebtoken');
var config = require('../config/token');

export const MyUtil = {
    slug: (str) => {
        return slug(str.toLowerCase())
    },
    handleError: (error, res) => {
        res.send({ code: "error", message: error.message })
        res.end();
    },
    handleErrorFunction: (err) => { console.log("Error") },
    handleSuccess: (data, res) => {
        res.send({ code: "success", data: data ? data : {} })
    },
    handleSuccessList: (data, res) => {
        res.send({ code: "success", data: data ? { "list": data[0], "count": data[1] } : {} })
    },
    readFileExcell: async (path, indexSheet) => {
        let array = []
        var inboundWorkbook = new Excel.Workbook();
        await inboundWorkbook.xlsx.readFile(path).then(function () {
            var inboundWorksheet = inboundWorkbook.getWorksheet(indexSheet);

            inboundWorksheet.eachRow({ includeEmpty: false }, function (row, err) {
                let a = row.values;
                a.splice(0, 1);
                array.push(a)
            });
        })
        return array;
    },
    trimArray: (str: String, charecter: string) => {
        let list = []
        if (str.trim() != "")
            str.split(charecter).map((value) => {
                if (value.trim() != "")
                    list.push(value.trim());
            });
        return list;
    },
    convertMoto: (arr: Array<Array<any>>) => {

        let arrVehicle = new Array<any>();
        for (let i = 1; i < arr.length; i++) {
            let value = arr[i];

            let moto = new MotoDTO(value);
            let images = value[19] ? value[19] : ""

            arrVehicle.push({ moto, images })
        }
        return arrVehicle;

    },
    convertCar: (arr: Array<Array<any>>) => {

        let arrVehicle = new Array<any>();
        for (let i = 1; i < arr.length; i++) {
            let value = arr[i];

            let vehicle = new VehicleDTO(value);
            let options = value[27] ? value[27] : ""
            let images = value[26] ? value[26] : ""

            arrVehicle.push({ vehicle, options, images })
        }
        return arrVehicle;

    },
    convertVehiclePart: (arr: Array<Array<any>>) => {
        let list = [];
        for (let i = 1; i < arr.length; i++) {
            let vehicle = new VehiclePartDTO(arr[i])
            list.push(vehicle);
        }
        return list;
    },
    convertPartner: (arr: Array<Array<any>>) => {
        let list = [];
        for (let i = 1; i < arr.length; i++) {
            let partner = new PartnerImportDTO(arr[i]);
            list.push(partner)
        }
        return list;
    },
    convertListMap: (str: string) => {
        let list = [];
        str = str.replace("\r", "");

        let arr = MyUtil.trimArray(str, ",")
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].trim()) {
                let chars = MyUtil.trimArray(arr[i], ":")
                list.push(chars)
            }
        }
        return list;
    },
    convertWDay: (str: string) => {
        let list = [];
        str = str.replace("\r", "");
        let arr = MyUtil.trimArray(str, ",")
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].trim()) {
                let chars = MyUtil.trimArray(arr[i], ":")
                list.push(chars)
            }
        }
        return list;

    },
    string_to_slug: (str: string) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        var from = "ýàáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñç·/_,:;";
        var to = "yaaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        return str;

    },
    getMonthDay: (date) => {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if (day < 10)
            day = "0" + day;
        if (month < 10)
            month = "0" + month;
        return { day, month };
    },
    getDateExport: function (dateSt) {
        var date = new Date(dateSt);
        var { day, month } = MyUtil.getMonthDay(date);
        return (month + '/' + day + "/" + date.getFullYear());
    },

    getDateStatistic: function (startDate: Date, endDate: Date) {
        var stDate = MyUtil.getMonthDay(startDate);
        var edDate = MyUtil.getMonthDay(endDate);
        return (stDate.day + "/" + stDate.month + " - " + edDate.day + "/" + edDate.month)
    },

    getDateFormatEn: function (date) {
        var { day, month } = MyUtil.getMonthDay(date);
        return (date.getFullYear() + '-' + month + '-' + day);
    },
    isPercent: (num) => {
        if (num > -100 && num < 100) return true;
        else return false
    },
    getDays: (rentalDate: Date, returnDate: Date) => {
        let rtl = new Date(rentalDate.getTime());
        let rtn = new Date(returnDate.getTime());
        var daysOfYear = new Array<Date>();
        if (rtl && rtn) {
            for (let d = rtl; d <= rtn; d.setDate(d.getDate() + 1)) {
                daysOfYear.push(new Date(d));
            }
        }
        return daysOfYear
    },
    getWdays: (rentalDate: Date, returnDate: Date, partner) => {
        var arr_days = MyUtil.getDays(rentalDate, returnDate);
        var partWday = partner.part_wdays;
        var wdays = [];
        if (arr_days.length > 0 && partWday && partWday.length > 0) {
            for (let i = 0; i < arr_days.length; i++) {
                for (let j = 0; j < partWday.length; j++) {
                    if (arr_days[i].getDay() === partWday[j].wday.wday_indx) wdays.push(arr_days[i]);
                }
            }
        }
        return wdays;
    },
    getHolis: (rentalDate: Date, returnDate: Date, partner) => {
        var arr_days = MyUtil.getDays(rentalDate, returnDate);
        var partHoli = partner.part_holis;
        var holis = [];

        if (arr_days.length > 0 && partHoli && partHoli.length > 0) {
            arr_days.map(d => {
                var date = d.getDate();
                var month = d.getMonth();
                for (let i = 0; i < partHoli.length; i++) {
                    var holiFrom = partHoli[i].holi.holi_day_from;
                    var holiTo = partHoli[i].holi.holi_day_to;
                    if (holiFrom && holiTo) {
                        var dateFrom = new Date(holiFrom);
                        var dateTo = new Date(holiTo);
                        for (var day = dateFrom; day <= dateTo; day.setDate(day.getDate() + 1)) {
                            if ((day.getDate() === date) && (day.getMonth() === month)) holis.push(d);
                        }
                    }
                }
            })
        }
        return holis
    },
    getDayNumHoliIsWday: (wdays, holis) => { // so ngay holi la ngay cuoi tuan
        var dayNum = 0;
        if (wdays.length > 0 && holis.length > 0) {
            for (let i = 0; i < holis.length; i++) {
                for (let j = 0; j < wdays.length; j++) {
                    if (wdays[j].getTime() === holis[i].getTime()) dayNum++;
                }
            }
        }
        return dayNum;
    },
    getExtaHourNum: (): number => {
        return 0
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getToken: (user: cx_user_acc) => {
        if (!user) {
            console.log("User is not existed!")
            return null;
        }
        var token = jwt.sign({ id: user.user_acc_id }, config.secret, {
            expiresIn: config.expires // expires in 24 hours
        });
        return token;
    },
    getUserIdByToken: (token: string) => {
        var user_acc_id = 0;
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    console.log(err.message)
                }
                else {
                    user_acc_id = decoded.id
                }
            });
        }
        return user_acc_id;
    },
    getHashPass: (pass: string) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt)
        return hash
    },
    checkPass: (newPass: string, pass: string) => {
        var res = bcrypt.compareSync(newPass, pass)
        return res;
    },
    isLastDay: (dt) => {
        var date = new Date(dt.getTime()),
            month = date.getMonth();

        date.setDate(date.getDate() + 1);
        return date.getMonth() !== month;
    },
    isStartDay: (dt) =>{
        var date = new Date(dt.getTime()),
            month = date.getMonth();

        date.setDate(date.getDate() - 1);
        return date.getMonth() !== month;
    }
}
