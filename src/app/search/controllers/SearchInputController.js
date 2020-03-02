import { controller } from "snowball/app";
import SearchInput from "../containers/SearchInput";
import { SearchConfiguration } from "../configuration";

@controller({
    component: SearchInput,
    configuration: SearchConfiguration
})
class SearchInputController {
}

export default SearchInputController;