import { configuration } from "snowball/app";

import InvoiceService from "../services/InvoiceService";
import InvoiceViewModel from "../view-models/InvoiceViewModel";
import OrderCreationService from "../services/OrderCreationService";
import PayResultViewModel from "../view-models/PayResultViewModel";
import OrderPayService from "../services/OrderPayService";

export const OrderConfiguration = configuration({
    modules: {
        invoiceService: InvoiceService,
        invoiceViewModel: InvoiceViewModel,
        orderCreationService: OrderCreationService,
        payResultViewModel: PayResultViewModel,
        orderPayService: OrderPayService
    }
});