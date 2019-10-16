import { controller, injectable } from "snowball/app";
import Cart from "../containers/Cart";
import CartListService from "../services/CartListService";
import CartService from "../../../domain/services/CartService";


@controller(Cart)
class CartController {
    @injectable cartListService: CartListService;

    constructor() {
        this.cartListService = new CartListService(
            new CartService()
        );
    }

    onInit() {
        this.cartListService.onInit.emit();
    }
}

export default CartController;