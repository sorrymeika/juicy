import React from 'react';
import { inject } from "snowball/app";
import SpecSelectModal from './SpecSelectModal';

function SkuSelect({
    visible,
    onCancel,
    onOk
}) {
    return (
        <SpecSelectModal
            visible={visible}
            onCancel={onCancel}
            footer={
                <button
                    className="fx_1 btn_confirm"
                    onOk={onOk}
                >确定</button>
            }
        ></SpecSelectModal>
    );
}

export default inject(({ itemViewModel }) => ({
    visible: itemViewModel.skuSelectMode != null,
    onCancel: itemViewModel.onCancelSkuSelect.emit,
    onOk: itemViewModel.onConfirmSku.emit,
}))(SkuSelect);