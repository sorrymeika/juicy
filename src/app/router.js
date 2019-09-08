import HomeController from "./home/controllers/HomeController";
import MarketController from "./home/controllers/MarketController";

export default {
    '/test': import("./home/controllers/TestController"),
    '/': HomeController,
    '/market/\\d+:id': MarketController,
};