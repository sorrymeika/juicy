import { configuration } from "snowball/app";

import { UserConfiguration } from "../user/configuration";
import { CartConfiguration } from "../cart/configuration";
import { CategoryConfiguration } from "../category/configuration";
import { PageConfiguration } from "../brick/configuration";
import { ItemConfiguration } from "../item/configuration";

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