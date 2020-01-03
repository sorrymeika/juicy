import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import AddressListItem from '../components/AddressListItem';

export default function AddressList({
    addressList,
    onEdit,
    onSelect
}) {
    return (
        <div className="adl_wrap">
            <Header
                title="我的收货地址"
                buttons={
                    <button
                        className="pr_m adl_new"
                        app-link="/address/edit"
                    >添加新地址</button>
                }
            />
            <MainScrollView>
                {
                    addressList.map((address, i) => {
                        return (
                            <AddressListItem
                                address={address}
                                onEdit={onEdit}
                                onSelect={onSelect}
                            ></AddressListItem>
                        );
                    })
                }
            </MainScrollView>
        </div>
    );
}