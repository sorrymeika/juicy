import { controller, injectable, navigation } from "snowball/app";
import Home from "../containers/Home";

@controller('/', Home)
class HomeController {
    constructor({ location }, context) {
        console.log(location);

        const a = {};
        Object.defineProperty(a, 'name', {
            enumerable: true,
            get() {
                console.log('asdf');
                return 1;
            }
        });

        for (var key in a) {
            console.log(key);
        }
        console.log(a.name);
    }

    onInit() {
        console.log('init');
        // fetch remote data here!
    }

    @injectable
    onButtonClick() {
        navigation.forward('/test');
    }
}

export default HomeController;
