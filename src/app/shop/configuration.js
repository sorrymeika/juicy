import { configuration } from "snowball/app";
import ShopViewModel from "./view-models/ShopViewModel";
import ShopSearchService from "./services/ShopSearchService";
import ShopSearchViewModel from "./view-models/ShopSearchViewModel";

export const ShopConfiguration = configuration({
    dependencies: [],
    modules: {
        shopViewModel: ShopViewModel,
        shopSearchService: ShopSearchService,
        shopSearchViewModel: ShopSearchViewModel,
    }
});