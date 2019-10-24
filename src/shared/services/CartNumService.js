import { observable } from "snowball";

export default class CartNumService {
    @observable total = 0;

    pull() {
        return this.ctx.service.cart
            .countCartTotalNum()
            .then((res) => {
                this.total = res.total;
                return res;
            });
    }
}