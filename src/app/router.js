import HomeController from "./home/controllers/HomeController";
import MarketController from "./home/controllers/MarketController";
import ItemController from "./item/controllers/ItemController";
import CartController from "./cart/controllers/CartController";
import OrderController from "./order/controllers/OrderController";
import InvoiceController from "./order/controllers/InvoiceController";
import AddressListController from "./address/controllers/AddressListController";
import AddressController from "./address/controllers/AddressController";

export default {
    '/test': import("./home/controllers/TestController"),
    '/': HomeController,
    '/market/\\d+:id': MarketController,
    '/item/\\d+:id': ItemController,
    '/cart': CartController,
    '/order/create': OrderController,
    '/address/list': AddressListController,
    '/address/edit': AddressController,
    '/invoice': InvoiceController,
};