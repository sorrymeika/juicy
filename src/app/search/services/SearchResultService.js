import { observable } from "snowball";
import { Service } from "snowball/app";
import { ORDER_BY } from "../../../shared/services/SearchService";

export default class SearchResultService extends Service {
    @observable orderBy = ORDER_BY.DEFAULT;
    @observable isMoreSortOpened = false;
    onOpenMoreSort = this.ctx.createEvent();
    onHideMoreSort = this.ctx.createEvent();
    onSetSort = this.ctx.createEvent();

    @observable listType = 'list';
    onToggleListType = this.ctx.createEvent();

    @observable results = [];
    @observable isNoMoreData = false;
    @observable loading = true;

    params = {};
    pageIndex = 1;
    pageSize = 20;

    onScrollToBottom = this.ctx.createEvent();
    onGoToSearch = this.ctx.createEvent();
    onGotoItem = this.ctx.createEvent();

    constructor(searchService) {
        super();

        this.searchService = searchService;
        this._registerListener();
    }

    _registerListener() {
        this.onOpenMoreSort(() => {
            if (this.orderBy == ORDER_BY.DEFAULT || this.orderBy == ORDER_BY.COMMENTS_NUM_DESC || this.orderBy == ORDER_BY.CREATE_DT_DESC) {
                this.isMoreSortOpened = true;
            } else {
                this.orderBy = ORDER_BY.DEFAULT;
            }
        });

        this.onHideMoreSort(() => {
            this.isMoreSortOpened = false;
        });

        this.onSetSort((orderBy) => {
            if (this.isMoreSortOpened) {
                this.isMoreSortOpened = false;
            }
            this.orderBy = orderBy;
            this.search(this.params);
        });

        this.onToggleListType(() => {
            this.listType = this.listType === 'list' ? 'card' : 'list';
        });

        this.onScrollToBottom(() => this.loadNextPage());

        this.onGoToSearch(() => {
            this.ctx.navigation.forward('/searchInput', false);
        });

        this.onGotoItem((item) => {
            this.ctx.navigation.forward('/item/' + item.id);
        });

        this.ctx.on('search', (e) => {
            this.search(e.data);
        });
    }

    async search(params = {}, pageIndex = 1, pageSize = 20) {
        this.params = params;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;

        this._load((res) => {
            this.results = res.data;
        });
    }

    async loadNextPage() {
        if (this.isNoMoreData || this.loading) {
            return;
        }
        this.pageIndex++;

        this._load((res) => {
            this.results.withMutations((results) => {
                results.add(res.data);
            });
        });
    }

    async _load(processData) {
        this.loading = true;

        const res = this.params.formulaId
            ? await this.searchService.searchByFormula(Number(this.params.formulaId), this.pageIndex, this.pageSize)
            : await this.searchService.searchByConditions({
                ...this.params,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                orderBy: this.orderBy
            });
        processData && processData.call(this, res);

        this.isNoMoreData = res.data.length < this.pageSize;
        this.loading = false;
    }
}