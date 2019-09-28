import React from "react";
import CartHeader from "../components/CartHeader";
import CartFooter from "../components/CartFooter";
import { MainScrollView } from "snowball/components";
import CartList from "../components/CartList";

export default function Cart({ onButtonClick }) {
    return (
        <div className="ca_wrap">
            <CartHeader></CartHeader>
            <CartFooter></CartFooter>
            <div className="ca_fixed bd_b dp_n">
                <div className="ca_store_tit flex">
                    <div className="ca_store_info fx_1 flex">
                        <img src="" alt="" className="logo" />
                        <p className="name">xxxx</p>
                        <i className="iconfont icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <MainScrollView className="ca_main">
                <CartList></CartList>
            </MainScrollView>
        </div>
    );
}