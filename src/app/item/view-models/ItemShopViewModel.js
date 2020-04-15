import { observable } from "snowball";
import { ViewModel, autowired } from "snowball/app";
import SearchService, { ORDER_BY } from "../../../shared/services/SearchService";

export default class ItemShopViewModel extends ViewModel {
    @observable
    products;

    @observable
    seller;

    @autowired
    _searchService: SearchService;

    async loadRecommends(excludeSpuIds = []) {
        if (!this.seller) {
            throw new Error('先设置`seller`!');
        }
        const res = await this._searchService.searchByConditions({
            ...this.params,
            orderBy: ORDER_BY.DEFAULT,
            sellerIds: [this.seller.id],
            pageIndex: 1,
            pageSize: 6 + excludeSpuIds.length
        });
        this.products = res.data.filter((item) => !excludeSpuIds.includes(item.id)).slice(0, 6);
    }
}