import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class LoginService extends Service {
    onSubmit = this.ctx.createEvent();

    constructor() {
        super();

        this.onSubmit((params) => {
            this.login(params);
        });
    }

    async login(data) {
        const { account, verifyCode } = data;
        const res = await this.ctx.service.user.login(account, verifyCode);
        if (res.success) {
            toast.showToast('登录成功!');
        }
    }
}