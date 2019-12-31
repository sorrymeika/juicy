import React from 'react';
import { MainScrollView } from 'snowball/components';
import { Pictures } from '../../../shared/components';
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
import ItemHeader from '../components/ItemHeader';

function Item({ mainScrollViewRef, onScroll }) {
    return (
        <div>
            <ItemHeader />
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
        mainScrollViewRef: itemService.mainScrollViewRef,
        onScroll: itemService.onScroll,
    };
})(Item);