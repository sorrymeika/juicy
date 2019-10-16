import React from 'react';

export default function OrderInfo({ coupon }) {
    if (!coupon) {
        return null;
    }

    return (
        <div className="od_orderinfo app-card">
            {
                !!coupon && (
                    <div className="od_orderinfo_bar flex">
                        <div className="hd">优惠券</div>
                        <div className="bd fx_1 cl_999 ta_r">省5元:满90减5</div>
                        <div className="iconfont icon-arrow-right"></div>
                    </div>
                )
            }
        </div>
    );
}