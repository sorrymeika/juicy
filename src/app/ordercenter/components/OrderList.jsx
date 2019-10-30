import React, { useEffect } from 'react';
import { inject } from 'snowball/app';
import { SfsImage } from 'sn-app';

function OrderList({ orderList, type, onInit }) {
    useEffect(() => {
        onInit && onInit(type);
    }, [type, onInit]);

    return (
        <>
            {
                orderList && orderList.map(({ orderInfo, sellerOrders }) => {
                    return (
                        <div
                            className="ol_orderlist_item"
                            app-link={"/orderinfo/" + orderInfo.id}
                        >
                            {
                                sellerOrders.map((sellerOrder, i) => {
                                    return (
                                        <div className={"ol_seller_order" + (i == sellerOrders.length - 1 ? '' : ' bd_b')}>
                                            <div className="ol_seller flex">
                                                <div
                                                    className="flex"
                                                    app-link={"/"}
                                                >
                                                    <SfsImage
                                                        src={sellerOrder.logo}
                                                        className="logo"
                                                    />
                                                    <span className="name">{sellerOrder.sellerName}</span>
                                                    <i className="iconfont icon-arrow-right"></i>
                                                </div>
                                                <div className="fx_1 ta_r status">{
                                                    sellerOrder.status == -1
                                                        ? <span className="cl_999">已取消</span>
                                                        : sellerOrder.status == 0
                                                            ? '待付款'
                                                            : sellerOrder.status == 4 || sellerOrder.status == -4
                                                                ? '已完成'
                                                                : '待收货'
                                                }</div>
                                            </div>
                                            <ul className="ol_seller_skus">
                                                {
                                                    sellerOrder.skus.map((sku) => {
                                                        const spec = [sku.skuPropVal0, sku.skuPropVal1, sku.skuPropVal2, sku.skuPropVal3, sku.skuPropVal4].filter(prop => !!prop).join('，');
                                                        return (
                                                            <li className="ol_seller_sku">
                                                                <div className="info dp_f">
                                                                    <SfsImage
                                                                        src={sku.picture}
                                                                        className="pic"
                                                                        size="180x180"
                                                                    />
                                                                    <div className="fx_1">
                                                                        <p className="title to_e2">{sku.title}</p>
                                                                        <p className="spec">{spec}</p>
                                                                    </div>
                                                                    <div className="ta_r">
                                                                        <p className="price">{sku.price}</p>
                                                                        <p className="num">x{sku.num}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    );
                                })
                            }
                            <div className="summary ta_r">
                                共{sellerOrders.reduce((total, item) => (total + item.total), 0)}件商品，合计: <span className="amount">{orderInfo.totalAmount + orderInfo.totalPostFee}</span>
                            </div>
                            <div className="ft ta_r bd_t">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >查看物流</button>
                                {
                                    orderInfo.status == 1 || orderInfo.status == 2 || orderInfo.status == 3
                                        ? <button
                                            className="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >确认收货</button>
                                        : orderInfo.status == 0
                                            ? <button
                                                className="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >去支付</button>
                                            : <button
                                                className="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >再次购买</button>
                                }
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default inject(({ orderListServiceFactory }) => {
    if (orderListServiceFactory) {
        const orderListService = orderListServiceFactory();

        return () => {
            return {
                orderList: orderListService.orderList,
                onInit: orderListService.onInit.emit,
            };
        };
    }
})(OrderList);