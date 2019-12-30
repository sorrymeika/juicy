import { configuration } from "snowball/app";

import CartViewService from "../services/CartViewService";

@configuration
class CartConfiguration {
    get cartViewService() {
        return new CartViewService(
            this.cartService,
            this.cartNumService
        );
    }
}

export { CartConfiguration };