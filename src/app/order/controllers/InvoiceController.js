import { controller, autowired } from "snowball/app";
import Invoice from "../containers/Invoice";
import InvoiceViewModel from "../view-model/InvoiceViewModel";
import { OrderConfiguration } from "../configuration/OrderConfiguration";

@controller({
    component: Invoice,
    configuration: OrderConfiguration
})
class InvoiceController {
    @autowired
    invoiceViewModel: InvoiceViewModel;

    onInit() {
        this.invoiceViewModel.init();
    }
}

export default InvoiceController;