import { controller, autowired } from "snowball/app";
import Cart from "./Cart";
import CartViewService from "./CartViewService";
import { CartConfiguration } from "./CartConfiguration";
import UserService from "../../shared/services/UserService";

@controller({
    component: Cart,
    configuration: CartConfiguration
})
class CartController {
    @autowired
    _userService: UserService;

    @autowired
    cartViewService: CartViewService;


    onInit() {
        this.load();
    }

    async onResume() {
        if (!await this._userService.isLogin()) {
            this.app.navigation.back();
        } else {
            await this.load();
        }
    }

    async load() {
        await this.cartViewService.loadUserCart();
    }
}

export default CartController;