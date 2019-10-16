import { controller, injectable } from "snowball/app";
import AddressList from "../containers/AddressList";

@controller(AddressList)
class AddressListController {
    @injectable addressList = [];

    constructor() {
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
    onEdit(address) {
        this.ctx.navigation.forward('/address/edit?id=' + address.id);
    }
}

export default AddressListController;