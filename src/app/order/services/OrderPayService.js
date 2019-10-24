import { Service } from "snowball/app";
import { observable, util } from "snowball";

export default class OrderPayService extends Service {
    @observable orderInfo = {};
    @observable addressInfo = {};
    @observable sellerOrders = [];
    @observable error;

    constructor(orderService) {
        super();

        this.orderService = orderService;
    }

    init(orderId) {
        this.orderService.getOrderById(orderId)
            .then(res => {
                util.setServerTime(res.sysTime);
                this.orderInfo = res.data.orderInfo;
                this.addressInfo = res.data.addressInfo;
                this.sellerOrders = res.data.sellerOrders.map(sellerOrder => {
                    return {
                        ...sellerOrder,
                        skus: res.data.skus.filter(sku => sku.sellerId == sellerOrder.sellerId)
                    };
                });
            })
            .catch(e => {
                this.error = e;
            });
    }
}