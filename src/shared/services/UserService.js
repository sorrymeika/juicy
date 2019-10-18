export default class UserService {
    login(account, verifyCode) {
        return this.ctx.server.user.post('/user/login', {
            account,
            verifyCode
        });
    }

    getUserInfo() {
        return this.ctx.server.user.post('/user/getUserInfo');
    }

    addInvoice({
        isDefault,
        type,
        titleType,
        title,
        taxCode,
        phoneNo
    }) {
        return this.ctx.server.user.post('/userInvoice/addInvoice', {
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
        return this.ctx.server.user.post('/userInvoice/updateInvoice', {
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
        return this.ctx.server.user.post('/userInvoice/listInvoice');
    }

    getDefaultInvoice() {
        return this.ctx.server.user.post('/userInvoice/getDefaultInvoice');
    }
}