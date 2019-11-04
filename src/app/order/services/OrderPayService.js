import { Service } from "snowball/app";
import { observable, util } from "snowball";
import { toast } from "snowball/widget";

export default class OrderPayService extends Service {
    @observable orderInfo = {};
    @observable addressInfo = {};
    @observable sellerOrders = [];
    @observable error;
    @observable currentPayType = 1;

    onPayTypeChange = this.ctx.createEvent();
    onPay = this.ctx.createEvent();

    constructor(orderService) {
        super();

        this.orderService = orderService;
        this.onPayTypeChange((payType) => {
            this.currentPayType = payType;
        });

        this.onPay(() => this.pay());
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

    pay() {
        if (this.currentPayType == 1) {
            // TODO: 微信支付
            toast.showToast('暂未开通，敬请期待！');
        } else if (this.currentPayType == 1) {
            // TODO: 支付宝支付
            toast.showToast('暂未开通，敬请期待！');
        } else if (this.currentPayType == 3) {
            // 模拟支付
            this.orderService.simulatePay(this.orderInfo.code)
                .then(res => {
                    this.ctx.navigation.forward('/payresult/' + this.orderInfo.id);
                });
        }
    }
}