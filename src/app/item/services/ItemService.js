import { Service } from "snowball/app";
import { observable } from "snowball";

export default class ItemService extends Service {
    @observable item = {};
    @observable seller = {};
    @observable skus = [];
    @observable buyNum = 1;
    @observable currentSku = {};

    constructor(productService) {
        super();

        this.productService = productService;
    }

    async init(spuId) {
        const { data } = await this.productService.getProductById(spuId);
        this.item = data.item;
        this.seller = data.seller;
        this.skus = data.skus;
        this.currentSku = data.skus[0];
    }
}