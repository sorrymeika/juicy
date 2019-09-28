import React from 'react';
import Store from './Store';

export default function StoreList({ stores }) {
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
        <div className="od_store_list">
            {
                stores.map((store) => {
                    return (
                        <Store store={store} skus={store.skus}></Store>
                    );
                })
            }
        </div>
    );
}