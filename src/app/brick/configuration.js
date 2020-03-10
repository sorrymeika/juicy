import { configuration } from "snowball/app";
import PageViewModel from "./view-models/PageViewModel";
import PageService from "./services/PageService";

export const PageConfiguration = configuration({
    modules: {
        pageService: PageService,
        pageViewModel: PageViewModel
    }
});