import React from 'react';
import { inject, autowired } from 'snowball/app';

function ShopInfo({ seller }) {
    return (
        <div className="it_shop">
            <div className="it_shop_base flex">
                <img src="" alt="" className="logo" />
                <div className="name fx_1">{seller.name}</div>
                <div className="btns">
                    <button className="app-button-solid small" app-link={"/shop/" + seller.id + '?tab=1'}>全部商品</button>
                    <button className="app-button small" app-link={"/shop/" + seller.id}>进店逛逛</button>
                </div>
            </div>
            <ul className="it_shop_serv flex">
                <li className="fx_1">商品描述 <span>{seller.descScore}</span> <i>{seller.descScore >= 4.5 ? '高' : seller.descScore >= 3 ? '中' : '低'}</i></li>
                <li className="fx_1">卖家服务 <span>{seller.servScore}</span> <i>{seller.servScore >= 4.5 ? '高' : seller.servScore >= 3 ? '中' : '低'}</i></li>
                <li className="fx_1">物流服务 <span>{seller.postScore}</span> <i>{seller.postScore >= 4.5 ? '高' : seller.postScore >= 3 ? '中' : '低'}</i></li>
            </ul>
        </div>
    );
}

export default inject(() => {
    const itemViewModel = autowired('itemViewModel');
    return {
        seller: itemViewModel.seller
    };
})(ShopInfo);