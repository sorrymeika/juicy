import { controller, injectable } from "snowball/app";
import AddressList from "../containers/AddressList";

@controller(AddressList)
class AddressListController {
    @injectable addressList = [];

    constructor(props) {
        this.isFromOrder = props.location.query.from == 'order';
        this.addressService = this.ctx.service.address;
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

    @injectable
    onSelect(address) {
        if (this.isFromOrder) {
            this.ctx.service.order.onAddressChange.emit(address);
            this.app.navigation.back();
        }
    }

    @injectable
    onEdit(address) {
        this.app.navigation.forward('/address/edit?id=' + address.id);
    }
}

export default AddressListController;