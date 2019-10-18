import { Emitter } from "snowball";

export default class OrderService {
    onAddressChange = Emitter.create();
    onInvoiceChange = Emitter.create();

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