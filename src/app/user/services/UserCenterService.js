import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class UserCenterService extends Service {
    get userInfo() {
        return this.userService.userInfo;
    }

    onInit = this.ctx.createEvent();
    onToSetting = this.ctx.createEvent();

    constructor() {
        super();

        this.userService = this.ctx.service.user;

        this.onInit(() => this.init());
        this.onToSetting(() => this.toSetting());
    }

    async init() {
        try {
            await this.userService.loadUserInfo({ autoLogin: true });
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    toSetting() {
        this.ctx.navigation.forward('/setting');
    }
}