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
    @observable sellerOrders = [];
    @observable error;

    onToPay = this.ctx.createEvent();
    onCancelOrder = this.ctx.createEvent();

    constructor(orderService) {
        super();

        this.orderService = orderService;

        this.onToPay((orderId) => this.toPay(orderId));
        this.onCancelOrder((orderId) => this.cancelOrder(orderId));
    }

    init(orderId) {
        this.fetchOrder(orderId);
    }

    fetchOrder(orderId) {
        this.orderService.getOrderById(orderId)
            .then(res => {
                const { orderInfo } = res.data;

                util.setServerTime(res.sysTime);

                this.orderInfo = orderInfo;
                this.addressInfo = res.data.addressInfo;
                this.sellerOrders = res.data.sellerOrders.map(sellerOrder => {
                    const skus = res.data.skus.filter(sku => sku.sellerId == sellerOrder.sellerId);
                    return {
                        ...sellerOrder,
                        skus,
                        total: skus.reduce((total, sku) => {
                            return total + sku.num;
                        }, 0)
                    };
                });

                const waitingForPay = orderInfo.payStatus == 0 && orderInfo.status != -1;
                const isCanceled = orderInfo.status == -1;
                const isComplete = orderInfo.status == -4 || orderInfo.status == 4;
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

    toPay(orderId) {
        this.ctx.navigation.forward('/pay/' + orderId);
    }

    cancelOrder(orderId) {
        this.orderService.cancelOrder(orderId)
            .then((res) => {
                toast.showToast('取消成功');
                this.fetchOrder(orderId);
            })
            .catch(e => {
                toast.showToast(e.message);
            });
    }
}