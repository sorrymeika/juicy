import { controller } from "snowball/app";
import Market from "./Market";
import PageViewController from "../brick/PageViewController";
import { PageConfiguration } from "../brick/PageConfiguration";

@controller({
    component: Market,
    configuration: PageConfiguration
})
class MarketController extends PageViewController {
    constructor(props, context) {
        super(props, context);

        this.pageId = Number(props.location.params.id);
    }

    onInit() {
        this.pageViewService.initWithId(this.pageId);
    }
}

export default MarketController;
