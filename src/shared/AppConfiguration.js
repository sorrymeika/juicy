import { configuration, singleton } from "snowball/app";
import { Server } from "sn-app";

import { API_URL } from "../env";

import UserService from "./services/UserService";
import AddressService from "./services/AddressService";
import GlobalAddressService from "./services/GlobalAddressService";
import OrderService from "./services/OrderService";
import CartService from "./services/CartService";
import CartNumService from "./services/CartNumService";
import SearchService from "./services/SearchService";
import ProductService from "./services/ProductService";
import SellerService from "./services/SellerService";

import { PicturesService } from "./components";

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
        productService: ProductService,
        sellerService: SellerService,
        userServer: () => new Server({ baseUrl: API_URL + '/user_server' }),
        marketServer: () => new Server({ baseUrl: API_URL + '/market_server' }),
        tradeServer: () => new Server({ baseUrl: API_URL + '/trade_server' }),
        baseServer: () => new Server({ baseUrl: API_URL + '/base_server' }),
    }
});

export { AppConfiguration };