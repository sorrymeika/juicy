import React from "react";
import { Header } from "snowball/components";

export default function CartHeader({ showBack = true }) {
    return (
        <Header
            className="ca_header"
            back={showBack}
            buttons={
                <a
                    className="ca_header_edit"
                    href="javascript:;"
                >编辑</a>
            }
        >
            <div className="ca_header_title">购物车</div>
        </Header>
    );
}