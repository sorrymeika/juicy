import { controller, injectable } from "snowball/app";
import PayResultService from "../services/PayResultService";
import PayResult from "../containers/PayResult";

@controller(PayResult)
class PayResultController {
    @injectable payResultService;

    constructor(props) {
        this.tradeId = Number(props.location.params.tradeId);
        this.payResultService = new PayResultService(
            this.ctx.service.order,
        );
    }

    onInit() {
        this.payResultService.init(this.tradeId);
    }
}

export default PayResultController;