import { controller, autowired } from "snowball/app";
import OrderInfoService from "../services/OrderInfoService";
import OrderInfo from "../containers/OrderInfo";

@controller(OrderInfo)
class OrderInfoController {

    @autowired
    orderInfoService: OrderInfoService;

    constructor(props) {
        this.sellerOrderId = Number(props.location.params.sellerOrderId);
    }

    onInit() {
        this.orderInfoService.init(this.sellerOrderId);
    }
}

export default OrderInfoController;