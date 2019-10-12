import React from 'react';
import { Modal, ScrollView } from 'snowball/components';

export default function SpuPropsModal({ visible, brandName, spuProps, onCancel }) {
    return (
        <Modal
            visible={visible}
            animate="up"
        >
            <div className="it_spu_props_modal_hd flex ps_r jc_c ta_c">
                <h4>产品参数</h4>
            </div>
            <ScrollView className="it_spu_props_modal_bd">
                <div className="it_spu_props_modal_item flex bd_b">
                    <p className="label">品牌</p>
                    <div className="val">{brandName}</div>
                </div>
                {
                    spuProps.map((spuProp) => {
                        return (
                            <div key={spuProp.label} className="it_spu_props_modal_item flex bd_b">
                                <p className="label">{spuProp.label}</p>
                                <div className="val">{spuProp.value}</div>
                            </div>
                        );
                    })
                }
            </ScrollView>
            <div className="it_spu_props_modal_ft">
                <button
                    onClick={onCancel}
                    className="it_spu_props_modal_ok_btn"
                >完成</button>
            </div>
        </Modal>
    );
}