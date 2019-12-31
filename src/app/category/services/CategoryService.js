import { Service, autowired } from "snowball/app";

class CategoryService extends Service {
    @autowired
    _tradeServer;

    getCates(sellerId) {
        return this._tradeServer.post('/fdCategory/getCates', {
            sellerId
        });
    }

    getSubCatesTreeByPid(pid) {
        return this._tradeServer.post('/fdCategory/getSubCatesTreeByPid', {
            pid
        });
    }
}

export default CategoryService;