import { configuration } from "snowball/app";

import UserEditViewModel from "./view-models/UserEditViewModel";
import UserCenterViewModel from "./view-models/UserCenterViewModel";
import SettingViewModel from "./view-models/SettingViewModel";

export const UserConfiguration = configuration({
    modules: {
        userEditViewModel: UserEditViewModel,
        userCenterViewModel: UserCenterViewModel
    }
});

export const SettingConfiguration = configuration({
    modules: {
        settingViewModel: SettingViewModel
    }
});
