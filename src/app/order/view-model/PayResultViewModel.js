import { Service, autowired, emitter } from "snowball/app";
import { observable } from "snowball";

export default class PayResultViewModel extends Service {
    @observable orderInfo = {};
    @observable error;

    @autowired
    _orderService;

    init(tradeId, sellerOrderId) {
        this.tradeId = tradeId;
        this.sellerOrderId = sellerOrderId;

        (sellerOrderId
            ? this._orderService.getSellerOrderById(sellerOrderId)
            : this._orderService.getOrderById(tradeId))
            .then(res => {
                this.orderInfo = res.data.orderInfo;

                if (this.orderInfo.payStatus != 1) {
                    this.gotoOrder();
                }
            })
            .catch(e => {
                this.error = e;
            });
    }

    @emitter('onGoToOrder')
    gotoOrder() {
        this.ctx.navigation.forward(this.sellerOrderId ? '/orderinfo/' + this.sellerOrderId : '/orderlist');
    }

    @emitter('onComplete')
    complete() {
        this.ctx.navigation.back();
    }
}