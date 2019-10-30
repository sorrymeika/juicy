import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class SettingService extends Service {
    get userInfo() {
        return this.userService.userInfo;
    }

    onInit = this.ctx.createEvent();
    onGoToEdit = this.ctx.createEvent();

    constructor() {
        super();

        this.userService = this.ctx.service.user;

        this.onInit(() => this.init());
        this.onGoToEdit(() => this.goToEdit());
    }

    async init() {
        try {
            await this.userService.loadUserInfo();
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    goToEdit() {
        this.ctx.navigation.forward('/user/edit');
    }
}