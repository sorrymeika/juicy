import HomeController from "./home/controllers/HomeController";

export default {
    '/test': import("./home/controllers/TestController"),
    '/': HomeController,
};