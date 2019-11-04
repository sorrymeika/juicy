import { Service } from "snowball/app";
import { observable } from "snowball";

export default class PayResultService extends Service {
    @observable orderInfo = {};
    @observable error;

    onGoToOrder = this.ctx.createEvent();
    onComplete = this.ctx.createEvent();

    constructor(orderService) {
        super();

        this.orderService = orderService;
        this.onGoToOrder(() => this.gotoOrder());
        this.onComplete(() => this.complete());
    }

    init(orderId) {
        this.orderService.getOrderById(orderId)
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
        this.ctx.navigation.forward('/orderinfo/' + this.orderInfo.id);
    }

    complete() {
        this.ctx.navigation.back();
    }
}