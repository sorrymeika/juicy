import { configuration } from "snowball/app";

import DistrictSelectService from "../services/DistrictSelectService";
import AddressSelectService from "../services/AddressSelectService";
import AddressEditService from "../services/AddressEditService";

@configuration
class AddressConfiguration {
    get districtSelectService() {
        return new DistrictSelectService();
    }

    get addressSelectService() {
        return new AddressSelectService();
    }

    get addressEditService() {
        return new AddressEditService();
    }
}

export { AddressConfiguration };