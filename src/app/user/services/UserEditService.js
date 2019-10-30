import { observable } from "snowball";
import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class UserEditService extends Service {
    @observable userInfo = {};
    onInit = this.ctx.createEvent();

    constructor() {
        super();

        this.onInit(() => this.init());
    }

    async init() {
        try {
            const res = await this.ctx.service.user.getUserInfo();
            this.userInfo = res.data;
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}