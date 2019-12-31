import { configuration } from "snowball/app";
import InvoiceService from "../services/InvoiceService";
import OrderCreationService from "../services/OrderCreationService";

export const OrderConfiguration = configuration({
    modules: {
        invoiceService: InvoiceService,
        orderCreationService: OrderCreationService
    }
});