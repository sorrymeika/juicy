import { observable, util } from "snowball";
import { Service } from "snowball/app";
import { toast } from "snowball/widget";

/*
    订单状态，整单无退换货中间状态：
    -1: '已取消',
    0: '待付款',
    1: '付款成功',
    2: '已全部发货',
    3: '已全部出库',
    4: '确认收货',
    -4: '全部退款成功'

    订单商品状态:
    -4: '未出库退款成功',
    -3: '未出库退款中',
    -2: '未出库请求退款',
    -1: '未付款已取消',
    0: '待付款',
    1: '付款成功',
    2: '已发货',
    3: '已出库',
    4: '确认收货',
    5: '已出库请求退货',
    6: '退货退款中',
    7: '退货完成（退款未完成）',
    8: '退款完成（退货未完成）',
    9: '退货退款成功'
*/
export default class OrderInfoService extends Service {
    @observable orderInfo = {};
    @observable addressInfo = {};
    @observable orderStatus = {};
    @observable error;

    onToPay = this.ctx.createEvent();
    onCancelOrder = this.ctx.createEvent();

    constructor(orderService) {
        super();

        this.orderService = orderService;

        this.onToPay((orderSellerId) => this.toPay(orderSellerId));
        this.onCancelOrder((orderSellerId) => this.cancelOrder(orderSellerId));
    }

    init(orderSellerId) {
        this.loadOrder(orderSellerId);
    }

    loadOrder(orderSellerId) {
        this.orderService.getSellerOrderById(orderSellerId)
            .then(res => {
                const { orderInfo } = res.data;

                util.setServerTime(res.sysTime);

                this.orderInfo = orderInfo;
                this.addressInfo = res.data.addressInfo;

                const waitingForPay = orderInfo.payStatus == 0 && orderInfo.status != -1;
                const isCanceled = orderInfo.status == -1;
                const isComplete = orderInfo.status == -4 || orderInfo.status == 4 || orderInfo.status == 9;
                const cancelable = orderInfo.status == 0;
                const waitingForReceipt = orderInfo.status == 1 || orderInfo.status == 2 || orderInfo.status == 3;
                const isReceipted = orderInfo.status == 4;

                const orderStatus = {
                    status: orderInfo.status,
                    waitingForPay,
                    isCanceled,
                    isComplete,
                    cancelable,
                    waitingForReceipt,
                    isReceipted
                };
                this.orderStatus = orderStatus;
            })
            .catch(e => {
                this.error = e;
            });
    }

    toPay(orderSellerId) {
        this.ctx.navigation.forward('/pay/' + this.orderInfo.tradeId + '/' + orderSellerId);
    }

    cancelOrder(orderSellerId) {
        this.orderService.cancelOrder(orderSellerId)
            .then((res) => {
                toast.showToast('取消成功');
                this.loadOrder(orderSellerId);
            })
            .catch(e => {
                toast.showToast(e.message);
            });
    }
}