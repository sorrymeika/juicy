import React from 'react';
import { inject, autowired } from 'snowball/app';
import ItemService from '../services/ItemService';

function Footer({
    sellerId,
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
            <div
                className="iconbtn"
                app-link={"/shop/" + sellerId}
            >
                <p className="iconfont icon-shop"></p>
                <p className="name">店铺</p>
            </div>
            <div className="iconbtn ps_r" app-link="/cart">
                <p className="iconfont icon-cart1"></p>
                <p className="name">购物车</p>
                {
                    cartNum !== 0 && (
                        <div className="cartNum">{cartNum > 99 ? '99+' : cartNum}</div>
                    )
                }
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

export default inject((props) => {
    const itemService: ItemService = autowired('itemService');

    return {
        sellerId: itemService.seller.id,
        cartNum: itemService.cartNum,
        onAddToCart: itemService.onAddToCart,
        onBuyNow: itemService.onBuyNow
    };
})(Footer);