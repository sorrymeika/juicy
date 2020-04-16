import { controller, autowired, param } from "snowball/app";
import { toast } from "snowball/widget";

import PageViewModel from "../../brick/view-models/PageViewModel";

import ShopViewModel from "../view-models/ShopViewModel";
import Shop from "../containers/Shop";
import { PageConfiguration } from "../../brick/configuration";
import { ShopConfiguration } from "../configuration";
import ShopSearchViewModel from "../view-models/ShopSearchViewModel";

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
    _shopViewModel: ShopViewModel;

    @autowired
    _shopSearchViewModel: ShopSearchViewModel;

    onInit() {
        if (this._tabIndex) {
            this._shopViewModel.setTabIndex(this._tabIndex);
        }
        this._shopSearchViewModel.setSellerId(this._sellerId);
        this._pageViewModel.initWithShop(this._sellerId)
            .then((res) => {
                if (!res.seller) {
                    toast.showToast('商户不存在或已注销！');
                    return;
                }
                this._shopViewModel.seller = res.seller;
            });
    }
}

export default ShopController;