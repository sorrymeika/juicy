import { controller, autowired } from "snowball/app";


import AddressEditService from "../services/AddressEditService";
import DistrictSelectService from "../services/DistrictSelectService";

import Address from "../containers/Address";

@controller(Address)
class AddressController {
    @autowired
    districtSelectService: DistrictSelectService;

    @autowired
    addressEditService: AddressEditService;

    constructor(props) {
        this.addressId = Number(props.location.query.id) || 0;
    }

    onInit() {
        if (this.addressId) {
            this.addressService.getUserAddressById(this.addressId)
                .then(res => {
                    this.addressEditService.data = res.data;
                });
        }
    }

    onSave() {
        return this.addressEditService.onSave();
    }

    saveAddress() {
    }
}

export default AddressController;