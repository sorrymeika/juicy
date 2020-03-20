import { Service, autowired, emitter } from "snowball/app";
import { toast } from "snowball/widget";
import UserService from "../../../shared/services/UserService";

export default class LoginViewModel extends Service {
    isLogin = false;

    @autowired
    _userService: UserService;

    constructor() {
        super();

        this.ctx.page.on('destroy', () => {
            if (!this.isLogin) {
                this._userService.onLoginStatusChange({ status: 'cancel' });
            }
        });
    }

    @emitter
    onSubmit(params) {
        this.login(params);
    }

    async login(data) {
        const { account, verifyCode } = data;
        try {
            const res = await this._userService.login(account, verifyCode);
            if (res.success) {
                toast.showToast('登录成功!');
                this.isLogin = true;
                this.ctx.navigation.back();
            }
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}