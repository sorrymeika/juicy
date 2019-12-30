import React from "react";
import { CheckBox } from "sn-app";
import { inject } from "snowball/app";

function CartFooter({
    total,
    selectedCount,
    amount,
    onSelectAll,
    onCheckout
}) {
    const [amountLeft, amountRight] = amount.toFixed(2).split('.');
    const checked = !!selectedCount && selectedCount === total;
    return (
        <footer className="ca_footer bd_t flex">
            <CheckBox
                checked={checked}
                onClick={() => onSelectAll(!checked)}
            ></CheckBox>
            <div className="ca_footer_checkall">全选</div>
            <div className="ca_footer_total fx_1 flex">
                <div className="hd">合计:</div>
                <div className="price">{amountLeft}.{amountRight}</div>
            </div>
            <button
                className="btn_checkout"
                onClick={onCheckout}
            >去结算({selectedCount})</button>
        </footer>
    );
}

export default inject(({ cartViewService }) => (
    cartViewService
        ? {
            total: cartViewService.total,
            selectedCount: cartViewService.selectedCount,
            amount: cartViewService.amount,
            onSelectAll: cartViewService.onSelectAll.emit,
            onCheckout: cartViewService.onCheckout.emit
        }
        : null
))(CartFooter);