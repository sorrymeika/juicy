import React from 'react';
import { Header } from 'snowball/components';
import SearchResult from '../components/SearchResult';
import { inject } from 'snowball/app';

function Search({
    isMoreSortOpened,
    orderBy,
    onSetSort,
    onOpenMoreSort,
    onHideMoreSort,

    listType,
    onToggleListType,

    results,
    loading,
    isNoMoreData,
    onScrollToBottom,

    onGoToSearch,
    onGotoItem,
}) {
    return (
        <>
            <div className="sc_search_result_wrap">
                <Header
                    className="sc_search_result_header"
                >
                    <div className="flex w_1x">
                        <div
                            className="sc_search_form fx_1 flex"
                            onClick={onGoToSearch}
                        >
                            <i className="iconfont icon-search"></i>
                        </div>
                        <button onClick={onToggleListType} className={"sc_search_list_type iconfont " + (listType == 'list' ? 'icon-manage' : 'icon-list')}></button>
                    </div>
                </Header>
                <div className="sc_search_bar">
                    <ul className="flex h_1x">
                        <li
                            className={"sort fx_1" + (orderBy == 0 || orderBy == 5 || orderBy == 6 ? ' curr' : '')}
                            onClick={() => onOpenMoreSort()}
                        >{orderBy == 5 ? '新品' : orderBy == 6 ? '评论数' : '综合'}<i className={"more " + (isMoreSortOpened ? ' open' : '')}></i></li>
                        <li
                            className={"sort fx_1 ta_c" + (orderBy == 1 || orderBy == 2 ? ' curr' : '')}
                            onClick={() => onSetSort(orderBy == 2 ? 1 : 2)}
                        >销量<i className={"asc_desc " + (orderBy == 1 ? 'asc' : orderBy == 2 ? 'desc' : '')}></i></li>
                        <li
                            className={"sort fx_1 ta_c" + (orderBy == 3 || orderBy == 4 ? ' curr' : '')}
                            onClick={() => onSetSort(orderBy == 4 ? 3 : 4)}
                        >价格<i className={"asc_desc " + (orderBy == 3 ? 'asc' : orderBy == 4 ? 'desc' : '')}></i></li>
                        <li className={"sort fx_1 ta_r"}>筛选</li>
                    </ul>
                </div>
                <SearchResult
                    results={results}
                    listType={listType}
                    loading={loading}
                    isNoMoreData={isNoMoreData}
                    onGotoItem={onGotoItem}
                    onScrollToBottom={onScrollToBottom}
                />
            </div>
            <div
                className="sc_sort_wrap"
                style={{ display: isMoreSortOpened ? 'block' : 'none' }}
                onClick={(e) => {
                    if (e.target.classList.contains('sc_sort') || e.target.classList.contains('sc_sort_wrap')) {
                        onHideMoreSort();
                    }
                }}
            >
                <div className="sc_sort">
                    <div className="sc_sort_con bd_t">
                        <div
                            className={"sc_sort_item" + (orderBy == 0 ? ' curr' : '')}
                            onClick={() => onSetSort(0)}
                        >综合排序</div>
                        <div
                            className={"sc_sort_item" + (orderBy == 5 ? ' curr' : '')}
                            onClick={() => onSetSort(5)}
                        >新品优先</div>
                        <div
                            className={"sc_sort_item" + (orderBy == 6 ? ' curr' : '')}
                            onClick={() => onSetSort(6)}
                        >评论数从高到低</div>
                    </div>
                </div>
            </div>
            <div className="sc_search_drawer" style={{ display: 'none' }}>
                <div>价格区间</div>
                <div>
                    <input />
                    <span>-</span>
                    <input />
                </div>
                <div className="sc_filter_by">
                    <div className="flex">
                        <div className="fx_1">全部分类</div>
                        <button>全部</button>
                    </div>
                    <ul>
                        <li>some cate</li>
                    </ul>
                </div>
                <div className="sc_filter_by">
                    <div>品牌</div>
                    <ul>
                        <li>some brand</li>
                    </ul>
                </div>
                <div className="sc_filter_by">
                    <div>类目属性列表</div>
                    <ul>
                        <li>same...</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default inject(({ searchResultService }) => {

    return {
        orderBy: searchResultService.orderBy,
        isMoreSortOpened: searchResultService.isMoreSortOpened,
        onOpenMoreSort: searchResultService.onOpenMoreSort.emit,
        onHideMoreSort: searchResultService.onHideMoreSort.emit,
        onSetSort: searchResultService.onSetSort.emit,

        listType: searchResultService.listType,
        onToggleListType: searchResultService.onToggleListType.emit,

        loading: searchResultService.loading,
        isNoMoreData: searchResultService.isNoMoreData,
        results: searchResultService.results,
        onScrollToBottom: searchResultService.onScrollToBottom.emit,

        onGoToSearch: searchResultService.onGoToSearch.emit,
        onGotoItem: searchResultService.onGotoItem.emit
    };
})(Search);