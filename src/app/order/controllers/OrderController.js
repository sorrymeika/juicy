import { controller, injectable } from "snowball/app";
import OrderCreationService from "../services/OrderCreationService";
import Order from "../containers/Order";

@controller(Order)
class OrderController {
    @injectable orderCreationService;

    constructor(props) {
        const skus = JSON.parse(props.location.query.skus || '[]');
        const addressService = this.ctx.service.address;

        this.skus = skus;
        this.orderCreationService = new OrderCreationService(
            this.ctx.service.order,
            addressService
        );
    }

    onInit() {
        this.orderCreationService.init(this.skus);
    }
}

export default OrderController;