import { controller, autowired, param } from "snowball/app";
import { toast } from "snowball/widget";

import PageViewModel from "../../brick/view-models/PageViewModel";

import ShopService from "../services/ShopService";
import Shop from "../containers/Shop";
import ShopSearchService from "../services/ShopSearchService";
import { PageConfiguration } from "../../brick/configuration";
import { ShopConfiguration } from "../configuration/ShopConfiguration";

@controller({
    component: Shop,
    configuration: [PageConfiguration, ShopConfiguration]
})
class ShopController {
    @param
    _sellerId: number;

    @param('tab')
    _tabIndex: number;

    @autowired
    _pageViewModel: PageViewModel;

    @autowired
    shopService: ShopService;

    @autowired
    shopSearchService: ShopSearchService;

    onInit() {
        if (this._tabIndex) {
            this.shopService.setTabIndex(this._tabIndex);
        }

        this._pageViewModel.initWithShop(this._sellerId)
            .then((res) => {
                if (!res.seller) {
                    toast.showToast('商户不存在或已注销！');
                    return;
                }
                this.shopService.seller = res.seller;
            });
    }
}

export default ShopController;