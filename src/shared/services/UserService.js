import { observable, Emitter, util } from "snowball";
import { Service, autowired } from "snowball/app";

export default class UserService extends Service {

    @observable _userInfo = {};
    get userInfo() {
        return this._userInfo;
    }

    @autowired
    _userServer;

    _isLogin = false;

    onLoginStatusChange = Emitter.create();

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
        if (!this._loadUserPromise) {
            this._loadUserPromise = this.getUserInfo(options)
                .then(res => {
                    this._userInfo = res.data;
                    this._isLogin = true;
                    return res;
                });

            const clearPromise = () => {
                this._loadUserPromise = null;
            };

            this._loadUserPromise
                .then(clearPromise)
                .catch(clearPromise);
        }
        return this._loadUserPromise;

    }

    goToLogin(events) {
        if (events) {
            const dispose = this.onLoginStatusChange(({ status }) => {
                switch (status) {
                    case 'success':
                        events.onLogin && events.onLogin();
                        dispose();
                        break;
                    case 'cancel':
                        events.onCancel && events.onCancel();
                        dispose();
                        break;
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