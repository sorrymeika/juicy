import React from "react";
import { CheckBox } from "sn-app";
import { inject, autowired } from "snowball/app";
import CartViewService from "../services/CartViewService";

function CartFooter({
    isInEditMode,
    total,
    selectedCount,
    amount,
    onSelectAll,
    onCheckout,
    onMoveToFav,
    onDelete,
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
            {
                isInEditMode
                    ? (
                        <>
                            <div className="fx_1">
                            </div>
                            <button
                                className="btn_move_to_fav"
                            >移入收藏夹</button>
                            <button
                                className="btn_del"
                                onClick={onDelete}
                            >删除</button>
                        </>
                    )
                    : (
                        <>
                            <div className="ca_footer_total fx_1 flex">
                                <div className="hd">合计:</div>
                                <div className="price">{amountLeft}.{amountRight}</div>
                            </div>
                            <button
                                className="btn_checkout"
                                onClick={onCheckout}
                            >去结算({selectedCount})</button>
                        </>
                    )
            }
        </footer>
    );
}

function mapServiceToProps() {
    const cartViewService: CartViewService = autowired('cartViewService');

    return {
        isInEditMode: cartViewService.isInEditMode,
        total: cartViewService.total,
        selectedCount: cartViewService.selectedCount,
        amount: cartViewService.amount,
        onSelectAll(selected) {
            cartViewService.selectAll(selected);
        },
        onCheckout() {
            cartViewService.checkout();
        },
        onMoveToFav() {
        },
        onDelete() {
            cartViewService.delSelectedItems();
        }
    };
}

export default inject(mapServiceToProps)(CartFooter);