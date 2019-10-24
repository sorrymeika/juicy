import { controller, injectable } from "snowball/app";
import OrderListService from "../services/OrderListService";
import OrderList from "../containers/OrderList";

@controller(OrderList)
class OrderListController {
    @injectable orderListService: OrderListService;

    constructor(props) {
        this.orderListService = new OrderListService(
            this.ctx.service.order,
        );
    }

    onInit() {
        this.orderListService.init(0);
    }
}

export default OrderListController;