import { Service } from "snowball/app";

export default class PageService extends Service {
    getPageByKeyName(keyName) {
        return this.ctx.server.market.post("/page/getPageByKeyName", {
            keyName
        });
    }
}