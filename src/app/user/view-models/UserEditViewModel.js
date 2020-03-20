import { observable, asObservable } from "snowball";
import { Service, autowired, emitter } from "snowball/app";
import { toast } from "snowball/widget";

export default class UserEditViewModel extends Service {
    @observable
    userInfo = {};

    @autowired
    _userService;

    async init() {
        try {
            const res = await this._userService.getUserInfo({ autoLogin: true });
            this.userInfo = res.data;
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    @emitter
    onFieldChange(data) {
        asObservable(this.userInfo).set(data);
    }

    @emitter
    onSave() {
        this.save();
    }

    save() {
        this._userService.userInfo = this.userInfo;
        this.ctx.navigation.back();
    }
}