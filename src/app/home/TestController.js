import { controller } from "snowball/app";
import Test from "./Test";
import PageViewController from "../brick/PageViewController";
import { PageConfiguration } from "../brick/PageConfiguration";

@controller({
    component: Test,
    configuration: PageConfiguration
})
class TestController extends PageViewController {
    onInit() {
        // fetch remote data here!
    }

    onButtonClick() {
        this.ctx.navigation.forward('/');
    }
}

export default TestController;
