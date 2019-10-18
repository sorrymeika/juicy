import { Service } from "snowball/app";

export default class PageService extends Service {
    getPageByKeyName(keyName) {
        return this.ctx.server.market.post("/page/getPageByKeyName", {
            keyName
        });
    }

    getPageById(pageId) {
        return this.ctx.server.market.post("/page/getPageById", {
            pageId
        });
    }
}