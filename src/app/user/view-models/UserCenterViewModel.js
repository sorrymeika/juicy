import { autowired, emitter, ViewModel } from "snowball/app";
import { toast } from "snowball/widget";
import UserService from "../../../shared/services/UserService";

export default class UserCenterViewModel extends ViewModel {
    get userInfo() {
        return this._userService.userInfo;
    }

    @autowired
    _userService: UserService;

    async init() {
        try {
            await this._userService.loadUserInfo({ autoLogin: true });
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    @emitter
    onGoToSetting() {
        this.goToSetting();
    }

    goToSetting() {
        this.ctx.navigation.forward('/setting');
    }
}