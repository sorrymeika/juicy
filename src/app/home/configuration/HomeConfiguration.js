import { UserConfiguration } from "../../user/configuration/UserConfiguration";
import { CartConfiguration } from "../../cart/configuration/CartConfiguration";
import { CategoryConfiguration } from "../../category/configuration/CategoryConfiguration";
import { MarketConfiguration } from "../configuration/MarketConfiguration";
import { ItemConfiguration } from "../../item/configuration/ItemConfiguration";
import { configuration } from "snowball/app";

export const HomeConfiguration = configuration({
    imports: [
        UserConfiguration,
        CartConfiguration,
        CategoryConfiguration,
        ItemConfiguration,
        MarketConfiguration
    ],
    modules: {}
});