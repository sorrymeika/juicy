import { controller, injectable } from "snowball/app";
import EditUserInfo from "../containers/EditUserInfo";
import UserEditService from "../services/UserEditService";

@controller(EditUserInfo)
class UserEditController {
    @injectable userEditService: UserEditService;

    constructor() {
        this.userEditService = new UserEditService();
    }

    onInit() {
        this.userEditService.onInit.emit();
    }
}

export default UserEditController;