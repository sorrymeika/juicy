import { controller, autowired } from "snowball/app";
import Cart from "./Cart";
import CartViewService from "./CartViewService";
import { CartConfiguration } from "./CartConfiguration";

@controller({
    component: Cart,
    configuration: CartConfiguration
})
class CartController {
    @autowired
    cartViewService: CartViewService;

    constructor() {
        this._resumeListener = this.ctx.delegate(this.ctx.page, 'resume', () => {
            this.load();
        });
    }

    onInit() {
        this.load();
    }

    async load() {
        this._resumeListener.off();
        try {
            const res = await this.cartViewService.loadUserCart();
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