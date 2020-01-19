import { controller, param, autowired } from "snowball/app";
import PayResultViewModel from "../view-model/PayResultViewModel";
import PayResult from "../containers/PayResult";
import { OrderConfiguration } from "../configuration/OrderConfiguration";

@controller({
    component: PayResult,
    configuration: OrderConfiguration
})
class PayResultController {
    @param
    tradeId;

    @autowired
    _payResultViewModel: PayResultViewModel;

    onInit() {
        this._payResultViewModel.init(this.tradeId);
    }
}

export default PayResultController;