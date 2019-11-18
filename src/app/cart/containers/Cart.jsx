import React from "react";
import CartHeader from "../components/CartHeader";
import CartFooter from "../components/CartFooter";
import { MainScrollView } from "snowball/components";
import CartList from "../components/CartList";
import FixedStore from "../components/FixedStore";

export default function Cart({ visible = true, showBack }) {
    return (
        <div className="ca_wrap" style={{ display: visible ? 'block' : 'none' }}>
            <CartHeader showBack={showBack}></CartHeader>
            <CartFooter></CartFooter>
            <FixedStore></FixedStore>
            <MainScrollView className="ca_main">
                <CartList></CartList>
            </MainScrollView>
        </div>
    );
}