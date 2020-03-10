import { controller, autowired } from "snowball/app";
import Market from "./Market";
import { PageConfiguration } from "../brick/configuration";
import PageViewModel from "../brick/view-models/PageViewModel";

@controller({
    component: Market,
    configuration: PageConfiguration
})
class MarketController {
    @autowired
    _pageViewModel: PageViewModel;

    constructor(props, context) {
        this.pageId = Number(props.location.params.id);
    }

    onInit() {
        this._pageViewModel.initWithId(this.pageId);
    }
}

export default MarketController;
