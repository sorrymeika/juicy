import { controller, autowired } from "snowball/app";
import Invoice from "../containers/Invoice";
import InvoiceViewService from "../services/InvoiceViewService";
import { OrderConfiguration } from "../configuration/OrderConfiguration";

@controller({
    component: Invoice,
    configuration: OrderConfiguration
})
class InvoiceController {
    @autowired
    invoiceViewService: InvoiceViewService;

    onInit() {
        this.invoiceViewService.init();
    }
}

export default InvoiceController;