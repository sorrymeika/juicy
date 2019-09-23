import { Service } from "snowball/app";

class ProductService extends Service {
    getProductById(spuId) {
        return this.ctx.server.trade.post('/product/getProductById', {
            id: spuId
        });
    }

    getDetailById(spuId) {
        return this.ctx.server.trade.post('/product/getDetailById', {
            id: spuId
        });
    }

    getSpusByIds(spuIds) {
        return this.ctx.server.trade.post('/product/getSpusByIds', {
            spuIds
        });
    }

    search(params) {
        return this.ctx.server.trade.post('/product/listSpu', params);
    }
}

export default ProductService;