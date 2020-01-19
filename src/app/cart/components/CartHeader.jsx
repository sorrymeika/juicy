import React from "react";
import { Header } from "snowball/components";
import { inject, autowired } from "snowball/app";
import CartViewService from "../services/CartViewService";

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
    const cartViewService: CartViewService = autowired('cartViewService');

    return {
        isInEditMode: cartViewService.isInEditMode,
        onEdit() {
            cartViewService.toggleEditMode();
        }
    };
}

export default inject(mapServiceToProps)(CartHeader);