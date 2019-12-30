import { configuration } from "snowball/app";
import InvoiceService from "../services/InvoiceService";
import OrderCreationService from "../services/OrderCreationService";

@configuration
class OrderConfiguration {
    get invoiceService() {
        return new InvoiceService();
    }

    get orderCreationService() {
        return new OrderCreationService();
    }
}

export { OrderConfiguration };