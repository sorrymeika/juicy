import { Emitter } from "snowball";
import { Service } from "snowball/app";

export default class OrderService extends Service {
    onAddressChange = Emitter.create();
    onInvoiceChange = Emitter.create();

    getOrderBySkus(skus) {
        return this.app.server.trade.post("/order/getOrderBySkus", {
            skus
        });
    }

    getOrderById(orderId) {
        return this.app.server.trade.post("/order/getOrderById", {
            orderId
        });
    }

    getSellerOrderById(sellerOrderId) {
        return this.app.server.trade.post("/order/getSellerOrderById", {
            sellerOrderId
        });
    }

    listOrder(type, pageIndex, pageSize = 10) {
        return this.app.server.trade.post("/order/listOrder", {
            type,
            pageIndex,
            pageSize
        });
    }

    createOrder(sellerList, addressId) {
        return this.app.server.trade.post("/order/createOrder", {
            sellerList,
            addressId
        });
    }

    cancelOrder(sellerOrderId) {
        return this.app.server.trade.post("/order/cancelOrder", {
            sellerOrderId
        });
    }

    simulatePay(tradeCode) {
        return this.app.server.trade.post("/order/simulatePay", {
            tradeCode
        });
    }
}