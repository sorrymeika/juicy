import { observable } from "snowball";
import { Service, autowired, param, emitter } from "snowball/app";
import SellerService from "../../../shared/services/SellerService";
import ShopSearchService from "../services/ShopSearchService";

const TABS = {
    SHOP: 'shop',
    PRODUCT: 'product',
    CATEGORY: 'category',
};

export default class ShopViewModel extends Service {
    @observable
    seller = {};

    @observable
    currentTab = TABS.SHOP;

    isProductsLoaded = false;

    @param('tab')
    _tabIndex;

    @observable
    tabIndex = this._tabIndex;

    @autowired
    sellerService: SellerService;

    @autowired
    _shopSearchService: ShopSearchService;

    constructor() {
        super();

        this.ctx.autorun(() => {
            this._shopSearchService.seller = this.seller;
        });
    }

    @emitter
    onTabChange(tabIndex) {
        this.setTabIndex(tabIndex);
    }

    setTabIndex(tabIndex) {
        this.tabIndex = tabIndex;
        this.setTab(tabIndex == 0 ? TABS.SHOP : tabIndex == 1 ? TABS.PRODUCT : TABS.CATEGORY);
    }

    setTab(tab) {
        switch (tab) {
            case TABS.PRODUCT:
                if (!this.isProductsLoaded) {
                    this.isProductsLoaded = true;
                    this._shopSearchService.search();
                }
                break;
        }
        this.currentTab = tab;
        return this;
    }
}