import { configuration } from "snowball/app";
import { AddressConfiguration } from "../address/configuration/AddressConfiguration";

import ItemViewModel from "./view-models/ItemViewModel";
import ItemShopViewModel from "./view-models/ItemShopViewModel";
import ItemScrollHandler from "./view-models/ItemScrollHandler";

export const ItemConfiguration = configuration({
    dependencies: [AddressConfiguration],
    modules: {
        itemShopService: ItemShopViewModel,
        itemViewModel: ItemViewModel,
        itemScrollHandler: ItemScrollHandler
    }
});