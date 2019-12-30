import { controller, autowired } from "snowball/app";
import UserCenter from "../containers/UserCenter";
import UserCenterService from "../services/UserCenterService";
import { UserConfiguration } from "../configuration/UserConfiguration";

@controller({
    component: UserCenter,
    configuration: UserConfiguration
})
class UserCenterController {
    @autowired
    userCenterService: UserCenterService;

    onInit() {
        this.userCenterService.onInit.emit();
    }
}

export default UserCenterController;