import { observable } from "snowball";
import { Service, autowired } from "snowball/app";
import CartService from "./CartService";

export default class CartNumService extends Service {
    @observable
    total = 0;

    @autowired
    cartService: CartService

    pull() {
        return this.cartService
            .countCartTotalNum()
            .then((res) => {
                this.total = res.total;
                return res;
            });
    }
}