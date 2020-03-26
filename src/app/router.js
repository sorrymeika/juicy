import { lazy } from "snowball/app";
import HomeController from "./home/controllers/HomeController";
import MarketController from "./market/MarketController";
import ShopController from "./shop/controllers/ShopController";

import LoginController from "./user/controllers/LoginController";
import UserCenterController from "./user/controllers/UserCenterController";
import SettingController from "./user/controllers/SettingController";
import UserEditController from "./user/controllers/UserEditController";

import ItemController from "./item/controllers/ItemController";
import CartController from "./cart/controllers/CartController";

import AddressListController from "./address/controllers/AddressListController";
import AddressEditController from "./address/controllers/AddressEditController";

import OrderController from "./order/controllers/OrderController";
import OrderPayController from "./order/controllers/OrderPayController";
import OrderInfoController from "./orderinfo/OrderInfoController";
import OrderListController from "./orderlist/controllers/OrderListController";

import InvoiceController from "./order/controllers/InvoiceController";
import PayResultController from "./order/controllers/PayResultController";
import CategoryController from "./category/controllers/CategoryController";
import SearchController from "./search/controllers/SearchController";
import SearchInputController from "./search/controllers/SearchInputController";

export default {
    '/test': lazy(() => import("./home/controllers/TestController")),
    '/': HomeController,
    '/market/\\d+:id': MarketController,
    '/shop/\\d+:sellerId': ShopController,

    '/cates': CategoryController,
    '/search': SearchController,
    '/searchInput': SearchInputController,

    '/login': LoginController,
    '/usercenter': UserCenterController,
    '/setting': SettingController,
    '/user/edit': UserEditController,

    '/item/\\d+:id': ItemController,
    '/cart': CartController,

    '/order/create': OrderController,

    '/pay/\\d+:tradeId(?:/\\d+:sellerOrderId)?': OrderPayController,
    '/payresult/\\d+:tradeId(?:/\\d+:sellerOrderId)?': PayResultController,

    '/orderinfo/\\d+:sellerOrderId': OrderInfoController,
    '/orderlist(?:/\\d+:type)?': OrderListController,

    '/address/list': AddressListController,
    '/address/edit': AddressEditController,

    '/invoice': InvoiceController,
};