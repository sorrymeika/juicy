import React from 'react';
import { SfsImage } from 'sn-app';
import Item from './Item';

export default function Store({ store, skus }) {
    return (
        <div className="od_store app-card">
            <div className="od_store_tit flex">
                <div className="od_store_info fx_1 flex">
                    <SfsImage src={store.logo} className="logo" />
                    <p className="name">{store.name}</p>
                </div>
            </div>
            {
                skus.map((sku) => {
                    return (
                        <Item sku={sku}></Item>
                    );
                })
            }
            <div className="od_store_orderinfo">
                <div className="od_orderinfo_bar flex" app-link="/invoice">
                    <div className="hd">发票</div>
                    <div className="bd fx_1 ta_r">本次不开具发票</div>
                    <div className="iconfont icon-arrow-right"></div>
                </div>
                {
                    !!store.discount && (
                        <div className="od_orderinfo_bar flex">
                            <div className="hd">店铺优惠</div>
                            <div className="bd fx_1 cl_999 ta_r">省5元:满90减5</div>
                            <div className="iconfont icon-arrow-right"></div>
                        </div>
                    )
                }
                <div className="od_orderinfo_bar flex">
                    <div className="hd">运费</div>
                    <div className="bd fx_1 cl_999 ta_r">{store.postFee ? '￥' + store.postFee : '包邮'}</div>
                </div>
                <div className="od_orderinfo_bar flex ai_fs">
                    <div className="hd">订单备注</div>
                    <textarea
                        className="bd fx_1 note"
                        placeholder="选填,请先和商家协商一致"
                    ></textarea>
                </div>
            </div>
            <div className="od_store_summary ta_r">
                <span className="num">共{store.total}件</span>
                <span className="tit">小计:</span>
                <span className="price">{store.amount + store.postFee}</span>
            </div>
        </div>
    );
}