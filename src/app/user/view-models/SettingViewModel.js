import { ViewModel, autowired } from "snowball/app";
import { toast } from "snowball/widget";

export default class SettingViewModel extends ViewModel {
    get userInfo() {
        return this._userService.userInfo;
    }

    @autowired
    _userService;

    async onInit() {
        try {
            await this._userService.loadUserInfo({ autoLogin: true });
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    onGoToEdit() {
        this.ctx.navigation.forward('/user/edit');
    }
}