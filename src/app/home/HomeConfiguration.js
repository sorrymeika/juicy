import { UserConfiguration } from "../user/configuration/UserConfiguration";
import { CartConfiguration } from "../cart/CartConfiguration";
import { CategoryConfiguration } from "../category/configuration/CategoryConfiguration";
import { PageConfiguration } from "../brick/PageConfiguration";
import { ItemConfiguration } from "../item/configuration/ItemConfiguration";
import { configuration } from "snowball/app";

export const HomeConfiguration = configuration({
    dependencies: [
        UserConfiguration,
        CartConfiguration,
        CategoryConfiguration,
        ItemConfiguration,
        PageConfiguration
    ],
    modules: {}
});