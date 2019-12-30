import { controller } from "snowball/app";
import OrderPayService from "../services/OrderPayService";
import OrderPay from "../containers/OrderPay";

@controller(OrderPay)
class OrderPayController {
    orderPayService;

    constructor(props) {
        this.tradeId = Number(props.location.params.tradeId);
        this.sellerOrderId = Number(props.location.params.sellerOrderId) || 0;
        this.orderPayService = new OrderPayService(
            this.ctx.service.order,
        );
    }

    onInit() {
        this.orderPayService.init(this.tradeId, this.sellerOrderId);
    }
}

export default OrderPayController;