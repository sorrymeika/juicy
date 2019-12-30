import { controller, autowired } from "snowball/app";
import AddressList from "../containers/AddressList";

@controller(AddressList)
class AddressListController {
    addressList = [];

    @autowired
    addressService;

    constructor(props) {
        this.isFromOrder = props.location.query.from == 'order';
    }

    onInit() {
        this.fetch();
    }

    onResume() {
        this.fetch();
    }

    fetch() {
        this.addressService.listUserAddress()
            .then(res => {
                this.addressList = res.data;
            });
    }

    onSelect(address) {
        if (this.isFromOrder) {
            this.ctx.service.order.onAddressChange.emit(address);
            this.app.navigation.back();
        }
    }

    onEdit(address) {
        this.app.navigation.forward('/address/edit?id=' + address.id);
    }
}

export default AddressListController;