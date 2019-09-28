import React from 'react';
import Item from './Item';

export default function Store({ store, skus }) {
    skus = [{
        title: '啥啥商品',
        spec: '规格',
        picture: '',
        num: 1,
        price: 10
    }, {
        title: '啥啥商品啥啥商品啥啥商品啥啥商品啥啥商品',
        spec: '规格啥啥商品啥啥商品',
        picture: '',
        num: 1,
        price: 1000.10
    }];

    return (
        <div className="od_store app-card">
            <div className="od_store_tit flex">
                <div className="od_store_info fx_1 flex">
                    <img src="" alt="" className="logo" />
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
                <div className="od_orderinfo_bar flex">
                    <div className="hd">店铺优惠</div>
                    <div className="bd fx_1 cl_999 ta_r">省5元:满90减5</div>
                    <div className="iconfont icon-arrow-right"></div>
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
                <span className="num">共1件</span>
                <span className="tit">小计:</span>
                <span className="price">39.00</span>
            </div>
        </div>
    );
}