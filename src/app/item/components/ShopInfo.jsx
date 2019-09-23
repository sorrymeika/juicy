import React from 'react';

export default function ShopInfo() {
    return (
        <div className="it_shop">
            <div className="it_shop_base flex">
                <img src="" alt="" className="logo" />
                <div className="name fx_1">店铺名</div>
                <div className="btns">
                    <button className="app-button-solid small">全部商品</button>
                    <button className="app-button small">进店逛逛</button>
                </div>
            </div>
            <ul className="it_shop_serv flex">
                <li className="fx_1">商品描述 <span>4.5</span> <i>高</i></li>
                <li className="fx_1">卖家服务 <span>4.5</span> <i>高</i></li>
                <li className="fx_1">物流服务 <span>4.5</span> <i>高</i></li>
            </ul>
        </div>
    );
}