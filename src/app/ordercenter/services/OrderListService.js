

import { observable, util } from "snowball";
import { Service } from "snowball/app";

export default class OrderListService extends Service {
    @observable orderList = [];

    type = 0;
    pageIndex = 1;
    pageSize = 10;
    total = 0;

    onInit = this.ctx.createEvent();

    constructor(orderService) {
        super();

        this.orderService = orderService;
        this.onInit(type => this.init(type));
    }

    init(type) {
        this.type = type || 0;
        this.pageIndex = 1;
        this.load();
    }

    loadPage(page) {
        this.pageIndex = page;
        this.load();
    }

    load() {
        return this.orderService.listOrder(this.type, this.pageIndex, this.pageSize)
            .then((res) => {
                util.setServerTime(res.sysTime);

                this.orderList = res.data.map(({ skus, sellerOrders, ...orderInfo }) => {
                    return {
                        orderInfo,
                        sellerOrders: sellerOrders.map(sellerOrder => {
                            const sellerOrderSkus = skus.filter(sku => sku.sellerId == sellerOrder.sellerId);
                            return {
                                ...sellerOrder,
                                skus: sellerOrderSkus,
                                total: sellerOrderSkus.reduce((total, sku) => {
                                    return total + sku.num;
                                }, 0)
                            };
                        })
                    };
                });

                this.total = res.total;

                return res;
            });
    }
}