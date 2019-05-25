export const Utils = {
    checkLogin(params) {
        if (!params) return false;
        if (!(params.user_acc_emai && params.user_acc_pass)) return false
        return true
    },
    checkKeysNotExists(obj: object, keys: string[]) {
        if (Array.isArray(keys)) {
            for (let i = 0; i < keys.length; i++) {
                if (!(keys[i] in obj)) {
                    return i;
                }
            }
        } else if (!(keys in obj)) {
            return 0;
        }
        return -1;
    },
    checkUsername(user_acc_name: string) {
        const reg = /\w{6,15}/;
        return reg.test(user_acc_name);
    },
    checkPassword(user_acc_pass: string) {
        if (user_acc_pass.length > 3) {
            return true;
        }
        return false;
    },

    // rawData(user_acc_crta: any) {
    //     if (!user_acc_crta) return false;
    //         user_acc_crta = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    //     return user_acc_crta;
    // },

    isPhoneNumber: (user_acc_phon) => {
        if (!user_acc_phon) return false;
        user_acc_phon = user_acc_phon.trim();
        var flag = false;

        const gpcPattern = /^(84|0)(9(1|4)|12(3|4|5|7|9)|88)\d{7}$/;

        const vinaphone = /^(84|0)(9(1|4)|8(1|2|3|4|5))\d{7}$/;

        const vmsPattern = /^(84|0)(9(0|3)|12(0|1|2|6|8)|89)\d{7}$/;

        const mobiphone = /^(84|0)(9(0|3)|7(0|6|7|8|9))\d{7}$/;

        const viettelPattern = /^(84|0)(9(6|7|8)|16(8|9|6|7|3|4|5|2)|86)\d{7}$/;

        const viettel = /^(84|0)(9(6|7|8)|3(8|9|6|7|3|4|5|2)|86)\d{7}$/;

        const vnm = /^(84|0)(92|188|186)\d{7}$/;

        const vnmobile = /^(84|0)(92|58|56)\d{7}$/;

        const beeline = /^(84|0)((1|)99)\d{7}$/;

        const Gmobile = /^(84|0)(99|59)\d{7}$/;

        const telephone = /^(02|2)\d{9}$/;

           flag = user_acc_phon.match(gpcPattern) || user_acc_phon.match(vmsPattern) || user_acc_phon.match(viettelPattern) || user_acc_phon.match(vnm) || user_acc_phon.match(beeline) || user_acc_phon.match(telephone)
           || user_acc_phon.match(vinaphone) || user_acc_phon.match(mobiphone) || user_acc_phon.match(viettel) || user_acc_phon.match(vnmobile) || user_acc_phon.match(Gmobile);

        return flag;
    },
    isEmailAddress: (user_acc_emai) => user_acc_emai && user_acc_emai.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{2,})+$/i),
}
