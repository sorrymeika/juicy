import { configuration } from "snowball/app";
import { AddressConfiguration } from "../../address/configuration/AddressConfiguration";

import ProductService from "../../../shared/services/ProductService";
import ItemService from "../services/ItemService";
import ItemShopService from "../services/ItemShopService";

export const ItemConfiguration = configuration({
    imports: [AddressConfiguration],
    modules: {
        productService: ProductService,
        itemShopService: ItemShopService,
        itemService: ItemService
    }
});