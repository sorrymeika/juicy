import React, { useState } from 'react';
import SpuPropsModal from './SpuPropsModal';
import { inject, autowired } from 'snowball/app';

function SpuProps({ brandName, spuProps }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div className="it_props flex bd_t" onClick={() => setModalVisible(true)}>
            <div className="it_infobar_hd">参数</div>
            <div className="fx_1">品牌：{brandName}</div>
            <div className="iconfont icon-arrow-right"></div>
            <SpuPropsModal
                visible={modalVisible}
                brandName={brandName}
                spuProps={spuProps}
                onCancel={() => setModalVisible(false)}
            ></SpuPropsModal>
        </div>
    );
}

export default inject(() => {
    const itemViewModel = autowired('itemViewModel');
    return {
        brandName: itemViewModel.item.brandName,
        spuProps: itemViewModel.spuProps
    };
})(SpuProps);