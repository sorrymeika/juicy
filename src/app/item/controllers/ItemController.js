import { controller, autowired } from "snowball/app";
import { ScrollView } from "snowball/components";
import Item from "../containers/Item";
import DistrictSelectService from "../../address/services/DistrictSelectService";
import AddressSelectService from "../../address/services/AddressSelectService";
import SearchService from "../../../shared/services/SearchService";
import CartNumService from "../../../shared/services/CartNumService";
import { ItemConfiguration } from "../ItemConfiguration";

@controller({
    component: Item,
    configuration: ItemConfiguration
})
class ItemController {
    mainScrollViewHandler = ScrollView.createHandler();

    @autowired
    itemService: ItemService;

    @autowired
    districtSelectService: DistrictSelectService;

    @autowired
    addressSelectService: AddressSelectService;

    @autowired
    itemShopService: ItemShopService;

    @autowired
    searchService: SearchService;

    @autowired
    cartNumService: CartNumService

    get currentAddress() {
        return this.addressSelectService.currentAddress;
    }

    get cartNum() {
        return this.cartNumService.total;
    }

    constructor(props) {
        this.spuId = Number(props.location.params.id);
    }

    onInit() {
        this.itemService.init(this.spuId);
        this.cartNumService.pull();
    }
}

export default ItemController;