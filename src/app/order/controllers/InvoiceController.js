import { controller } from "snowball/app";
import Invoice from "../containers/Invoice";
import InvoiceService from "../services/InvoiceService";

@controller(Invoice)
class InvoiceController {
    invoiceService: InvoiceService;

    get data() {
        return this.invoiceService.data;
    }

    get isInvoiceSelectorVisible() {
        return this.invoiceService.isInvoiceSelectorVisible;
    }

    constructor(props) {
        this.invoiceService = new InvoiceService(
            this.ctx.service.user
        );
        this.invoiceService.sellerId = Number(props.location.query.sellerId) || 0;
    }

    onInit() {
        this.invoiceService.onInit.emit();
    }

    onFieldChange(name, value) {
        this.invoiceService.onFieldChange.emit({ name, value });
    }

    onShowInvoiceSelector() {
        this.invoiceService.onShowInvoiceSelector.emit();
    }

    onConfirm() {
        this.invoiceService.onConfirm.emit();
    }
}

export default InvoiceController;