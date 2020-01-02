import { observable } from "snowball";
import { Service, autowired, param } from "snowball/app";
import SellerService from "../../../shared/services/SellerService";
import ShopSearchService from "./ShopSearchService";

const TABS = {
    SHOP: 'shop',
    PRODUCT: 'product',
    CATEGORY: 'category',
};

export default class ShopService extends Service {
    @observable
    seller = {};

    @observable
    currentTab = TABS.SHOP;

    @observable
    products = [];

    @observable
    isNoMoreData = false;

    @observable
    loading = true;

    isProductsLoaded = false;

    params = {};
    pageIndex = 1;
    pageSize = 20

    @param('tab')
    _tabIndex;

    @observable
    tabIndex = this._tabIndex;

    @autowired
    sellerService: SellerService;

    @autowired
    shopSearchService: ShopSearchService;

    constructor() {
        super();

        this.ctx.autorun(() => {
            this.shopSearchService.seller = this.seller;
        });

        this.onTabChange = this.ctx.createEmitter(((tabIndex) => {
            this.setTabIndex(tabIndex);
        }));
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
                    this.shopSearchService.search();
                }
                break;
        }
        this.currentTab = tab;
        return this;
    }
}