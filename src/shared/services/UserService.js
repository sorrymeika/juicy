import { observable, util } from "snowball";
import { Service, autowired } from "snowball/app";

export default class UserService extends Service {

    @observable
    _userInfo = {};

    get userInfo() {
        return this._userInfo;
    }

    @autowired
    _userServer;

    _isLogin = false;

    onLoginStatusChange = this.app.createEmitter();

    async isLogin() {
        if (!util.cookie('wtk')) return false;

        if (!this._isLogin) {
            try {
                await this.loadUserInfo();
                return this._isLogin;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    loadUserInfo(options) {
        let loadUserPromise = this._loadUserPromise;
        if (!loadUserPromise) {
            this._loadUserPromise = loadUserPromise = this.getUserInfo(options)
                .then(res => {
                    this._userInfo = res.data;
                    this._isLogin = true;
                    return res;
                });
            loadUserPromise
                .finally(() => {
                    this._loadUserPromise = null;
                });
        }
        return loadUserPromise;
    }

    goToLogin(events) {
        if (events) {
            this.onLoginStatusChange.untilTrue(({ status }) => {
                switch (status) {
                    case 'success':
                        events.onLogin && events.onLogin();
                        return true;
                    case 'cancel':
                        events.onCancel && events.onCancel();
                        return true;
                    case 'error':
                        events.onError && events.onError();
                        break;
                }
            });
        }
        this.app.navigation.forward('/login');
    }

    login(account, verifyCode) {
        return this._userServer.post('/user/login', {
            account,
            verifyCode
        })
            .then(res => {
                this._isLogin = true;
                this.onLoginStatusChange({ status: 'success' });
                return res;
            })
            .catch(e => {
                this._isLogin = false;
                this.onLoginStatusChange({ status: 'error' });
                throw e;
            });
    }

    getUserInfo({ autoLogin = false } = {}) {
        return this._userServer.post('/user/getUserInfo', null, {
            autoLogin
        });
    }
}