import { configuration } from "snowball/app";

import UserEditService from "../services/UserEditService";
import UserCenterService from "../services/UserCenterService";


export const UserConfiguration = configuration({
    modules: {
        userEditService: UserEditService,
        userCenterService: UserCenterService
    }
});
