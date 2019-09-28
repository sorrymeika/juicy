import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import OrderAddress from '../components/OrderAddress';
import StoreList from '../components/StoreList';
import OrderInfo from '../components/OrderInfo';
import OrderFooter from '../components/OrderFooter';

export default function Order() {
    return (
        <div className="od_wrap">
            <Header className="od_header">
                <div className="od_header_title">确认订单</div>
            </Header>
            <OrderFooter></OrderFooter>
            <MainScrollView className="od_wrap">
                <OrderAddress></OrderAddress>
                <StoreList></StoreList>
                <OrderInfo></OrderInfo>
            </MainScrollView>
        </div>
    );
}