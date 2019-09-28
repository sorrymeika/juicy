import React from "react";
import { CheckBox } from "sn-app";

export default function CartFooter() {
    return (
        <footer className="ca_footer bd_t flex">
            <CheckBox></CheckBox>
            <div className="ca_footer_checkall">全选</div>
            <div className="ca_footer_total fx_1 flex">
                <div className="hd">合计:</div>
                <div className="price">0.00</div>
            </div>
            <button
                className="btn_checkout"
                app-link="/order/create"
            >去结算(0)</button>
        </footer>
    );
}