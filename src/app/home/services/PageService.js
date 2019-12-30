import { Service } from "snowball/app";

export default class PageService extends Service {
    getPageByKeyName(keyName) {
        return this.app.server.market.post("/page/getPageByKeyName", {
            keyName
        });
    }

    getPageById(pageId) {
        return this.app.server.market.post("/page/getPageById", {
            pageId
        });
    }

    getPageBySellerId(sellerId) {
        return this.app.server.market.post("/page/getPageBySellerId", {
            sellerId
        });
    }
}