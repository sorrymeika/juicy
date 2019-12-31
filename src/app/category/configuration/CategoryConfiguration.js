import { configuration } from "snowball/app";

import CategoryService from "../services/CategoryService";
import CategoryViewService from "../services/CategoryViewService";

export const CategoryConfiguration = configuration({
    modules: {
        categoryService: CategoryService,
        categoryViewService: CategoryViewService
    }
});