import { controller, injectable } from "snowball/app";
import SearchInputService from "../services/SearchInputService";
import SearchInput from "../containers/SearchInput";

@controller(SearchInput)
class SearchInputController {
    @injectable searchInputService: SearchInputService;

    constructor() {
        this.searchInputService = new SearchInputService();
    }
}

export default SearchInputController;