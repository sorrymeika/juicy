import { configuration, singleton } from "snowball/app";
import { Server } from "sn-app";

import { API_URL } from "./env";

import UserService from "./shared/services/UserService";
import AddressService from "./shared/services/AddressService";
import GlobalAddressService from "./shared/services/GlobalAddressService";
import OrderService from "./shared/services/OrderService";
import CartService from "./shared/services/CartService";
import CartNumService from "./shared/services/CartNumService";
import SearchService from "./shared/services/SearchService";

import { PicturesService } from "./shared/components";

const AppConfiguration = configuration({
    modules: {
        userService: singleton(UserService),
        cartService: singleton(CartService),
        cartNumService: singleton(CartNumService),
        addressService: singleton(AddressService),
        orderService: singleton(OrderService),
        globalAddressService: singleton(GlobalAddressService),
        searchService: SearchService,
        picturesService: PicturesService,
        userServer: () => new Server({ baseUrl: API_URL + '/user_server' }),
        marketServer: () => new Server({ baseUrl: API_URL + '/market_server' }),
        tradeServer: () => new Server({ baseUrl: API_URL + '/trade_server' }),
        baseServer: () => new Server({ baseUrl: API_URL + '/base_server' }),
    }
});

export { AppConfiguration };