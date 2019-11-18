import { controller, injectable } from "snowball/app";

import CartListService from "../../cart/services/CartListService";
import UserCenterService from "../../user/services/UserCenterService";

import PageViewController from "./PageViewController";

import Home from "../containers/Home";

@controller(Home)
class HomeController extends PageViewController {
    @injectable cartListService: CartListService;
    @injectable userCenterService: UserCenterService;

    @injectable onFooterTabChange = this.ctx.createEvent();

    @injectable currentTab = 'home';

    @injectable isCateLoaded = false;
    @injectable isFindLoaded = false;
    @injectable isCartLoaded = false;
    @injectable isUserLoaded = false;

    constructor(props, ctx) {
        super(props, ctx);

        this.cartListService = new CartListService(
            this.ctx.service.cart,
            this.ctx.service.cartNum
        );

        this.userCenterService = new UserCenterService();

        this.onFooterTabChange(({ type }) => {
            if (this.currentTab != type) {
                this.currentTab = type;

                switch (type) {
                    case 'cate':
                        this.isFindLoaded = true;
                        break;
                    case 'find':
                        this.isCateLoaded = true;
                        break;
                    case 'cart':
                        this.isCartLoaded = true;
                        this.cartListService.loadUserCart();
                        break;
                    case 'user':
                        this.isUserLoaded = true;
                        this.userCenterService.init();
                        break;
                }
            }
        });
    }

    onInit() {
        this.pageViewService.initWithKeyName('home');
    }
}

export default HomeController;
