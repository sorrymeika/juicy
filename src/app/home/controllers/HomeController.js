import { controller } from "snowball/app";
import Home from "../containers/Home";
import PageViewController from "./PageViewController";

@controller(Home)
class HomeController extends PageViewController {
    onInit() {
        this.pageViewService.initWithKeyName('home');
    }
}

export default HomeController;
