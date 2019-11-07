import React from 'react';
import { util } from 'snowball';
import { Header, MainScrollView, CountDown } from 'snowball/components';
import { CheckBox } from 'sn-app';
import { inject } from 'snowball/app';

function OrderPay({
    currentPayType,
    orderInfo,
    onPayTypeChange,
    onPay
}) {
    const endTime = orderInfo.addDt ? new Date(orderInfo.addDt).getTime() + (1000 * 60 * 30) : 0;

    console.log(endTime);

    const payTypes = [{
        type: 1,
        icon: 'icons-weipay',
        name: '微信支付',
        desc: '微信安全支付'
    }, {
        type: 2,
        icon: 'icons-alipay',
        name: '支付宝支付',
        desc: '支付宝安全支付'
    }, {
        type: 3,
        icon: 'icons-weipay',
        name: '模拟支付',
        desc: '模拟支付'
    }];

    return (
        <div className="op_wrap">
            <Header
                title="收银台"
                buttons={
                    <button app-link="/orderlist" className="pd_m">订单中心</button>
                }
            >
            </Header>
            <footer className="op_footer">
                <button
                    className="app-button-gradient"
                    disabled={util.getCurrentTime() >= endTime || !orderInfo.payable}
                    onClick={onPay}
                >{
                        orderInfo.payStatus == 1
                            ? '订单已支付'
                            : util.getCurrentTime() >= endTime || !orderInfo.payable
                                ? '订单不可支付'
                                : '立即支付'
                    }</button>
            </footer>
            <MainScrollView>
                <div className="op_tips flex">
                    <div className="fx_1 op_countdown">请您在
                        <CountDown endTime={endTime}>{({ days, hours, minutes, seconds }) => (
                            <>
                                <span>{util.pad(hours)}</span>:<span>{util.pad(minutes)}</span>:<span>{util.pad(seconds)}</span>
                            </>
                        )}</CountDown>
                        内完成支付</div>
                    <div className="amount">{(orderInfo.totalAmount + orderInfo.totalPostFee).toFixed(2)}</div>
                </div>
                <div className="od_paytypes app-card">
                    <div className="od_paytypes_tit">支付方式</div>
                    <ul className="pt_s">
                        {
                            payTypes.map(item => {
                                return (
                                    <li
                                        key={item.type}
                                        className="flex od_paytypes_item"
                                        onClick={() => onPayTypeChange(item.type)}
                                    >
                                        <i className={item.icon}></i>
                                        <div className="fx_1 con">
                                            <div>{item.name}</div>
                                            <p className="desc">{item.desc}</p>
                                        </div>
                                        <CheckBox checked={currentPayType == item.type}></CheckBox>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </MainScrollView>
        </div>
    );
}

export default inject(({ orderPayService }) => (
    orderPayService
        ? {
            currentPayType: orderPayService.currentPayType,
            orderInfo: orderPayService.orderInfo,
            onPayTypeChange: orderPayService.onPayTypeChange.emit,
            onPay: orderPayService.onPay.emit
        }
        : null
))(OrderPay);