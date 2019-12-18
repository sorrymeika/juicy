import { observable } from "snowball";
import { Service } from "snowball/app";
import SellerService from "../../../shared/services/SellerService";
import ShopSearchService from "./ShopSearchService";

const TABS = {
    SHOP: 'shop',
    PRODUCT: 'product',
    CATEGORY: 'category',
};

export default class ShopService extends Service {
    @observable seller = {};

    @observable isHomeTabVisible = true;
    @observable currentTab = TABS.SHOP;

    @observable products = [];
    @observable isNoMoreData = false;
    @observable loading = true;

    isProductsLoaded = false;

    params = {};
    pageIndex = 1;
    pageSize = 20

    onTabChange = this.ctx.createEvent();

    constructor(
        sellerService: SellerService,
        shopSearchService: ShopSearchService
    ) {
        super();

        this.sellerService = sellerService;
        this.shopSearchService = shopSearchService;

        this.ctx.autorun(() => {
            this.shopSearchService.seller = this.seller;
        });

        this.onTabChange((tabIndex) => {
            const type = this.isHomeTabVisible ? tabIndex : (tabIndex + 1);
            this.setTab(type == 0 ? TABS.SHOP : type == 1 ? TABS.PRODUCT : TABS.CATEGORY);
        });
    }

    hideHomeTab() {
        this.isHomeTabVisible = false;
        this.setTab(TABS.SHOP);
        return this;
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