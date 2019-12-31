import { Service, autowired } from "snowball/app";

class ProductService extends Service {
    @autowired
    _tradeServer;

    getProductById(spuId) {
        return this._tradeServer.post('/product/getProductById', {
            id: spuId
        });
    }

    getDetailById(spuId) {
        return this._tradeServer.post('/product/getDetailById', {
            id: spuId
        });
    }

    getSpusByIds(spuIds) {
        return this._tradeServer.post('/product/getSpusByIds', {
            spuIds
        });
    }
}

export default ProductService;