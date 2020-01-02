import { Service, autowired } from "snowball/app";

export default class PageService extends Service {
    @autowired
    _marketServer;

    getPageByKeyName(keyName) {
        return this._marketServer.post("/page/getPageByKeyName", {
            keyName
        });
    }

    getPageById(pageId) {
        return this._marketServer.post("/page/getPageById", {
            pageId
        });
    }

    getPageBySellerId(sellerId) {
        return this._marketServer.post("/page/getPageBySellerId", {
            sellerId
        });
    }
}