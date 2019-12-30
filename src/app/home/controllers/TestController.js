import { controller } from "snowball/app";
import Test from "../containers/Test";
import PageViewController from "./PageViewController";

@controller(Test)
class TestController extends PageViewController {
    onInit() {
        // fetch remote data here!
    }

    onButtonClick() {
        this.ctx.navigation.forward('/');
    }
}

export default TestController;
