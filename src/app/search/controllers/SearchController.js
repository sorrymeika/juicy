import { controller, autowired } from "snowball/app";
import Search from "../containers/Search";
import SearchService from "../../../shared/services/SearchService";
import SearchResultService from "../services/SearchResultService";
import { SearchConfiguration } from "../configuration";

@controller({
    component: Search,
    configuration: SearchConfiguration
})
class SearchController {
    @autowired
    searchService: SearchService;

    @autowired
    searchResultService: SearchResultService;

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