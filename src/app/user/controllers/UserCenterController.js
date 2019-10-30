import { controller, injectable } from "snowball/app";
import UserCenter from "../containers/UserCenter";
import UserCenterService from "../services/UserCenterService";

@controller(UserCenter)
class UserCenterController {
    @injectable userCenterService: UserCenterService;

    constructor() {
        this.userCenterService = new UserCenterService();
    }

    onInit() {
        this.userCenterService.onInit.emit();
    }
}

export default UserCenterController;