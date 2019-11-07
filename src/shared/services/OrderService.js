import { Emitter } from "snowball";

export default class OrderService {
    onAddressChange = Emitter.create();
    onInvoiceChange = Emitter.create();

    getOrderBySkus(skus) {
        return this.ctx.server.trade.post("/order/getOrderBySkus", {
            skus
        });
    }

    getOrderById(orderId) {
        return this.ctx.server.trade.post("/order/getOrderById", {
            orderId
        });
    }

    getSellerOrderById(sellerOrderId) {
        return this.ctx.server.trade.post("/order/getSellerOrderById", {
            sellerOrderId
        });
    }

    listOrder(type, pageIndex, pageSize = 10) {
        return this.ctx.server.trade.post("/order/listOrder", {
            type,
            pageIndex,
            pageSize
        });
    }

    createOrder(sellerList, addressId) {
        return this.ctx.server.trade.post("/order/createOrder", {
            sellerList,
            addressId
        });
    }

    cancelOrder(sellerOrderId) {
        return this.ctx.server.trade.post("/order/cancelOrder", {
            sellerOrderId
        });
    }

    simulatePay(tradeCode) {
        return this.ctx.server.trade.post("/order/simulatePay", {
            tradeCode
        });
    }
}