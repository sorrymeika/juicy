import { injectable } from "snowball/app";
import PageService from "../../../domain/services/PageService";
import PageViewService from "../services/PageViewService";

import ProductService from "../../../domain/services/ProductService";

class PageViewController {
    @injectable pageViewService: PageViewService;
    @injectable productService: ProductService;

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
    }
}

export default PageViewController;
