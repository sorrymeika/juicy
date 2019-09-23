import { controller } from "snowball/app";
import Home from "../containers/Home";
import PageViewController from "./PageViewController";

var { TestStruct } = {};

@controller(Home)
class HomeController extends PageViewController {
    onInit() {
        console.log('TestStruct', TestStruct);
        this.pageViewService.initWithKeyName('home');
    }
}

export default HomeController;
