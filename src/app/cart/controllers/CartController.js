import { controller, autowired } from "snowball/app";
import Cart from "../containers/Cart";
import CartViewModel from "../view-models/CartViewModel";
import { CartConfiguration } from "../configuration";
import UserService from "../../../shared/services/UserService";

@controller({
    component: Cart,
    configuration: CartConfiguration
})
class CartController {
    @autowired
    _userService: UserService;

    @autowired
    cartViewModel: CartViewModel;

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
        await this.cartViewModel.loadUserCart();
    }
}

export default CartController;