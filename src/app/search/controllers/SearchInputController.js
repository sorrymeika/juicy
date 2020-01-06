import { controller, autowired } from "snowball/app";
import SearchInputService from "../services/SearchInputService";
import SearchInput from "../containers/SearchInput";
import { SearchConfiguration } from "../configuration";

@controller({
    component: SearchInput,
    configuration: SearchConfiguration
})
class SearchInputController {
    @autowired
    searchInputService: SearchInputService;
}

export default SearchInputController;