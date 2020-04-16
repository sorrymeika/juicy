import { observable, asObservable } from "snowball";
import { Service, autowired } from "snowball/app";
import { toast } from "snowball/widget";
import SearchService from "../../../shared/services/SearchService";

export default class ShopSearchService extends Service {
    @observable
    products = [];

    @observable
    isNoMoreData = false;

    @observable
    loading = true;

    @observable
    orderBy = 0;

    params = {};
    pageIndex = 1;
    pageSize = 20

    @autowired
    _searchService: SearchService;

    setSellerId(sellerId) {
        this.sellerId = sellerId;
    }

    search({ keywords } = {}) {
        this.pageIndex = 1;
        this.params = {
            keywords,
        };
        this.loadProducts();
    }

    loadNextPage() {
        if (this.isNoMoreData || this.loading) {
            return;
        }

        this.pageIndex++;
        this.loadProducts();
    }

    sort(orderBy) {
        this.orderBy = orderBy;
        this.pageIndex = 1;
        this.loadProducts();
    }

    async loadProducts() {
        this.loading = true;

        let res;

        try {
            res = await this._searchService.searchByConditions({
                ...this.params,
                orderBy: this.orderBy,
                sellerIds: [this.sellerId],
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            });
        } catch (e) {
            toast.showToast(e.message);
            this.loading = false;
            return;
        }

        if (this.pageIndex == 1) {
            this.products = res.data;
        } else {
            asObservable(this.products).add(res.data);
        }

        this.isNoMoreData = res.data.length < this.pageSize;
        this.loading = false;
    }
}