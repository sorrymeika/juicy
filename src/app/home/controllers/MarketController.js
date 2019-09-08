import { controller } from "snowball/app";
import Market from "../containers/Market";
import PageViewController from "./PageViewController";

@controller(Market)
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
