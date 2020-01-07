import { configuration } from "snowball/app";

import CartViewService from "./services/CartViewService";

export const CartConfiguration = configuration({
    modules: {
        cartViewService: CartViewService,
    }
});
