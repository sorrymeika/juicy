import { configuration } from "snowball/app";
import ShopService from "../services/ShopService";
import ShopSearchService from "../services/ShopSearchService";

export const ShopConfiguration = configuration({
    dependencies: [],
    modules: {
        shopService: ShopService,
        shopSearchService: ShopSearchService
    }
});