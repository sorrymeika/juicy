import { configuration } from "snowball/app";
import { AddressConfiguration } from "../../address/configuration/AddressConfiguration";

import ProductService from "../../../shared/services/ProductService";
import ItemService from "../services/ItemService";
import ItemShopService from "../services/ItemShopService";

@configuration([AddressConfiguration])
class ItemConfiguration {
    get productService() {
        return new ProductService();
    }

    get itemShopService() {
        return new ItemShopService();
    }

    get itemService() {
        return new ItemService();
    }
}

export { ItemConfiguration };