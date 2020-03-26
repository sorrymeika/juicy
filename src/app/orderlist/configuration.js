import { configuration } from "snowball/app";
import OrderListViewModel from "./view-models/OrderListViewModel";

export const OrderListConfiguration = configuration({
    modules: {
        orderListViewModel: OrderListViewModel
    }
});