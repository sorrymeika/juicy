import React from 'react';
import { Header, Tab } from 'snowball/components';
import OrderList from '../components/OrderList';

export default function OrderListPage({ orderList }) {
    const tabs = [{
        title: '全部',
        type: 0,
    }, {
        title: '待付款',
        type: 1,
    }, {
        title: '待收货',
        type: 2,
    }, {
        title: '已完成',
        type: 3
    }, {
        title: '已取消',
        type: 4
    }];

    return (
        <>
            <Header
                title="订单列表"
                className="ol_header"
            ></Header>
            <Tab
                className="ol_tabs app-main"
            >
                {
                    tabs.map(({ title, type }) => {
                        return (
                            <Tab.Pane
                                key={type}
                                title={title}
                                className="ol_orderlist"
                            >
                                <OrderList
                                    type={type}
                                ></OrderList>
                            </Tab.Pane>
                        );
                    })
                }
            </Tab>
        </>
    );
}