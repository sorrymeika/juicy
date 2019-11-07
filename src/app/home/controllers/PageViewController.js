import { injectable } from "snowball/app";
import PageService from "../../../shared/services/PageService";
import PageViewService from "../services/PageViewService";

import ProductService from "../../../shared/services/ProductService";
import SearchService from "../../../shared/services/SearchService";

class PageViewController {
    @injectable pageViewService: PageViewService;
    @injectable productService: ProductService;
    @injectable searchService: SearchService;

    @injectable get pageData() {
        return this.pageViewService.pageData;
    }

    @injectable get bricks() {
        return this.pageViewService.bricks;
    }

    constructor(props, context) {
        this.pageViewService = new PageViewService({
            pageService: new PageService()
        });
        this.productService = new ProductService();
        this.searchService = new SearchService();
    }
}

export default PageViewController;
