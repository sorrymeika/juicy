import { observable } from "snowball";
import { Service } from "snowball/app";

export default class UserService extends Service {
    @observable userInfo = {};

    loadUserInfo() {
        return this.getUserInfo()
            .then(res => {
                this.userInfo = res.data;
                return res;
            });
    }

    login(account, verifyCode) {
        return this.app.server.user.post('/user/login', {
            account,
            verifyCode
        });
    }

    getUserInfo() {
        return this.app.server.user.post('/user/getUserInfo');
    }

    addInvoice({
        isDefault,
        type,
        titleType,
        title,
        taxCode,
        phoneNo
    }) {
        return this.app.server.user.post('/userInvoice/addInvoice', {
            isDefault,
            type,
            titleType,
            title,
            taxCode,
            phoneNo
        });
    }

    updateInvoice({
        id,
        isDefault,
        type,
        titleType,
        title,
        taxCode,
        phoneNo
    }) {
        return this.app.server.user.post('/userInvoice/updateInvoice', {
            id,
            isDefault,
            type,
            titleType,
            title,
            taxCode,
            phoneNo
        });
    }

    listInvoice() {
        return this.app.server.user.post('/userInvoice/listInvoice');
    }

    getDefaultInvoice() {
        return this.app.server.user.post('/userInvoice/getDefaultInvoice');
    }
}