import { configuration } from "snowball/app";

import InvoiceService from "../services/InvoiceService";
import InvoiceViewService from "../services/InvoiceViewService";
import OrderCreationService from "../services/OrderCreationService";

export const OrderConfiguration = configuration({
    modules: {
        invoiceService: InvoiceService,
        invoiceViewService: InvoiceViewService,
        orderCreationService: OrderCreationService
    }
});