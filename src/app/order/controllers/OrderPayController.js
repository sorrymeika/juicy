import { controller, injectable } from "snowball/app";
import OrderPayService from "../services/OrderPayService";
import OrderPay from "../containers/OrderPay";

@controller(OrderPay)
class OrderPayController {
    @injectable orderPayService;

    constructor(props) {
        this.tradeId = Number(props.location.params.tradeId);
        this.orderPayService = new OrderPayService(
            this.ctx.service.order,
        );
    }

    onInit() {
        this.orderPayService.init(this.tradeId);
    }
}

export default OrderPayController;