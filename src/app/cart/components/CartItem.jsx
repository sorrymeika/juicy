import React from "react";
import { CheckBox } from "sn-app";

export default function CartItem({ sku }) {
    return (
        <div className="ca_item dp_f ai_fs">
            <div className="flex">
                <CheckBox checked></CheckBox>
                <img alt="" className="img" />
            </div>
            <div className="con fx_1">
                <div className="tit">{sku.title}</div>
                <div className="spec">
                    <p className="name dp_ib to_e2">
                        {sku.spec}
                    </p>
                    <div className="iconfont icon-arrow-down"></div>
                </div>
                <div className="ft flex">
                    <div className="price fx_1">{sku.price}</div>
                </div>
            </div>
        </div>
    );
}