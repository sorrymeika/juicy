import React from 'react';
import { MainScrollView, LoadingStatusBar } from 'snowball/components';
import { SfsImage } from 'sn-app';

export default function SearchResult({
    className,
    results,
    listType,
    loading,
    isNoMoreData,
    onGotoItem,
    onScrollToBottom
}) {

    return (
        <MainScrollView
            className={"sc_search_result" + (className ? ' ' + className : '')}
            onScrollToBottom={onScrollToBottom}
        >
            <ul className={"clearfix " + (listType == 'list' ? 'sc_search_result_list' : 'sc_search_result_card')}>
                {
                    results && results.map((item) => {
                        return (
                            <li
                                className="sc_search_result_item"
                                onClick={() => onGotoItem(item)}
                            >
                                <SfsImage
                                    className="img"
                                    src={item.pictures.split(',')[0]}
                                    size="240x240"
                                />
                                <div className="con fx_1">
                                    <p className="name to_e2">{item.title}</p>
                                    <p className="price">
                                        <span>{item.minPrice}</span>
                                        {
                                            item.minPrice < item.maxPrice && (
                                                <>
                                                    <em>~</em>
                                                    <span>{item.maxPrice}</span>
                                                </>
                                            )
                                        }</p>
                                    <p className="comment"> {!!item.sales && `${item.sales}人付款 `} {!!item.comments && `${item.comments}人评论`}</p>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            {
                !isNoMoreData && (
                    <LoadingStatusBar>{loading ? '正在加载...' : '上拉加载更多'}</LoadingStatusBar>
                )
            }
        </MainScrollView>
    );
}
