import { configuration } from "snowball/app";

import CartViewModel from "./view-models/CartViewModel";

export const CartConfiguration = configuration({
    modules: {
        cartViewModel: CartViewModel,
    }
});
