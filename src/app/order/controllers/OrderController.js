import { controller, injectable } from "snowball/app";
import OrderService from "../../../domain/services/OrderService";
import OrderCreationService from "../services/OrderCreationService";
import Order from "../containers/Order";

@controller(Order)
class OrderController {
    @injectable orderCreationService;

    constructor(props) {
        const skus = JSON.parse(props.location.query.skus || '[]');
        const orderAddressService = this.ctx.service.orderAddress;

        this.skus = skus;
        this.orderCreationService = new OrderCreationService(
            new OrderService(),
            orderAddressService
        );
    }

    onInit() {
        this.orderCreationService.init(this.skus);
    }
}

export default OrderController;