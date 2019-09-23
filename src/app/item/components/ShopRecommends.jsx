import React from 'react';

export default function ShopRecommends() {
    return (
        <div className="it_shop_recommends">
            <div className="it_shop_recommends_hd flex">
                <div className="tit fx_1">店铺推荐</div>
                <div className="more">查看更多 <i className="iconfont icon-arrow-right" style={{ verticalAlign: '-1px' }}></i> </div>
            </div>
            <div className="it_shop_recommends_items">
                <ul className="clearfix">
                    <li className="it_shop_recommends_item">
                        <img className="img" alt="" />
                        <p className="title to_e2">商品名称商品名称商品名称111</p>
                        <p className="price"><span>59</span></p>
                    </li>
                    <li className="it_shop_recommends_item">
                        <img className="img" alt="" />
                        <p className="title to_e2">商品名称商品名称商品名称111</p>
                        <p className="price"><span>59</span></p>
                    </li>
                    <li className="it_shop_recommends_item">
                        <img className="img" alt="" />
                        <p className="title to_e2">商品名称商品名称商品名称111</p>
                        <p className="price"><span>59</span></p>
                    </li>
                    <li className="it_shop_recommends_item">
                        <img className="img" alt="" />
                        <p className="title to_e2">商品名称商品名称商品名称111</p>
                        <p className="price"><span>59</span></p>
                    </li>
                </ul>
            </div>
        </div>
    );
}