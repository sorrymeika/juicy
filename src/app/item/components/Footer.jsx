import React from 'react';
import { inject } from 'snowball/app';

function Footer({
    cartNum,
    onAddToCart,
    onBuyNow
}) {
    return (
        <div className="it_footer bd_t flex">
            <div className="iconbtn">
                <p className="iconfont icon-customerservice"></p>
                <p className="name">客服</p>
            </div>
            <div className="iconbtn">
                <p className="iconfont icon-shop"></p>
                <p className="name">店铺</p>
            </div>
            <div className="iconbtn ps_r" app-link="/cart">
                <p className="iconfont icon-cart1"></p>
                <p className="name">购物车</p>
                <div className="cartNum">{cartNum > 99 ? '99+' : cartNum}</div>
            </div>
            <div className="fx_1 btnwrap ml_m">
                <button
                    className="btn_cart"
                    onClick={() => onAddToCart()}
                >加入购物车</button>
            </div>
            <div className="fx_1 btnwrap">
                <button
                    className="btn_buy"
                    onClick={() => onBuyNow()}
                >立即购买</button>
            </div>
        </div>
    );
}

export default inject(({ itemService }) => (
    itemService
        ? {
            cartNum: itemService.cartNum,
            onAddToCart: itemService.onAddToCart.emit,
            onBuyNow: itemService.onBuyNow.emit
        }
        : {}
))(Footer);