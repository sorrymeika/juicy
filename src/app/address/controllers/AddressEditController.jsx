import { controller, autowired } from "snowball/app";

import AddressEditService from "../services/AddressEditService";
import DistrictSelectService from "../services/DistrictSelectService";

import AddressEdit from "../containers/AddressEdit";
import { AddressConfiguration } from "../configuration/AddressConfiguration";
import AddressService from "../../../shared/services/AddressService";

@controller({
    component: AddressEdit,
    configuration: AddressConfiguration
})
class AddressEditController {
    @autowired
    districtSelectService: DistrictSelectService;

    @autowired
    addressEditService: AddressEditService;

    @autowired
    addressService: AddressService;

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
}

export default AddressEditController;