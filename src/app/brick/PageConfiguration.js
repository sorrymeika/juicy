import { configuration } from "snowball/app";
import PageViewService from "./services/PageViewService";
import PageService from "./services/PageService";

export const PageConfiguration = configuration({
    modules: {
        pageService: PageService,
        pageViewService: PageViewService
    }
});