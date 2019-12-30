import React from "react";
import CartStore from "./CartStore";
import { inject } from "snowball/app";

function CartList({ sellers }) {

    return (
        <div>
            {
                sellers && sellers.length
                    ? sellers.map((seller) => {
                        return (
                            <CartStore seller={seller} skus={seller.skus}></CartStore>
                        );
                    })
                    : (
                        <div className="pd_m ta_c">暂无商品</div>
                    )
            }
        </div>
    );
}

export default inject(({ cartViewService }) => (
    cartViewService
        ? {
            sellers: cartViewService.sellers
        }
        : {}
))(CartList);
