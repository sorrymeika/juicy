import { controller, autowired } from "snowball/app";
import CategoryService from "../services/CategoryService";
import CategoryViewModel from "../view-models/CategoryViewModel";
import { CategoryConfiguration } from "../configuration";
import Category from "../containers/Category";

@controller({
    component: Category,
    configuration: CategoryConfiguration
})
class CategoryController {
    @autowired
    categoryViewModel: CategoryViewModel;

    @autowired
    categoryService: CategoryService;

    onInit() {
        this.categoryViewModel.loadCates();
    }
}

export default CategoryController;