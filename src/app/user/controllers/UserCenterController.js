import { controller, autowired } from "snowball/app";
import UserCenter from "../containers/UserCenter";
import UserCenterViewModel from "../view-models/UserCenterViewModel";
import { UserConfiguration } from "../configuration";

@controller({
    component: UserCenter,
    configuration: UserConfiguration
})
class UserCenterController {
    @autowired
    _userCenterViewModel: UserCenterViewModel;

    onInit() {
        this._userCenterViewModel.init();
    }
}

export default UserCenterController;