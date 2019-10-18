import { controller, injectable } from "snowball/app";
import Invoice from "../containers/Invoice";
import InvoiceService from "../services/InvoiceService";

@controller(Invoice)
class InvoiceController {
    @injectable invoiceService: InvoiceService;

    @injectable get data() {
        return this.invoiceService.data;
    }

    @injectable get isInvoiceSelectorVisible() {
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

    @injectable
    onFieldChange(name, value) {
        this.invoiceService.onFieldChange.emit({ name, value });
    }

    @injectable
    onShowInvoiceSelector() {
        this.invoiceService.onShowInvoiceSelector.emit();
    }

    @injectable
    onConfirm() {
        this.invoiceService.onConfirm.emit();
    }
}

export default InvoiceController;