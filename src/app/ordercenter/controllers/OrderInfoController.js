import { controller, injectable } from "snowball/app";
import OrderInfoService from "../services/OrderInfoService";
import OrderInfo from "../containers/OrderInfo";

@controller(OrderInfo)
class OrderInfoController {
    @injectable orderInfoService;

    constructor(props) {
        this.sellerOrderId = Number(props.location.params.sellerOrderId);
        this.orderInfoService = new OrderInfoService(
            this.ctx.service.order,
        );
    }

    onInit() {
        this.orderInfoService.init(this.sellerOrderId);
    }
}

export default OrderInfoController;