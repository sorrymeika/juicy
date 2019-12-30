import { controller, autowired } from "snowball/app";
import Cart from "../containers/Cart";
import CartViewService from "../services/CartViewService";
import { CartConfiguration } from "../configuration/CartConfiguration";

@controller({
    component: Cart,
    configuration: CartConfiguration
})
class CartController {
    @autowired
    cartViewService: CartViewService;

    onInit() {
        this.cartViewService.onInit.emit();
    }

    onResume() {
        this.cartViewService.loadUserCart();
    }
}

export default CartController;