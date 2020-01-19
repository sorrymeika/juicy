import { configuration } from "snowball/app";

import InvoiceService from "../services/InvoiceService";
import InvoiceViewModel from "../view-model/InvoiceViewModel";
import OrderCreationService from "../services/OrderCreationService";

export const OrderConfiguration = configuration({
    modules: {
        invoiceService: InvoiceService,
        invoiceViewModel: InvoiceViewModel,
        orderCreationService: OrderCreationService
    }
});