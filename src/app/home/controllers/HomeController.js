import { controller, injectable } from "snowball/app";
import Home from "../containers/Home";
import PageService from "../../../domain/services/PageService";
import PageViewService from "../services/PageViewService";

@controller(Home)
class HomeController {
    @injectable pageViewService: PageViewService;

    constructor({ location }, context) {
        this.pageViewService = new PageViewService({
            pageService: new PageService()
        });
    }

    onInit() {
        this.pageViewService.initWithKeyName('home');
    }
}

export default HomeController;
