import { controller, injectable } from "snowball/app";
import Search from "../containers/Search";
import SearchService from "../../../shared/services/SearchService";
import SearchResultService from "../services/SearchResultService";

@controller(Search)
class SearchController {
    @injectable searchResultService: SearchResultService;

    constructor() {
        this.searchService = new SearchService();
        this.searchResultService = new SearchResultService(
            this.searchService
        );
    }

    onInit() {
        const { keywords, formulaId } = this.ctx.location.query;

        this.searchResultService.search(
            formulaId
                ? {
                    formulaId
                }
                : {
                    keywords
                }
        );
    }
}

export default SearchController;