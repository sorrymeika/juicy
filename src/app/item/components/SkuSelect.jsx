import React, { useState } from 'react';
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

export default inject(({ itemService }) => ({
    visible: itemService.skuSelectMode != null,
    onCancel: itemService.onCancelSkuSelect.emit,
    onOk: itemService.onConfirmSku.emit,
}))(SkuSelect);