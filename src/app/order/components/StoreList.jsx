import React from 'react';
import Store from './Store';
import { inject } from 'snowball/app';

function StoreList({ stores }) {
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

export default inject(({ orderCreationService }) => (
    orderCreationService
        ? {
            stores: orderCreationService.sellers
        }
        : null
))(StoreList);