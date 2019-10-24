import React from 'react';
import { SfsImage } from 'sn-app';
import Item from './Item';

export default function SellerOrder({ orderStatus, seller, skus, onNoteChange }) {

    return (
        <div className="oi_store">
            <div className="oi_store_tit flex">
                <div className="oi_store_info fx_1 flex">
                    <SfsImage src={seller.logo} className="logo" />
                    <p className="name">{seller.sellerName}</p>
                </div>
                <i className="iconfont icon-arrow-right"></i>
            </div>
            {
                skus.map((sku) => {
                    let buttons = null;

                    if (!orderStatus.waitingForPay) {
                        if (sku.status == 1 || sku.status == 2 || sku.status == 3) {
                            // 未确认收货的商品可退换
                            buttons = (
                                <>
                                    <button>退换</button>
                                    <button>加购物车</button>
                                </>
                            );
                        } else if (sku.status == 4) {
                            // 已确认收货的商品可申请售后，确认收货超过15天商品不可退换货
                            buttons = (
                                <>
                                    <button>申请售后</button>
                                    <button>加购物车</button>
                                </>
                            );
                        } else {
                            buttons = (
                                <>
                                    <button>再次购买</button>
                                    <button>加购物车</button>
                                </>
                            );
                        }
                    }

                    return (
                        <Item sku={sku} buttons={buttons}></Item>
                    );
                })
            }
            <div className="oi_store_orderinfo">
                {
                    !seller.invoiceTitle
                        ? null
                        : (
                            <div className="oi_orderinfo_bar flex">
                                <div className="hd">发票</div>
                                <div className="bd fx_1 ta_r to_e">{
                                    [
                                        seller.invoiceType == 1 ? '纸质发票' : '电子发票',
                                        seller.invoiceTitleType == 1 ? '个人' : '公司',
                                        seller.invoiceTitle,
                                        seller.invoiceTaxCode,
                                    ].filter(name => !!name).join('，')
                                }</div>
                            </div>
                        )
                }
                {
                    !!seller.discount && (
                        <div className="oi_orderinfo_bar flex">
                            <div className="hd">店铺优惠</div>
                            <div className="bd fx_1 cl_999 ta_r">省5元:满90减5</div>
                            <div className="iconfont icon-arrow-right"></div>
                        </div>
                    )
                }
                <div className="oi_orderinfo_bar flex">
                    <div className="hd">运费</div>
                    <div className="bd fx_1 cl_999 ta_r">{seller.postFee ? '￥' + seller.postFee : '包邮'}</div>
                </div>
                <div className="oi_orderinfo_bar flex ai_fs">
                    <div className="hd">订单备注</div>
                    <div className="note">{seller.note}</div>
                </div>
                <div className="oi_service bd_t">
                    <button className="oi_service_btn">
                        <i className="iconfont icon-customerservice"></i>
                        联系客服
                    </button>
                </div>
            </div>
        </div>
    );
}