import { Emitter } from "snowball";
import { Service, autowired } from "snowball/app";

export default class OrderService extends Service {
    @autowired
    _tradeServer;

    onAddressChange = Emitter.create();
    onInvoiceChange = Emitter.create();

    getOrderBySkus(skus) {
        return this._tradeServer.post("/order/getOrderBySkus", {
            skus
        });
    }

    getOrderById(orderId) {
        return this._tradeServer.post("/order/getOrderById", {
            orderId
        });
    }

    getSellerOrderById(sellerOrderId) {
        return this._tradeServer.post("/order/getSellerOrderById", {
            sellerOrderId
        });
    }

    listOrder(type, pageIndex, pageSize = 10) {
        return this._tradeServer.post("/order/listOrder", {
            type,
            pageIndex,
            pageSize
        });
    }

    createOrder(sellerList, addressId) {
        return this._tradeServer.post("/order/createOrder", {
            sellerList,
            addressId
        });
    }

    cancelOrder(sellerOrderId) {
        return this._tradeServer.post("/order/cancelOrder", {
            sellerOrderId
        });
    }

    simulatePay(tradeCode) {
        return this._tradeServer.post("/order/simulatePay", {
            tradeCode
        });
    }
}