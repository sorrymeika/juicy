import { observable } from "snowball";
import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class UserEditService extends Service {
    @observable userInfo = {};

    onInit = this.ctx.createEvent();
    onFieldChange = this.ctx.createEvent();
    onSave = this.ctx.createEvent();

    constructor() {
        super();

        this.userService = this.ctx.service.user;

        this.onInit(() => this.init());

        this.onFieldChange((data) => {
            this.userInfo.withMutations((userInfo) => {
                userInfo.set(data);
            });
        });

        this.onSave(() => this.save());
    }

    async init() {
        try {
            const res = await this.userService.getUserInfo();
            this.userInfo = res.data;
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    save() {
        this.userService.userInfo = this.userInfo;
        this.ctx.navigation.back();
    }
}