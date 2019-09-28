import React from "react";
import { CheckBox } from "sn-app";
import { SmallTag } from "snowball/components";

function ListItem({ address, isDefault, selected = true }) {
    return (
        <div className="adl_item flex bd_b">
            {
                selected
                    ? <CheckBox checked></CheckBox>
                    : null
            }
            <div className="fx_1 ml_m">
                <div className="flex hd">
                    <div className="name">{address.receiver}</div>
                    <div className="mobile">{address.phoneNo}</div>
                    {
                        !!isDefault && (
                            <SmallTag className="tag" text="默认" />
                        )
                    }
                </div>
                <div className="detail">
                    {address.provinceName}
                    {address.cityName}
                    {address.detail}
                </div>
            </div>
            <button
                className="iconfont icon-edit"
            ></button>
        </div>
    );
}

export default ListItem;