import React from 'react';
import { inject } from 'snowball/app';

function OrderInfoFooter({
    orderStatus,
    orderInfo,
    deliveryInfo,
    onSubmit,
    onToPay,
    onToDelivery,
    onCancelOrder
}) {
    const {
        waitingForPay,
        isComplete,
        isCanceled,
        cancelable,
        waitingForReceipt
    } = orderStatus;

    const buttons = [];
    if (cancelable) {
        buttons.push(
            <button
                key="cancel"
                onClick={() => onCancelOrder(orderInfo.id)}
            >取消订单</button>
        );
    }
    if (deliveryInfo) {
        buttons.push(
            <button
                key="cancel"
                onClick={() => onToDelivery(orderInfo.id)}
            >查看物流</button>
        );
    }
    if (waitingForPay) {
        buttons.push(
            <button
                key="pay"
                className="oi_submit"
                onClick={() => onToPay(orderInfo.id)}
            >去支付</button>
        );
    } else if (waitingForReceipt) {
        buttons.push(
            <button
                key="receipt"
                className="oi_submit"
                onClick={onSubmit}
            >确认收货</button>
        );
    }

    if (isComplete || isCanceled || !buttons.length) {
        buttons.push(
            <button
                key="onemore"
                className="oi_submit"
                onClick={onSubmit}
            >再次购买</button>
        );
    }

    return (
        <div className="oi_footer flex jc_e">
            {buttons}
        </div>
    );
}

export default inject(({ orderInfoService }) => (
    orderInfoService
        ? {
            onToPay: orderInfoService.onToPay.emit,
            onCancelOrder: orderInfoService.onCancelOrder.emit,
        }
        : null
))(OrderInfoFooter);