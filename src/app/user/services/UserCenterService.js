import { Service, autowired } from "snowball/app";
import { toast } from "snowball/widget";
import UserService from "../../../shared/services/UserService";

export default class UserCenterService extends Service {
    get userInfo() {
        return this.userService.userInfo;
    }

    onInit = this.ctx.createEmitter();
    onToSetting = this.ctx.createEmitter();

    @autowired
    userService: UserService;

    constructor() {
        super();

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