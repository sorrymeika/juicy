import { controller, autowired } from "snowball/app";
import EditUserInfo from "../containers/UserEdit";
import UserEditService from "../services/UserEditService";
import { UserConfiguration } from "../configuration/UserConfiguration";

@controller({
    component: EditUserInfo,
    configuration: UserConfiguration
})
class UserEditController {
    @autowired
    userEditService: UserEditService;

    onInit() {
        this.userEditService.onInit.emit();
    }
}

export default UserEditController;