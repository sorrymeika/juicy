import React, { useState } from 'react';

import { MainScrollView, Header, Tab } from "snowball/components";
import { renderBricks } from "../../brick";
import ShopItemsSearch from '../components/ShopItemsSearch';
import { inject } from 'snowball/app';
import ShopService from '../services/ShopService';
import { SfsImage } from 'sn-app';

function Shop({
    ctx,
    tabIndex,
    pageData,
    bricks,
    seller,
    onGoToSearch,
    onTabChange
}) {
    const [showInfo, setShowInfo] = useState(true);

    return (
        <div>
            <Header
                className="shp_header"
            >
                <div className="flex w_1x">
                    <div
                        className="app-search-form fx_1 flex"
                        onClick={onGoToSearch}
                    >
                        <i className="iconfont icon-search"></i>
                    </div>
                    <button className="shp_header_more iconfont icon-more"></button>
                </div>
            </Header>
            <div
                className="shp_main app-main t_3"
                style={
                    showInfo
                        ? {
                            WebkitTransform: 'translate(0%,0)'
                        }
                        : {
                            WebkitTransform: 'translate(0%,-70px)'
                        }
                }
                onScrollCapture={(e) => {
                    if (e.target.scrollTop <= 0) {
                        if (!showInfo) {
                            setShowInfo(true);
                        }
                    } else if (showInfo) {
                        setShowInfo(false);
                    }
                }}
            >
                <div
                    className="shp_shopinfo_wrap"
                    style={{ backgroundImage: 'url(https://dummyimage.com/750x360)' }}
                >
                    <div className="shp_shopinfo">
                        <div
                            className="flex h_1x t_3"
                            style={
                                showInfo
                                    ? {
                                        opacity: 1
                                    }
                                    : {
                                        opacity: 0
                                    }
                            }
                        >
                            <SfsImage className="img" src={seller.logo} />
                            <div className="info">
                                <p className="name">{seller.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Tab
                    index={tabIndex}
                    className="shp_tabs"
                    onTabChange={onTabChange}
                    headerStyle={{
                        width: '45%'
                    }}
                >
                    <Tab.Pane
                        title="首页"
                    >
                        <MainScrollView>
                            {renderBricks(pageData, bricks, ctx)}
                        </MainScrollView>
                    </Tab.Pane>
                    <Tab.Pane
                        title="商品"
                    >
                        <ShopItemsSearch />
                    </Tab.Pane>
                    <Tab.Pane
                        title="分类"
                    ></Tab.Pane>
                </Tab>
            </div>
        </div>
    );
}

export default inject(({ ctx, shopService }: { shopService: ShopService }) => {
    return {
        seller: shopService.seller,
        tabIndex: shopService.tabIndex,
        onTabChange: shopService.onTabChange.emit,
        ctx
    };
})(Shop);