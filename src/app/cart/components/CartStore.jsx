import React from "react";
import { CheckBox, SfsImage } from "sn-app";
import CartItem from "./CartItem";
import { inject } from "snowball/app";

function CartStore({
    seller,
    skus,
    onSelectSeller,
    onSelectSku,
    onCartNumChange
}) {
    return (
        <div className="ca_store">
            <div className="ca_store_tit flex">
                <CheckBox
                    checked={skus.every(sku => !!sku.selected)}
                    onClick={() => onSelectSeller(seller.id)}
                ></CheckBox>
                <div className="ca_store_info fx_1 flex">
                    <SfsImage src={seller.logo} className="logo" />
                    <p className="name">{seller.name}</p>
                    <i className="iconfont icon-arrow-right"></i>
                </div>
            </div>
            {
                skus.map((sku) => {
                    return (
                        <CartItem
                            key={sku.id}
                            sku={sku}
                            onSelectSku={onSelectSku}
                            onCartNumChange={onCartNumChange}
                        ></CartItem>
                    );
                })
            }
        </div>
    );
}

export default inject(({ cartListService }) => (
    cartListService
        ? {
            onSelectSku: cartListService.onSelectSku.emit,
            onSelectSeller: cartListService.onSelectSeller.emit,
            onCartNumChange: cartListService.onCartNumChange.emit
        }
        : null
))(CartStore);