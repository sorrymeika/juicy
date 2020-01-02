import { configuration } from "snowball/app";

import CartViewService from "./CartViewService";

export const CartConfiguration = configuration({
    modules: {
        cartViewService: CartViewService
    }
});
