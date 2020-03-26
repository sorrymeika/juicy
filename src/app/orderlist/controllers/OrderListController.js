import { controller } from "snowball/app";
import OrderList from "../containers/OrderList";
import { OrderListConfiguration } from "../configuration";

@controller({
    component: OrderList,
    configuration: OrderListConfiguration
})
class OrderListController {
    onInit() {
    }
}

export default OrderListController;