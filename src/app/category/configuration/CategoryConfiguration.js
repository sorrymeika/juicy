import { configuration } from "snowball/app";
import CategoryService from "../../../shared/services/CategoryService";
import CategoryViewService from "../services/CategoryViewService";

@configuration
class CategoryConfiguration {
    get categoryService() {
        return new CategoryService();
    }

    get categoryViewService() {
        return new CategoryViewService();
    }
}

export { CategoryConfiguration };