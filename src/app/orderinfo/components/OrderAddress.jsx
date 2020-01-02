import React from 'react';
import { inject } from 'snowball/app';

function OrderAddress({ address }) {
    return (
        <div className="oi_address">
            <div className="oi_address_info flex">
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
            </div>
        </div>
    );
}

export default inject(({ orderInfoService }) => (
    orderInfoService
        ? {
            address: orderInfoService.addressInfo
        }
        : null
))(OrderAddress);