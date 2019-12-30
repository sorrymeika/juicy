import { configuration } from "snowball/app";

import UserEditService from "../services/UserEditService";
import UserCenterService from "../services/UserCenterService";

@configuration
class UserConfiguration {
    get userEditService() {
        return new UserEditService();
    }

    get userCenterService() {
        return new UserCenterService();
    }
}

export { UserConfiguration };