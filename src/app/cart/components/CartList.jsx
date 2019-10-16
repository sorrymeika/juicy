import React from "react";
import CartStore from "./CartStore";
import { inject } from "snowball/app";

function CartList({ sellers }) {

    return (
        <div>
            {
                sellers.map((seller) => {
                    return (
                        <CartStore seller={seller} skus={seller.skus}></CartStore>
                    );
                })
            }
        </div>
    );
}

export default inject(({ cartListService }) => (
    cartListService
        ? {
            sellers: cartListService.sellers
        }
        : {}
))(CartList);
