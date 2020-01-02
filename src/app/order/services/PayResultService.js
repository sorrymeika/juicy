import { Service } from "snowball/app";
import { observable } from "snowball";

export default class PayResultService extends Service {
    @observable orderInfo = {};
    @observable error;

    onGoToOrder = this.ctx.createEmitter();
    onComplete = this.ctx.createEmitter();

    constructor(orderService) {
        super();

        this.orderService = orderService;
        this.onGoToOrder(() => this.gotoOrder());
        this.onComplete(() => this.complete());
    }

    init(tradeId, sellerOrderId) {
        this.tradeId = tradeId;
        this.sellerOrderId = sellerOrderId;

        (sellerOrderId
            ? this.orderService.getSellerOrderById(sellerOrderId)
            : this.orderService.getOrderById(tradeId))
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

    gotoOrder() {
        this.ctx.navigation.forward(this.sellerOrderId ? '/orderinfo/' + this.sellerOrderId : '/orderlist');
    }

    complete() {
        this.ctx.navigation.back();
    }
}