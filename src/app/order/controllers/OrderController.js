import { controller, autowired } from "snowball/app";
import OrderCreationService from "../services/OrderCreationService";
import { OrderConfiguration } from "../configuration/OrderConfiguration";

import Order from "../containers/Order";
@controller({
    component: Order,
    configuration: OrderConfiguration
})
class OrderController {
    @autowired
    orderCreationService: OrderCreationService;

    constructor(props) {
        const skus = JSON.parse(props.location.query.skus || '[]');
        this.skus = skus;
    }

    onInit() {
        this.orderCreationService.init(this.skus);
    }
}

export default OrderController;