import React from "react";

export default function Item({ sku }) {
    return (
        <div className="od_item dp_f ai_fs">
            <div className="flex">
                <img alt="" className="img" />
            </div>
            <div className="con fx_1">
                <div className="tit">{sku.title}</div>
                <div className="spec">
                    <p className="name dp_ib to_e2">
                        {sku.spec}
                    </p>
                </div>
            </div>
            <div className="ft ta_r">
                <div className="price">{sku.price}</div>
                <div className="num">x{sku.num}</div>
            </div>
        </div>
    );
}