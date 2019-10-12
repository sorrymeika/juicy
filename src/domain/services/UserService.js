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
}