import { controller, autowired } from "snowball/app";
import CategoryViewModel from "../view-models/CategoryViewModel";
import { CategoryConfiguration } from "../configuration";
import Category from "../containers/Category";

@controller({
    component: Category,
    configuration: CategoryConfiguration
})
class CategoryController {
    @autowired
    _categoryViewModel: CategoryViewModel;

    onInit() {
        this._categoryViewModel.loadCates();
    }
}

export default CategoryController;