import { controller, autowired } from "snowball/app";
import Item from "../containers/Item";
import AddressSelectService from "../../address/services/AddressSelectService";
import CartNumService from "../../../shared/services/CartNumService";
import { ItemConfiguration } from "../configuration";

@controller({
    component: Item,
    configuration: ItemConfiguration
})
class ItemController {
    @autowired
    itemViewModel: ItemViewModel;

    @autowired
    addressSelectService: AddressSelectService;

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
        this.itemViewModel.init(this.spuId);
        this.cartNumService.pull();
    }
}

export default ItemController;