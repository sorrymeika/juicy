import { configuration } from "snowball/app";
import SearchInputService from "./services/SearchInputService";
import SearchResultService from "./services/SearchResultService";

export const SearchConfiguration = configuration({
    modules: {
        searchInputService: SearchInputService,
        searchResultService: SearchResultService
    }
});