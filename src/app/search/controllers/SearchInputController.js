import { controller } from "snowball/app";
import SearchInputService from "../services/SearchInputService";
import SearchInput from "../containers/SearchInput";

@controller(SearchInput)
class SearchInputController {
    searchInputService: SearchInputService;

    constructor() {
        this.searchInputService = new SearchInputService();
    }
}

export default SearchInputController;