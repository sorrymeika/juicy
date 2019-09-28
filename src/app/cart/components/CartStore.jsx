import React from "react";
import { CheckBox } from "sn-app";
import CartItem from "./CartItem";

export default function CartStore({ store, skus }) {
    skus = [{
        title: '啥啥商品',
        spec: '规格',
        picture: '',
        num: 1,
        price: 10
    },{
        title: '啥啥商品啥啥商品啥啥商品啥啥商品啥啥商品',
        spec: '规格啥啥商品啥啥商品',
        picture: '',
        num: 1,
        price: 1000.10
    }];

    return (
        <div className="ca_store">
            <div className="ca_store_tit flex">
                <CheckBox></CheckBox>
                <div className="ca_store_info fx_1 flex">
                    <img src="" alt="" className="logo" />
                    <p className="name">{store.name}</p>
                    <i className="iconfont icon-arrow-right"></i>
                </div>
            </div>
            {
                skus.map((sku) => {
                    return (
                        <CartItem sku={sku}></CartItem>
                    );
                })
            }
        </div>
    );
}