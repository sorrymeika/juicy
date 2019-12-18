import React from "react";
import { inject } from "snowball/app";
import ShopSearchService from "../services/ShopSearchService";
import SearchResult from "../../search/components/SearchResult";

function ShopItemsSearch({
    results,
    listType,
    orderBy,
    loading,
    isNoMoreData,
    onScrollToBottom,
    onSetSort,
    onToggleListType,
    onGotoItem,
}) {
    return (
        <>
            <div className="shp_search_bar flex">
                <button
                    className={"sortType" + (orderBy == 0 ? ' curr' : '')}
                    onClick={() => onSetSort(0)}
                >综合</button>
                <button
                    className={"sortType" + (orderBy == 2 ? ' curr' : '')}
                    onClick={() => onSetSort(2)}
                >销量</button>
                <button
                    className={"sortType" + (orderBy == 5 ? ' curr' : '')}
                    onClick={() => onSetSort(5)}
                >新品</button>
                <button
                    className={"sortType" + (orderBy == 4 || orderBy == 3 ? ' curr' : '')}
                    onClick={() => onSetSort(orderBy == 3 ? 4 : 3)}
                >价格<i className={"app-icon-asc-desc " + (orderBy == 3 ? 'asc' : orderBy == 4 ? 'desc' : '')}></i></button>
                <div className="fx_1 ta_r">
                    <button onClick={onToggleListType} className={"sc_search_list_type iconfont " + (listType == 'list' ? 'icon-manage' : 'icon-list')}></button>
                </div>
            </div>
            <SearchResult
                results={results}
                listType={listType}
                loading={loading}
                isNoMoreData={isNoMoreData}
                onGotoItem={onGotoItem}
                onScrollToBottom={onScrollToBottom}
            />
        </>
    );
}

export default inject(({ shopSearchService }: { shopSearchService: ShopSearchService }) => {
    return shopSearchService
        ? {
            results: shopSearchService.products,
            loading: shopSearchService.loading,
            listType: shopSearchService.listType,
            orderBy: shopSearchService.orderBy,
            isNoMoreData: shopSearchService.isNoMoreData,
            onGotoItem: shopSearchService.onGotoItem.emit,
            onScrollToBottom: shopSearchService.onScrollToBottom.emit,
            onToggleListType: shopSearchService.onToggleListType.emit,
            onSetSort: shopSearchService.onSetSort.emit,
        }
        : null;
})(ShopItemsSearch);