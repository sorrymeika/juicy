import { controller } from "snowball/app";
import Test from "../containers/Test";
import { PageConfiguration } from "../../brick/configuration";

@controller({
    component: Test,
    configuration: PageConfiguration
})
class TestController {
    onInit() {
        // fetch remote data here!
    }

    onButtonClick() {
        this.ctx.navigation.forward('/');
    }
}

export default TestController;
