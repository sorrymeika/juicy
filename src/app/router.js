import HomeController from "./home/controllers/HomeController";
import MarketController from "./home/controllers/MarketController";

import LoginController from "./user/controllers/LoginController";
import UserCenterController from "./user/controllers/UserCenterController";
import SettingController from "./user/controllers/SettingController";
import UserEditController from "./user/controllers/UserEditController";

import ItemController from "./item/controllers/ItemController";
import CartController from "./cart/controllers/CartController";

import AddressListController from "./address/controllers/AddressListController";
import AddressController from "./address/controllers/AddressController";

import OrderController from "./order/controllers/OrderController";
import OrderPayController from "./order/controllers/OrderPayController";
import OrderInfoController from "./ordercenter/controllers/OrderInfoController";
import OrderListController from "./ordercenter/controllers/OrderListController";

import InvoiceController from "./order/controllers/InvoiceController";
import PayResultController from "./order/controllers/PayResultController";


export default {
    '/test': import("./home/controllers/TestController"),
    '/': HomeController,
    '/market/\\d+:id': MarketController,

    '/login': LoginController,
    '/usercenter': UserCenterController,
    '/setting': SettingController,
    '/user/edit': UserEditController,

    '/item/\\d+:id': ItemController,
    '/cart': CartController,
    '/order/create': OrderController,
    '/pay/\\d+:tradeId': OrderPayController,
    '/payresult/\\d+:tradeId': PayResultController,
    '/orderinfo/\\d+:tradeId': OrderInfoController,
    '/orderlist(?:/\\d+:type)?': OrderListController,
    '/address/list': AddressListController,
    '/address/edit': AddressController,
    '/invoice': InvoiceController,
};