import { configuration } from "snowball/app";
import PageViewService from "../services/PageViewService";
import PageService from "../services/PageService";

@configuration
class MarketConfiguration {
    get pageService() {
        return new PageService();
    }

    get pageViewService() {
        return new PageViewService();
    }
}

export { MarketConfiguration };