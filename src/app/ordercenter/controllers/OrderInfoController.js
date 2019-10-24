import { controller, injectable } from "snowball/app";
import OrderInfoService from "../services/OrderInfoService";
import OrderInfo from "../containers/OrderInfo";

@controller(OrderInfo)
class OrderInfoController {
    @injectable orderInfoService;

    constructor(props) {
        this.tradeId = Number(props.location.params.tradeId);
        this.orderInfoService = new OrderInfoService(
            this.ctx.service.order,
        );
    }

    onInit() {
        this.orderInfoService.init(this.tradeId);
    }
}

export default OrderInfoController;