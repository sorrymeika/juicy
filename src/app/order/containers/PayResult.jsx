import React from 'react';
import { inject, mapViewModelToProps } from 'snowball/app';
import { Header, MainScrollView } from 'snowball/components';

function PayResult({
    orderInfo,
    onGoToOrder,
    onComplete
}) {
    return (
        <>
            <Header
                title={orderInfo.payStatus == 1 ? '支付成功' : "支付结果"}
            ></Header>
            <MainScrollView
                className="opr_main"
            >
                <div className="opr_info">
                    <div className="flex tip jc_c">
                        <i className="iconfont icon-right"></i>
                        <p>{orderInfo.payStatus == 1 ? '付款成功' : orderInfo.payStatus == 0 ? '下单成功' : "请稍候..."}</p>
                    </div>
                    <div className="total">
                        共支付<em>{orderInfo.totalAmount + orderInfo.totalPostFee}</em>元
                    </div>
                    <div className="btns">
                        <button
                            className="bd_all btn_order"
                            onClick={onGoToOrder}
                        >查看订单</button>
                        <button
                            className="btn_complete"
                            onClick={onComplete}
                        >完成购买</button>
                    </div>
                </div>
            </MainScrollView>
        </>
    );
}

export default inject(mapViewModelToProps('payResultViewModel'))(PayResult);