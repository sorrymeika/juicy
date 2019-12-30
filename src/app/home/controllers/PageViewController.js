import { autowired } from "snowball/app";
import PageViewService from "../services/PageViewService";

import ProductService from "../../../shared/services/ProductService";
import SearchService from "../../../shared/services/SearchService";

class PageViewController {
    @autowired
    pageViewService: PageViewService;

    @autowired
    productService: ProductService;

    @autowired
    searchService: SearchService;

    get pageData() {
        return this.pageViewService.pageData;
    }

    get bricks() {
        return this.pageViewService.bricks;
    }
}

export default PageViewController;
