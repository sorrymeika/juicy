import { controller } from "snowball/app";
import Setting from "../containers/Setting";
import SettingService from "../services/SettingService";

@controller(Setting)
class SettingController {
    settingService: SettingService;

    constructor() {
        this.settingService = new SettingService();
    }

    onInit() {
        this.settingService.onInit.emit();
    }
}

export default SettingController;