import React from 'react';
import { inject } from 'snowball/app';
import ItemShopService from '../services/ItemShopService';
import { SfsImage } from 'sn-app';

function ShopRecommends({ seller = {}, products }) {
    return (
        <div className="it_shop_recommends">
            <div className="it_shop_recommends_hd flex">
                <div className="tit fx_1">店铺推荐</div>
                <div className="more" app-link={"/shop/" + seller.id + '?tab=1'}>查看更多 <i className="iconfont icon-arrow-right" style={{ verticalAlign: '-1px' }}></i> </div>
            </div>
            <div className="it_shop_recommends_items">
                <ul className="clearfix">
                    {
                        products && products.map((item) => {
                            return (
                                <li
                                    className="it_shop_recommends_item"
                                    app-link={"/item/" + item.id}
                                >
                                    <SfsImage
                                        className="img"
                                        src={item.pictures.split(',')[0]}
                                        size="380x380"
                                    />
                                    <p className="title to_e2">{item.title}</p>
                                    <p className="price"><span>{item.price}</span></p>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default inject(({ itemShopService }: { itemShopService: ItemShopService }) => {
    return itemShopService
        ? {
            seller: itemShopService.seller,
            products: itemShopService.products
        }
        : null;
})(ShopRecommends);