import React from 'react';
import { inject } from 'snowball/app';

function MyOrder() {
    return (
        <div className="uc_myorder">
            <div
                className="flex"
                app-link="/orderlist"
            >
                <h3 className="fx_2">我的订单</h3>
                <a>查看全部订单</a>
                <i className="iconfont icon-arrow-right"></i>
            </div>
            <div className="flex">
                <div className="fx_1">
                    <i className="iconfont icon-card"></i>
                    <p>待付款</p>
                </div>
                <div className="fx_1">
                    <i className="iconfont icon-supply"></i>
                    <p>待收货</p>
                </div>
                <div className="fx_1">
                    <i className="iconfont icon-message1"></i>
                    <p>待评价</p>
                </div>
                <div className="fx_1">
                    <i className="iconfont icon-money"></i>
                    <p>退换/售后</p>
                </div>
                <div
                    className="fx_1"
                    app-link="/orderlist"
                >
                    <i className="iconfont icon-order1"></i>
                    <p>全部订单</p>
                </div>
            </div>
        </div>
    );
}

export default inject(({ userCenterService }) => {
    return userCenterService
        ? {
        }
        : null;
})(MyOrder);