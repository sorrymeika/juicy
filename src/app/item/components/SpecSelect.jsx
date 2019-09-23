import React from 'react';
import { inject } from "snowball/app";

function SpecSelect({ sku, buyNum }) {
    return (
        <div className="it_spec_select flex">
            <p className="hd">已选</p>
            <div className="fx_1">{[sku.skuPropVal0, sku.skuPropVal1, sku.skuPropVal2, sku.skuPropVal3, sku.skuPropVal4].filter(prop => !!prop).join('，')}，{buyNum}件</div>
            <div className="iconfont icon-arrow-right"></div>
        </div>
    );
}

export default inject(({ itemService }) => ({
    sku: itemService.currentSku,
    buyNum: itemService.buyNum,
}))(SpecSelect);