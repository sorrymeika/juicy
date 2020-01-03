import { UserConfiguration } from "../user/configuration/UserConfiguration";
import { CartConfiguration } from "../cart/CartConfiguration";
import { CategoryConfiguration } from "../category/CategoryConfiguration";
import { PageConfiguration } from "../brick/PageConfiguration";
import { ItemConfiguration } from "../item/ItemConfiguration";
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