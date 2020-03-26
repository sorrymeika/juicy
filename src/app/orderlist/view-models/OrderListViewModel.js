

import { observable, util } from "snowball";
import { autowired, ViewModel } from "snowball/app";
import OrderService from "../../../shared/services/OrderService";

export default class OrderListViewModel extends ViewModel {
    @observable orderList = [];

    type = 0;
    pageIndex = 1;
    pageSize = 10;
    total = 0;

    @autowired
    orderService: OrderService;

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

                this.orderList = res.data;
                this.total = res.total;

                return res;
            });
    }
}