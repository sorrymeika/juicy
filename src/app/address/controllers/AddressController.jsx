import { controller, injectable } from "snowball/app";


import AddressEditService from "../services/AddressEditService";
import DistrictSelectService from "../services/DistrictSelectService";

import Address from "../containers/Address";

@controller(Address)
class AddressController {
    @injectable districtSelectService: DistrictSelectService;
    @injectable addressEditService: AddressEditService;

    @injectable get data() {
        return this.addressEditService.data;
    }

    constructor(props) {
        this.addressId = Number(props.location.query.id) || 0;

        const addressService = this.ctx.service.address;

        this.addressService = addressService;
        this.districtSelectService = new DistrictSelectService(
            addressService
        );
        this.addressEditService = new AddressEditService(
            addressService,
            this.districtSelectService
        );
    }

    onInit() {
        if (this.addressId) {
            this.addressService.getUserAddressById(this.addressId)
                .then(res => {
                    this.addressEditService.data = res.data;
                });
        }
    }

    @injectable onFieldChange(field, value) {
        this.addressEditService.onFieldChange.emit({ name: field, value });
    }

    @injectable onClickDistrict() {
        return this.addressEditService.onClickDistrict.emit();
    }

    @injectable onSave() {
        return this.addressEditService.onSave.emit();
    }

    saveAddress() {
    }
}

export default AddressController;