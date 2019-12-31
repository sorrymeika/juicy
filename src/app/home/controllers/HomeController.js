import { controller, autowired } from "snowball/app";

import CategoryViewService from "../../category/services/CategoryViewService";

import CartViewService from "../../cart/services/CartViewService";
import UserCenterService from "../../user/services/UserCenterService";

import PageViewController from "./PageViewController";

import Home from "../containers/Home";
import { HomeConfiguration } from "../configuration/HomeConfiguration";

@controller({
    component: Home,
    configuration: HomeConfiguration
})
class HomeController extends PageViewController {
    @autowired
    categoryViewService: CategoryViewService;

    @autowired
    cartViewService: CartViewService;

    @autowired
    userCenterService: UserCenterService;

    currentTab = 'home';

    isCateLoaded = false;
    isFindLoaded = false;
    isCartLoaded = false;
    isUserLoaded = false;

    onInit() {
        this.pageViewService.initWithKeyName('home');
    }

    onGotoSearch() {
        this.ctx.navigation.forward('/searchInput', false);
    }

    onFooterTabChange({ type }) {
        if (this.currentTab != type) {
            this.currentTab = type;

            switch (type) {
                case 'cate':
                    if (!this.isCateLoaded) {
                        this.categoryViewService.loadCates();
                        this.isCateLoaded = true;
                    }
                    break;
                case 'find':
                    this.isFindLoaded = true;
                    break;
                case 'cart':
                    this.isCartLoaded = true;
                    this.cartViewService.loadUserCart();
                    break;
                case 'user':
                    this.isUserLoaded = true;
                    this.userCenterService.init();
                    break;
            }
        }
    }
}

export default HomeController;
