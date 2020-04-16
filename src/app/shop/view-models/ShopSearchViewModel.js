import { observable } from "snowball";
import { ViewModel, autowired, emitter } from "snowball/app";
import ShopSearchService from "../services/ShopSearchService";

export default class ShopSearchViewModel extends ViewModel {
    @observable
    listType = 'list';

    @autowired
    _shopSearchService: ShopSearchService;

    get products() {
        return this._shopSearchService.products;
    }

    get isNoMoreData() {
        return this._shopSearchService.isNoMoreData;
    }

    get loading() {
        return this._shopSearchService.loading;
    }

    get orderBy() {
        return this._shopSearchService.orderBy;
    }

    get pageIndex() {
        return this._shopSearchService.pageIndex;
    }

    get pageSize() {
        return this._shopSearchService.pageSize;
    }

    @emitter
    onSetSort(orderBy) {
        this._shopSearchService.sort(orderBy);
    }

    @emitter
    onToggleListType() {
        this.listType = this.listType === 'list' ? 'card' : 'list';
    }

    @emitter
    onGotoItem(item) {
        this.ctx.navigation.forward('/item/' + item.id);
    }

    @emitter
    onScrollToBottom() {
        this._shopSearchService.loadNextPage();
    }

    setSellerId(sellerId) {
        this._shopSearchService.setSellerId(sellerId);
    }
}