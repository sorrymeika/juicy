import { observable } from "snowball";
import { controller, autowired } from "snowball/app";

import PageViewModel from "../../brick/view-models/PageViewModel";

import CategoryViewModel from "../../category/view-models/CategoryViewModel";

import CartViewModel from "../../cart/view-models/CartViewModel";
import UserCenterViewModel from "../../user/view-models/UserCenterViewModel";

import Home from "../containers/Home";
import { HomeConfiguration } from "../configuration";

@controller({
    component: Home,
    configuration: HomeConfiguration
})
class HomeController {

    @autowired
    pageViewModel: PageViewModel;

    @autowired
    categoryViewModel: CategoryViewModel;

    @autowired
    cartViewModel: CartViewModel;

    @autowired
    userCenterViewModel: UserCenterViewModel;

    @observable
    currentTab = 'home';

    @observable
    isCateLoaded = false;

    @observable
    isFindLoaded = false;

    @observable
    isCartLoaded = false;

    @observable
    isUserLoaded = false;

    onInit() {
        this.pageViewModel.initWithKeyName('home');
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
                        this.categoryViewModel.loadCates();
                        this.isCateLoaded = true;
                    }
                    break;
                case 'find':
                    this.isFindLoaded = true;
                    break;
                case 'cart':
                    this.isCartLoaded = true;
                    this.cartViewModel.loadUserCart();
                    break;
                case 'user':
                    this.isUserLoaded = true;
                    this.userCenterViewModel.init();
                    break;
            }
        }
    }
}

export default HomeController;
