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

    constructor() {
        this._resumeListener = this.ctx.delegate(this.page, 'resume', () => {
            this.load();
        });
    }

    onInit() {
        this.load();
    }

    async load() {
        this._resumeListener.off();
        try {
            const res = await this.cartViewService.listUserCart();
            this._resumeListener.on();
            return res;
        } catch (e) {
            if (e.code === 10002) {
                this.app.navigation.back();
            } else {
                this._resumeListener.on();
                throw e;
            }
        }
    }
}

export default CartController;