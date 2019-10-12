import React, { useState } from 'react';
import { inject } from "snowball/app";
import SpecSelectModal from './SpecSelectModal';

function SpecSelect({
    sku,
    buyNum,
    onAddToCart,
    onBuyNow
}) {
    const spec = [sku.skuPropVal0, sku.skuPropVal1, sku.skuPropVal2, sku.skuPropVal3, sku.skuPropVal4].filter(prop => !!prop).join('，');

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <div
                className="it_spec_select flex"
                onClick={() => setModalVisible(true)}
            >
                <p className="hd">已选</p>
                <div className="fx_1">{spec ? spec + '，' : ''}{buyNum || 1}件</div>
                <div className="iconfont icon-arrow-right"></div>
            </div>
            <SpecSelectModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={
                    <>
                        <button
                            className="fx_1 btn_cart"
                            onClick={() => onAddToCart(sku)}
                        >加入购物车</button>
                        <button
                            className="fx_1"
                            onClick={() => onBuyNow(sku)}
                        >立即购买</button>
                    </>
                }
            ></SpecSelectModal>
        </>
    );
}

export default inject(({ itemService }) => ({
    visible: itemService.isSpecSelectModalVisible,
    sku: itemService.currentSku,
    buyNum: itemService.buyNum,
    onAddToCart: itemService.onAddToCart,
    onBuyNow: itemService.onBuyNow,
}))(SpecSelect);