import { observable } from "snowball";
import { controller, autowired } from "snowball/app";
import AddressList from "../containers/AddressList";

import OrderService from "../../../shared/services/OrderService";
import AddressService from "../../../shared/services/AddressService";

@controller(AddressList)
class AddressListController {
    @observable
    addressList = [];

    @autowired
    _addressService: AddressService;

    @autowired
    _orderService: OrderService;

    constructor(props) {
        this.isFromOrder = props.location.query.from == 'order';
    }

    onInit() {
        this._fetch();
    }

    onResume() {
        this._fetch();
    }

    _fetch() {
        this._addressService.listUserAddress()
            .then(res => {
                this.addressList = res.data;
            });
    }

    onSelect(address) {
        if (this.isFromOrder) {
            this._orderService.onAddressChange(address);
            this.app.navigation.back();
        }
    }

    onEdit(address) {
        this.app.navigation.forward('/address/edit?id=' + address.id);
    }
}

export default AddressListController;