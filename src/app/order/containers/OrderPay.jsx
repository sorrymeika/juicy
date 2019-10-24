import React from 'react';
import { util } from 'snowball';
import { Header, MainScrollView, CountDown } from 'snowball/components';
import { CheckBox } from 'sn-app';
import { inject } from 'snowball/app';

function OrderPay({ orderInfo }) {
    const endTime = orderInfo.addDt ? new Date(orderInfo.addDt).getTime() + (1000 * 60 * 30) : 0;

    return (
        <div className="op_wrap">
            <Header
                title="收银台"
                buttons={
                    <button app-link="/order/list" className="pd_m">订单中心</button>
                }
            >
            </Header>
            <footer className="op_footer">
                <button className="app-button-gradient" disabled={util.getCurrentTime() >= endTime || orderInfo.payStatus != 0}>{orderInfo.payStatus == 1
                    ? '订单已支付'
                    : util.getCurrentTime() >= endTime || orderInfo.status == -5
                        ? '订单已取消'
                        : '立即支付'}</button>
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
                    <div className="amount">12.00</div>
                </div>
                <div className="od_paytypes app-card">
                    <div className="od_paytypes_tit">支付方式</div>
                    <ul className="pt_s">
                        <li className="flex od_paytypes_item">
                            <i className="icons-weipay"></i>
                            <div className="fx_1 con">
                                <div>微信支付</div>
                                <p className="tip">微信安全支付</p>
                            </div>
                            <CheckBox checked></CheckBox>
                        </li>
                        <li className="flex od_paytypes_item">
                            <i className="icons-alipay"></i>
                            <div className="fx_1 con">
                                <div>支付宝支付</div>
                                <p className="tip">支付宝安全支付</p>
                            </div>
                            <CheckBox></CheckBox>
                        </li>
                    </ul>
                </div>
            </MainScrollView>
        </div>
    );
}

export default inject(({ orderPayService }) => (
    orderPayService
        ? {
            orderInfo: orderPayService.orderInfo
        }
        : null
))(OrderPay);