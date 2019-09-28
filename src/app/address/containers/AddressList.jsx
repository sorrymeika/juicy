import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import ListItem from '../components/ListItem';

export default function AddressList({ addressList }) {
    addressList = [{
        receiver: '孙路',
        phoneNo: '187****0239',
        countryId: 0,
        countryName: '中国',
        provinceId: 0,
        provinceName: '上海',
        detail: 'sl上海上海上海df上海jo'
    }, {
        receiver: '孙路',
        phoneNo: '187****0239',
        countryId: 0,
        countryName: '中国',
        provinceId: 0,
        provinceName: '上海',
        detail: 'sl上海上海上海df上海jo'
    }];

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
                            <ListItem
                                address={address}
                            ></ListItem>
                        );
                    })
                }
            </MainScrollView>
        </div>
    );
}