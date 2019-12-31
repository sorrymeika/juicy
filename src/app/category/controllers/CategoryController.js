import { controller, autowired } from "snowball/app";
import Category from "../containers/Category";
import CategoryService from "../services/CategoryService";
import CategoryViewService from "../services/CategoryViewService";
import { CategoryConfiguration } from "../configuration/CategoryConfiguration";

@controller({
    component: Category,
    configuration: CategoryConfiguration
})
class CategoryController {
    @autowired
    categoryViewService: CategoryViewService;

    @autowired
    categoryService: CategoryService;

    onInit() {
        this.categoryViewService.loadCates();
    }
}

export default CategoryController;