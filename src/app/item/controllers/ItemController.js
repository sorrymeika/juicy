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
    _itemViewModel: ItemViewModel;

    @autowired
    _addressSelectService: AddressSelectService;

    @autowired
    _cartNumService: CartNumService

    get currentAddress() {
        return this._addressSelectService.currentAddress;
    }

    get cartNum() {
        return this._cartNumService.total;
    }

    constructor(props) {
        this.spuId = Number(props.location.params.id);
    }

    onInit() {
        this._itemViewModel.init(this.spuId);
        this._cartNumService.pull();
    }
}

export default ItemController;