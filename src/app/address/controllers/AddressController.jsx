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

    get data() {
        return this.addressEditService.data;
    }

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

    onFieldChange(field, value) {
        this.addressEditService.onFieldChange.emit({ name: field, value });
    }

    onClickDistrict() {
        return this.addressEditService.onClickDistrict.emit();
    }

    onSave() {
        return this.addressEditService.onSave.emit();
    }

    saveAddress() {
    }
}

export default AddressController;