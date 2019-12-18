import { observable } from "snowball";
import { Service } from "snowball/app";
import SellerService from "../../../shared/services/SellerService";
import SearchService from "../../../shared/services/SearchService";
import { toast } from "snowball/widget";


export default class ShopSearchService extends Service {
    @observable products = [];
    @observable isNoMoreData = false;
    @observable loading = true;
    @observable listType = 'list';

    seller = null;
    @observable orderBy = 0;
    params = {};
    pageIndex = 1;
    pageSize = 20

    onSetSort = this.ctx.createEvent();
    onGotoItem = this.ctx.createEvent();
    onScrollToBottom = this.ctx.createEvent();
    onToggleListType = this.ctx.createEvent();

    constructor(
        sellerService: SellerService,
        searchService: SearchService
    ) {
        super();

        this.sellerService = sellerService;
        this.searchService = searchService;

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

    async loadProducts() {
        this.loading = true;

        let res;

        try {
            res = await this.searchService.searchByConditions({
                ...this.params,
                orderBy: this.orderBy,
                sellerIds: [this.seller.id],
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