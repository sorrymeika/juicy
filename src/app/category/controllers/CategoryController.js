import { controller, injectable } from "snowball/app";
import Category from "../containers/Category";
import CategoryDataService from "../../../shared/services/CategoryDataService";
import CategoryService from "../services/CategoryService";

@controller(Category)
class CategoryController {
    @injectable categoryService: CategoryService;

    constructor() {
        this.categoryDataService = new CategoryDataService();
        this.categoryService = new CategoryService(
            this.categoryDataService
        );
    }

    onInit() {
        this.categoryService.loadCates();
    }
}

export default CategoryController;