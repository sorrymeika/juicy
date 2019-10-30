import { controller, injectable } from "snowball/app";
import OrderListService from "../services/OrderListService";
import OrderList from "../containers/OrderList";

@controller(OrderList)
class OrderListController {
    @injectable orderListServices: OrderListService[] = {};

    @injectable orderListServiceFactory() {
        return new OrderListService(
            this.ctx.service.order,
        );
    }

    onInit() {
    }
}

export default OrderListController;