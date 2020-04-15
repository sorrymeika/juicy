import React from 'react';
import { inject } from "snowball/app";
import SpecSelectModal from './SpecSelectModal';

function SpecSelect({
    modalVisible,
    sku,
    buyNum,
    onClickSpec,
    onCancelSelectSpec,
    onAddToCart,
    onBuyNow
}) {
    const spec = [sku.skuPropVal0, sku.skuPropVal1, sku.skuPropVal2, sku.skuPropVal3, sku.skuPropVal4].filter(prop => !!prop).join('，');

    return (
        <>
            <div
                className="it_spec_select flex"
                onClick={onClickSpec}
            >
                <p className="hd">已选</p>
                <div className="fx_1">{spec ? spec + '，' : ''}{buyNum || 1}件</div>
                <div className="iconfont icon-arrow-right"></div>
            </div>
            <SpecSelectModal
                visible={modalVisible}
                onCancel={() => onCancelSelectSpec(false)}
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

export default inject(({ itemViewModel }) => ({
    modalVisible: itemViewModel.isSpecSelectModalVisible,
    sku: itemViewModel.currentSku,
    buyNum: itemViewModel.buyNum,
    onClickSpec: itemViewModel.onClickSpec.emit,
    onCancelSelectSpec: itemViewModel.onCancelSelectSpec.emit,
    onAddToCart: itemViewModel.onAddToCart.emit,
    onBuyNow: itemViewModel.onBuyNow.emit,
}))(SpecSelect);