import { configuration } from "snowball/app";

import DistrictSelectService from "../services/DistrictSelectService";
import AddressSelectService from "../services/AddressSelectService";
import AddressEditService from "../services/AddressEditService";

const AddressConfiguration = configuration({
    modules: {
        districtSelectService: DistrictSelectService,
        addressSelectService: AddressSelectService,
        addressEditService: AddressEditService
    }
});

export { AddressConfiguration };