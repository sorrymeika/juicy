import { controller, injectable } from "snowball/app";
import Test from "../containers/Test";

@controller(Test)
class TestController {
    constructor({ location }, context) {
        console.log(location);
    }

    onInit() {
        // fetch remote data here!
    }

    @injectable
    onButtonClick() {
        this.ctx.navigation.forward('/');
    }
}

export default TestController;
