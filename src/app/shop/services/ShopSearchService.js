import { observable } from "snowball";
import { Service, autowired, param } from "snowball/app";
import SellerService from "../../../shared/services/SellerService";
import SearchService from "../../../shared/services/SearchService";
import { toast } from "snowball/widget";


export default class ShopSearchService extends Service {
    @observable products = [];
    @observable isNoMoreData = false;
    @observable loading = true;
    @observable listType = 'list';

    @observable orderBy = 0;
    params = {};
    pageIndex = 1;
    pageSize = 20

    onSetSort = this.ctx.createEmitter();
    onGotoItem = this.ctx.createEmitter();
    onScrollToBottom = this.ctx.createEmitter();
    onToggleListType = this.ctx.createEmitter();

    @autowired
    sellerService: SellerService;

    @autowired
    searchService: SearchService;

    constructor() {
        super();

        this.onSetSort((orderBy) => {
            this.orderBy = orderBy;
            this.pageIndex = 1;
            this.loadProducts();
        });

        this.onToggleListType(() => {
            this.listType = this.listType === 'list' ? 'card' : 'list';
        });

        this.onGotoItem((item) => {
            this.ctx.navigation.forward('/item/' + item.id);
        });

        this.onScrollToBottom(() => this.loadNextPage());
    }

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
            res = await this.searchService.searchByConditions({
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
            this.products.withMutations((productList) => {
                productList.add(res.data);
            });
        }

        this.isNoMoreData = res.data.length < this.pageSize;
        this.loading = false;
    }
}