import { Service } from "snowball/app";

export default class OrderService extends Service {
    getOrderBySkus(skus) {
        return this.ctx.server.trade.post("/order/getOrderBySkus", {
            skus
        });
    }

    createOrder(sellerList, addressId) {
        return this.ctx.server.trade.post("/order/createOrder", {
            sellerList,
            addressId
        });
    }
}