import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import { inject } from 'snowball/app';
import OrderAddress from './components/OrderAddress';
import SellerOrderListItem from './components/SellerOrderListItem';
import { util } from 'snowball';
import OrderInfoFooter from './components/OrderInfoFooter';


function OrderInfo({ orderStatus, orderInfo }) {
    const {
        waitingForPay,
        isCanceled,
        isComplete
    } = orderStatus;

    return (
        <div className="oi_wrap">
            <Header
                title="订单详情"
            >
            </Header>
            <OrderInfoFooter
                orderStatus={orderStatus}
                orderInfo={orderInfo}
            ></OrderInfoFooter>
            <MainScrollView>
                <div className="oi_status">
                    <div className="oi_status_name">{
                        waitingForPay
                            ? "待付款"
                            : isCanceled
                                ? "已取消"
                                : isComplete
                                    ? "已完成"
                                    : "待收货"
                    }</div>
                </div>
                <OrderAddress></OrderAddress>
                <div className="oi_store_list">
                    <SellerOrderListItem
                        orderStatus={orderStatus}
                        seller={orderInfo}
                        skus={orderInfo.skus}
                    />
                </div>
                <div className="oi_orderinfo">
                    <div className="oi_orderinfo_group">
                        <div className="oi_orderinfo_item">
                            <b>订单编号：</b>
                            <span>{orderInfo.code}</span>
                        </div>
                        <div className="oi_orderinfo_item">
                            <b>下单时间：</b>
                            <span>{orderInfo.addDt && util.formatDate(new Date(orderInfo.addDt), 'yyyy-MM-dd HH:mm:ss')}</span>
                        </div>
                        {
                            !!orderInfo.payDt && (
                                <div className="oi_orderinfo_item">
                                    <b>付款时间：</b>
                                    <span>{orderInfo.payDt}</span>
                                </div>
                            )
                        }
                        {
                            !!orderInfo.deliverDt && (
                                <div className="oi_orderinfo_item">
                                    <b>发货时间：</b>
                                    <span>{orderInfo.deliverDt}</span>
                                </div>
                            )
                        }
                        {
                            !!orderInfo.dealDt && (
                                <div className="oi_orderinfo_item">
                                    <b>成交时间：</b>
                                    <span>{orderInfo.dealDt}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="oi_orderinfo">
                    <div className="oi_orderinfo_item flex">
                        <b>商品总额</b>
                        <div className="fx_1 ta_r"><span className="price">{orderInfo.amount}</span></div>
                    </div>
                    <div className="oi_orderinfo_item flex">
                        <b>总运费</b>
                        <div className="fx_1 ta_r">+ <span className="price">{orderInfo.postFee}</span></div>
                    </div>
                    <div className="oi_total_pay bd_t flex">
                        <div className="oi_total_pay_hd">{orderInfo.payStatus == 0 ? '需付款' : '实付款'}</div>
                        <div className="oi_total_pay_bd fx_1 ta_r"><span className="price">{orderInfo.amount + orderInfo.postFee}</span></div>
                    </div>
                </div>
            </MainScrollView>
        </div>
    );
}

export default inject(({ orderInfoService }) => (
    orderInfoService
        ? {
            orderStatus: orderInfoService.orderStatus,
            orderInfo: orderInfoService.orderInfo,
            sellerOrders: orderInfoService.sellerOrders,
        }
        : null
))(OrderInfo);