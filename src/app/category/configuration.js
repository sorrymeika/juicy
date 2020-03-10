import { configuration } from "snowball/app";

import CategoryService from "./services/CategoryService";
import CategoryViewModel from "./view-models/CategoryViewModel";

export const CategoryConfiguration = configuration({
    modules: {
        categoryService: CategoryService,
        categoryViewModel: CategoryViewModel
    }
});