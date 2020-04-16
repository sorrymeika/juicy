import React from 'react';
import { inject, autowired } from "snowball/app";
import { Modal, ScrollView } from 'snowball/components';
import { SfsImage, InputNumber } from "sn-app";

function SpecSelectModal({
    visible,
    item,
    currentSku,
    buyNum,
    skus,
    footer,
    onCancel,
    onSpecChange,
    onBuyNumChange
}) {
    const spec = [currentSku.skuPropVal0, currentSku.skuPropVal1, currentSku.skuPropVal2, currentSku.skuPropVal3, currentSku.skuPropVal4].filter(prop => !!prop).join('，');
    const propKeys = [0, 1, 2, 3, 4].map(index => ({
        key: `skuPropVal${index}`,
        name: item[`skuPropKey${index}`],
    })).filter(prop => !!prop.name);

    return (
        <Modal
            visible={visible}
            animate="up"
        >
            <div className="it_spec_select_modal_info dp_f ai_fe ps_r">
                <SfsImage
                    src={currentSku.picture}
                    size="180x180"
                    className="logo"
                />
                <div className="info">
                    <p className="price">{currentSku.price}</p>
                    <div className="select flex"><span className="label">已选</span><span className="val">{spec ? spec + '，' : ''}{buyNum || 1}个</span></div>
                </div>
                <button
                    className="iconfont icon-close"
                    onClick={onCancel}
                ></button>
            </div>
            <ScrollView
                className="it_spec_select_modal_con pb_m"
                style={{
                    height: window.innerHeight - 250
                }}
            >
                {
                    skus && skus.length > 1 && propKeys.map(({ key, name }) => {
                        const specs = skus.reduce((res, sku) => {
                            const specName = sku[key];
                            if (!res.includes(specName)) {
                                res.push(specName);
                            }
                            return res;
                        }, []);

                        return (
                            <div className="it_spec_select_modal_props">
                                <div className="it_spec_select_modal_props_hd">{name}</div>
                                <div className="it_spec_select_modal_props_bd">{
                                    specs.map((spec) => {
                                        return (
                                            <button className={"it_spec_select_modal_props_item " + (currentSku[key] == spec ? 'curr' : '')}>{spec}</button>
                                        );
                                    })
                                }</div>
                            </div>
                        );
                    })
                }
                <div className="it_spec_select_modal_num flex">
                    <div className="label fx_1">数量</div>
                    <InputNumber
                        min={1}
                        value={buyNum}
                        onChange={onBuyNumChange}
                    />
                </div>
            </ScrollView>
            <div className="it_spec_select_modal_ft flex bd_t">
                {footer}
            </div>
        </Modal>
    );
}

export default inject(() => {
    const itemViewModel = autowired('itemViewModel');
    return {
        item: itemViewModel.item,
        skus: itemViewModel.skus,
        buyNum: itemViewModel.buyNum,
        currentSku: itemViewModel.currentSku,
        onSpecChange: itemViewModel.onBuyNumChange.emit,
        onBuyNumChange: itemViewModel.onBuyNumChange.emit
    };
})(SpecSelectModal);