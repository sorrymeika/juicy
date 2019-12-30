import { configuration, singleton } from "snowball/app";

import UserService from "./shared/services/UserService";
import AddressService from "./shared/services/AddressService";
import GlobalAddressService from "./shared/services/GlobalAddressService";
import OrderService from "./shared/services/OrderService";
import CartService from "./shared/services/CartService";
import CartNumService from "./shared/services/CartNumService";
import SearchService from "./shared/services/SearchService";

@configuration
class AppConfiguration {
    @singleton
    get userService() {
        return new UserService();
    }

    @singleton
    get cartService() {
        return new CartService();
    }

    @singleton
    get cartNumService() {
        return new CartNumService();
    }

    @singleton
    get addressService() {
        return new AddressService();
    }

    @singleton
    get globalAddressService() {
        return new GlobalAddressService();
    }

    @singleton
    get orderService() {
        return new OrderService();
    }

    get searchService() {
        return new SearchService();
    }
}

export { AppConfiguration };