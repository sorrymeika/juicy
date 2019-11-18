import { observable, createEmitter } from "snowball";
import { Service } from "snowball/app";

export default class UserService extends Service {
    @observable userInfo = {};

    onLoginStatusChange = createEmitter();

    loadUserInfo(options) {
        return this.getUserInfo(options)
            .then(res => {
                this.userInfo = res.data;
                return res;
            });
    }

    goToLogin(events) {
        if (events) {
            this.onLoginStatusChange.once(({ status }) => {
                switch (status) {
                    case 'success':
                        events.onLogin && events.onLogin();
                        break;
                    case 'cancel':
                        events.onCancelLogin && events.onCancelLogin();
                        break;
                }
            });
        }

        this.app.navigation.forward('/login');
    }

    async login(account, verifyCode) {
        const res = await this.app.server.user.post('/user/login', {
            account,
            verifyCode
        });
        return res;
    }

    getUserInfo({ autoLogin = false } = {}) {
        return this.app.server.user.post('/user/getUserInfo', null, {
            autoLogin
        });
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