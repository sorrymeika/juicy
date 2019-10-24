import React from 'react';
import Store from './Store';
import { inject } from 'snowball/app';

function StoreList({ stores, onNoteChange }) {
    return (
        <div className="od_store_list">
            {
                stores.map((store) => {
                    return (
                        <Store store={store} skus={store.skus} onNoteChange={onNoteChange}></Store>
                    );
                })
            }
        </div>
    );
}

export default inject(({ orderCreationService }) => (
    orderCreationService
        ? {
            stores: orderCreationService.sellers,
            onNoteChange: orderCreationService.onNoteChange.emit
        }
        : null
))(StoreList);