import { Service } from "snowball/app";

class CategoryDataService extends Service {
    getCates(sellerId) {
        return this.app.server.trade.post('/fdCategory/getCates', {
            sellerId
        });
    }

    getSubCatesTreeByPid(pid) {
        return this.app.server.trade.post('/fdCategory/getSubCatesTreeByPid', {
            pid
        });
    }
}

export default CategoryDataService;