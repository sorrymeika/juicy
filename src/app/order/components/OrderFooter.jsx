import React from 'react';
import { inject } from 'snowball/app';

function OrderFooter({ totalAmount, totalPostFee, onSubmit }) {
    return (
        <div className="od_footer flex">
            <div className="fx_1 total">{totalAmount + totalPostFee}</div>
            <button
                className="od_submit"
                onClick={onSubmit}
            >提交订单</button>
        </div>
    );
}

export default inject(({ orderCreationService }) => (
    orderCreationService
        ? {
            total: orderCreationService.total,
            totalAmount: orderCreationService.totalAmount,
            totalPostFee: orderCreationService.totalPostFee,
            onSubmit: orderCreationService.onSubmit.emit,
        }
        : null
))(OrderFooter);