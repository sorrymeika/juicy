import { controller, param, autowired } from "snowball/app";
import OrderPayService from "../services/OrderPayService";
import OrderPay from "../containers/OrderPay";
import { OrderConfiguration } from "../configuration/OrderConfiguration";

@controller({
    component: OrderPay,
    configuration: OrderConfiguration
})
class OrderPayController {
    @param
    tradeId: number;

    @param
    sellerOrderId: number;

    @autowired
    orderPayService: OrderPayService;

    onInit() {
        this.orderPayService.init(this.tradeId, this.sellerOrderId);
    }
}

export default OrderPayController;