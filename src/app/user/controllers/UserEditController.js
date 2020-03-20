import { controller, autowired } from "snowball/app";
import EditUserInfo from "../containers/UserEdit";
import UserEditViewModel from "../view-models/UserEditViewModel";
import { UserConfiguration } from "../configuration";

@controller({
    component: EditUserInfo,
    configuration: UserConfiguration
})
class UserEditController {
    @autowired
    userEditViewModel: UserEditViewModel;

    onInit() {
        this.userEditViewModel.onInit.emit();
    }
}

export default UserEditController;