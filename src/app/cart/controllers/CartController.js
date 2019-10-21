import { controller, injectable } from "snowball/app";
import Cart from "../containers/Cart";
import CartListService from "../services/CartListService";


@controller(Cart)
class CartController {
    @injectable cartListService: CartListService;

    constructor() {
        this.cartListService = new CartListService(
            this.ctx.service.cart,
            this.ctx.service.cartNum
        );
    }

    onInit() {
        this.cartListService.onInit.emit();
    }
}

export default CartController;