import React from 'react';
import { MainScrollView, Header } from 'snowball/components';
import Pictures from '../components/Pictures';
import Money from '../components/Money';
import Title from '../components/Title';
import Coupon from '../components/Coupon';
import OnSale from '../components/OnSale';
import SpecSelect from '../components/SpecSelect';
import PostInfo from '../components/PostInfo';
import ServTags from '../components/ServTags';
import SpuProps from '../components/SpuProps';
import Comments from '../components/Comments';
import QA from '../components/QA';
import ShopInfo from '../components/ShopInfo';
import ShopRecommends from '../components/ShopRecommends';
import Detail from '../components/Detail';
import Footer from '../components/Footer';
import { inject } from 'snowball/app';

function Item({ headerVisible, scrollPos, mainScrollViewRef, onScroll, onScrollToComponent }) {
    return (
        <div>
            <Header
                className={"app-header-transparent it_header" + (headerVisible ? ' show' : '')}
                buttons={
                    <>
                        <button className="iconfont icon-share"></button>
                    </>
                }
            >
                <ul className="it_header_tabs flex">
                    <li
                        className={scrollPos == 'basic' ? " curr" : ''}
                        onClick={() => onScrollToComponent('basic')}
                    >商品</li>
                    <li
                        className={scrollPos == 'detail' ? " curr" : ''}
                        onClick={() => onScrollToComponent('detail')}
                    >详情</li>
                    <li
                        className={scrollPos == 'comment' ? " curr" : ''}
                        onClick={() => onScrollToComponent('comment')}
                    >评价</li>
                    <li className={"cursor cursor_" + scrollPos}></li>
                </ul>
            </Header>
            <Footer></Footer>
            <MainScrollView
                ref={mainScrollViewRef}
                className="it_main"
                onScroll={onScroll}
            >
                <Pictures></Pictures>
                <Money></Money>
                <Title></Title>
                <Coupon></Coupon>
                <OnSale></OnSale>
                <PostInfo></PostInfo>
                <ServTags></ServTags>
                <SpecSelect></SpecSelect>
                <SpuProps></SpuProps>
                <Comments></Comments>
                <QA></QA>
                <ShopInfo></ShopInfo>
                <ShopRecommends></ShopRecommends>
                <Detail></Detail>
            </MainScrollView>
        </div>
    );
}

export default inject(({ itemService }) => {
    return {
        scrollPos: itemService.scrollPos,
        headerVisible: itemService.headerVisible,
        onScroll: itemService.onScroll.emit,
        onScrollToComponent: itemService.onScrollToComponent.emit,
        mainScrollViewRef: itemService.mainScrollViewRef
    };
})(Item);