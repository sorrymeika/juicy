import { injectable } from "snowball/app";
import PageService from "../../../domain/services/PageService";
import PageViewService from "../services/PageViewService";

class PageViewController {
    @injectable pageViewService: PageViewService;

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
    }
}

export default PageViewController;
