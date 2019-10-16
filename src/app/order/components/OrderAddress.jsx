import React from 'react';
import { inject } from 'snowball/app';

function OrderAddress({ address }) {
    return (
        <div className="od_address app-card" app-link="/address/list">
            {
                address && address.id
                    ? (
                        <div className="od_address_info flex">
                            <i className="iconfont icon-loc"></i>
                            <div className="fx_1 ml_m">
                                <div className="flex hd">
                                    <div className="name">{address.receiver}</div>
                                    <div className="mobile">{address.phoneNo}</div>
                                </div>
                                <div className="detail">
                                    {address.provinceName}
                                    {address.cityName}
                                    {address.districtName}
                                    {address.detail}
                                </div>
                            </div>
                            <i className="iconfont icon-arrow-right"></i>
                        </div>
                    )
                    : (
                        <div className="od_no_address flex">
                            <p className="iconfont icon-add"></p>
                            <p className="fx_1">手动添加收货地址</p>
                            <p className="iconfont icon-arrow-right"></p>
                        </div>
                    )
            }
        </div>
    );
}

export default inject(({ orderCreationService }) => (
    orderCreationService
        ? {
            address: orderCreationService.orderAddress
        }
        : null
))(OrderAddress);