import { Service } from "snowball/app";

class ProductService extends Service {
    getProductById(spuId) {
        return this.app.server.trade.post('/product/getProductById', {
            id: spuId
        });
    }

    getDetailById(spuId) {
        return this.app.server.trade.post('/product/getDetailById', {
            id: spuId
        });
    }

    getSpusByIds(spuIds) {
        return this.app.server.trade.post('/product/getSpusByIds', {
            spuIds
        });
    }
}

export default ProductService;