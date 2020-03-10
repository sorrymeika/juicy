import React from "react";
import { Header } from "snowball/components";
import { inject, autowired } from "snowball/app";
import CartViewModel from "../view-models/CartViewModel";

function CartHeader({
    isInEditMode,
    onEdit,
    showBack = true
}) {
    return (
        <Header
            className="ca_header"
            back={showBack}
            buttons={
                <a
                    className="ca_header_edit"
                    href="javascript:;"
                    onClick={() => onEdit(isInEditMode)}
                >{isInEditMode ? '完成' : '编辑'}</a>
            }
        >
            <div className="ca_header_title">购物车</div>
        </Header>
    );
}

function mapServiceToProps() {
    const cartViewModel: CartViewModel = autowired('cartViewModel');

    return {
        isInEditMode: cartViewModel.isInEditMode,
        onEdit() {
            cartViewModel.toggleEditMode();
        }
    };
}

export default inject(mapServiceToProps)(CartHeader);