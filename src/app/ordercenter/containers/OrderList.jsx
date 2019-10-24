import React from 'react';
import { Header, ScrollView, Tab } from 'snowball/components';
import { inject } from 'snowball/app';

function OrderList({ orderList }) {
    console.log(orderList);

    const tabs = [{
        title: '全部',
        content: (
            <ScrollView>
            </ScrollView>
        )
    }, {
        title: '待付款',
        content: (
            <ScrollView>
            </ScrollView>
        )
    }, {
        title: '待收货',
        content: (
            <ScrollView>
            </ScrollView>
        )
    }, {
        title: '已完成',
        content: (
            <ScrollView>
            </ScrollView>
        )
    }, {
        title: '已取消',
        content: (
            <ScrollView>
            </ScrollView>
        )
    }];

    return (
        <>
            <Header
                title="订单列表"
            ></Header>
            <Tab
                className="ol_tabs app-main"
                items={tabs}
            ></Tab>
        </>
    );
}

export default inject(({ orderListService }) => (
    orderListService
        ? {
            orderList: orderListService.orderList,
            total: orderListService.total,
        }
        : null
))(OrderList);