import { controller, autowired } from "snowball/app";
import Setting from "../containers/Setting";
import SettingViewModel from "../view-models/SettingViewModel";
import { SettingConfiguration } from "../configuration";

@controller({
    component: Setting,
    configuration: SettingConfiguration
})
class SettingController {
    @autowired
    settingViewModel: SettingViewModel;

    onInit() {
    }
}

export default SettingController;