import { controller, injectable } from "snowball/app";
import { toast } from "snowball/widget";

import PageViewController from "../../home/controllers/PageViewController";
import ShopService from "../services/ShopService";
import Shop from "../containers/Shop";
import SellerService from "../../../shared/services/SellerService";
import ShopSearchService from "../services/ShopSearchService";

@controller(Shop)
class ShopController extends PageViewController {
    @injectable shopService: ShopService;
    @injectable shopSearchService: ShopSearchService;

    constructor(props, ctx) {
        super(props, ctx);

        this.sellerId = Number(props.location.params.sellerId);
        this.sellerService = new SellerService();
        this.shopSearchService = new ShopSearchService(
            this.sellerService,
            this.searchService
        );
        this.shopService = new ShopService(
            this.sellerService,
            this.shopSearchService
        );
    }

    onInit() {
        this.pageViewService.initWithShop(this.sellerId)
            .then((res) => {
                if (!res.seller) {
                    toast.showToast('商户不存在或已注销！');
                    return;
                }

                this.shopService.seller = res.seller;
                if (!res.data) {
                    this.shopService.hideHomeTab();
                }
            });
    }
}

export default ShopController;