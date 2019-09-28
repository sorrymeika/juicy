import React from "react";
import CartStore from "./CartStore";

export default function CartList({ stores }) {
    stores = [{
        logo: '',
        name: '店铺店铺'
    }, {
        logo: '',
        name: '店铺店铺1'
    }, {
        logo: '',
        name: '店铺店铺1'
    }];

    return (
        <div>
            {
                stores.map((store) => {
                    return (
                        <CartStore store={store} skus={store.skus}></CartStore>
                    );
                })
            }
        </div>
    );
}