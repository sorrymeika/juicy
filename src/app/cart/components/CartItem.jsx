import React from "react";
import { CheckBox, SfsImage, InputNumber } from "sn-app";

export default function CartItem({
    sku,
    onSelectSku,
    onCartNumChange,
}) {
    const spec = [sku.skuPropVal0, sku.skuPropVal1, sku.skuPropVal2, sku.skuPropVal3, sku.skuPropVal4].filter(prop => !!prop).join('，');
    return (
        <div className="ca_item dp_f ai_fs">
            <div className="flex">
                <CheckBox
                    checked={!!sku.selected}
                    onClick={() => onSelectSku({ id: sku.id, selected: !sku.selected })}
                ></CheckBox>
                <SfsImage src={sku.picture} className="img" />
            </div>
            <div className="con fx_1">
                <div className="tit">{sku.title}</div>
                <div className="spec">
                    <p className="name dp_ib to_e2">
                        {spec}
                    </p>
                    <div className="iconfont icon-arrow-down"></div>
                </div>
                <div className="ft flex">
                    <div className="price fx_1">{sku.price}</div>
                    <InputNumber
                        min={1}
                        value={sku.num}
                        onChange={(num) => {
                            onCartNumChange && onCartNumChange({
                                id: sku.id,
                                skuId: sku.skuId,
                                num,
                                oldNum: sku.num
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}