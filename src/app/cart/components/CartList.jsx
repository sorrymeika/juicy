import React from "react";
import CartStore from "./CartStore";
import { inject } from "snowball/app";
import CartViewModel from "../view-models/CartViewModel";

function CartList({ sellers, onSelectSku, onSelectSeller, onCartNumChange }) {
    return (
        <div>
            {
                sellers && sellers.length
                    ? sellers.map((seller) => {
                        return (
                            <CartStore
                                seller={seller}
                                skus={seller.skus}
                                onSelectSku={onSelectSku}
                                onSelectSeller={onSelectSeller}
                                onCartNumChange={onCartNumChange}
                            />
                        );
                    })
                    : (
                        <div className="pd_m ta_c">暂无商品</div>
                    )
            }
        </div>
    );
}

function mapServiceToProps(cartViewModel: CartViewModel) {
    return {
        sellers: cartViewModel.sellers,
        onSelectSku(sku) {
            cartViewModel.selectItem(sku);
        },
        onSelectSeller(selected) {
            cartViewModel.selectSeller(selected);
        },
        onCartNumChange(item) {
            cartViewModel.changeCartNum(item);
        }
    };
}

export default inject(({ cartViewModel }) => {
    return mapServiceToProps(cartViewModel);
})(CartList);
