import { configuration } from "snowball/app";
import { AddressConfiguration } from "../address/configuration/AddressConfiguration";

import ItemService from "./services/ItemService";
import ItemShopService from "./services/ItemShopService";

export const ItemConfiguration = configuration({
    dependencies: [AddressConfiguration],
    modules: {
        itemShopService: ItemShopService,
        itemService: ItemService
    }
});