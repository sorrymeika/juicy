import React from "react";
import CartStore from "./CartStore";
import { inject } from "snowball/app";
import CartViewService from "../services/CartViewService";

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

function mapServiceToProps(cartViewService: CartViewService) {
    return {
        sellers: cartViewService.sellers,
        onSelectSku(sku) {
            cartViewService.selectItem(sku);
        },
        onSelectSeller(selected) {
            cartViewService.selectSeller(selected);
        },
        onCartNumChange(item) {
            cartViewService.changeCartNum(item);
        }
    };
}

export default inject(({ cartViewService }) => {
    return mapServiceToProps(cartViewService);
})(CartList);
