import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class LoginService extends Service {
    onSubmit = this.ctx.createEvent();

    isLogin = false;

    constructor() {
        super();

        this.onSubmit((params) => {
            this.login(params);
        });

        this.ctx.page.on('destroy', () => {
            if (!this.isLogin) {
                this.ctx.service.user.onLoginStatusChange.emit({ status: 'cancel' });
            }
        });
    }

    async login(data) {
        const { account, verifyCode } = data;
        try {
            const res = await this.ctx.service.user.login(account, verifyCode);
            if (res.success) {
                toast.showToast('登录成功!');
                this.isLogin = true;
                this.ctx.service.user.onLoginStatusChange.emit({ status: 'success' });
                this.ctx.navigation.back();
            }
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}