import React from 'react';

export default function OrderAddress() {
    return (
        <div className="od_address app-card" app-link="/address/list">
            <div className="od_no_address flex">
                <p className="iconfont icon-add"></p>
                <p className="fx_1">手动添加收货地址</p>
                <p className="iconfont icon-arrow-right"></p>
            </div>
        </div>
    );
}