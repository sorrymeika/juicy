import HomeController from "./home/controllers/HomeController";
import MarketController from "./home/controllers/MarketController";
import ItemController from "./item/controllers/ItemController";

export default {
    '/test': import("./home/controllers/TestController"),
    '/': HomeController,
    '/market/\\d+:id': MarketController,
    '/item/\\d+:id': ItemController,
};