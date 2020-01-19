import { Service, autowired } from "snowball/app";
import { observable, util } from "snowball";
import { toast } from "snowball/widget";

export default class OrderPayService extends Service {
    @observable orderInfo = {};
    @observable error;
    @observable currentPayType = 1;

    onPayTypeChange = this.ctx.createEmitter();
    onPay = this.ctx.createEmitter();

    @autowired
    _orderService;

    constructor() {
        super();

        this.onPayTypeChange((payType) => {
            this.currentPayType = payType;
        });

        this.onPay(() => this.pay());
    }

    init(tradeId, sellerOrderId) {
        this.tradeId = tradeId;
        this.sellerOrderId = sellerOrderId;

        (sellerOrderId
            ? this._orderService.getSellerOrderById(sellerOrderId)
            : this._orderService.getOrderById(tradeId))
            .then(res => {
                util.setServerTime(res.sysTime);
                this.orderInfo = res.data.orderInfo;
            })
            .catch(e => {
                this.error = e;
                toast.showToast(e.message);
            });
    }

    pay() {
        if (this.currentPayType == 1) {
            // TODO: 微信支付
            toast.showToast('暂未开通，敬请期待！');
        } else if (this.currentPayType == 1) {
            // TODO: 支付宝支付
            toast.showToast('暂未开通，敬请期待！');
        } else if (this.currentPayType == 4) {
            // 模拟支付
            const tradeCode = this.orderInfo.code + (this.sellerOrderId ? '-' + this.sellerOrderId : '');
            this._orderService.simulatePay(tradeCode)
                .then(res => {
                    this.ctx.navigation.forward('/payresult/' + this.tradeId + (this.sellerOrderId ? '/' + this.sellerOrderId : ''));
                });
        }
    }
}