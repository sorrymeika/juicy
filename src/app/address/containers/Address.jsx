import React from 'react';
import { inject } from 'snowball/app';
import { Header, MainScrollView, Switch } from 'snowball/components';

import AddressEditService from '../services/AddressEditService';

import DistrictSelect from '../components/DistrictSelect';

function Address({
    data = {},
    onClickDistrict,
    onFieldChange,
    onSave
}) {
    const area = [data.provinceName, data.cityName, data.districtName].filter(name => !!name).join('，');

    return (
        <div className="adr_wrap">
            <Header
                title="添加收货地址"
                buttons={
                    <button
                        className="adr_save pr_m"
                        onClick={() => onSave(data)}
                    >保存</button>
                }
            />
            <MainScrollView>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">收货人</p>
                    <div className="app_form_input">
                        <input
                            value={data.receiver}
                            onChange={(e) => {
                                onFieldChange("receiver", e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">手机号码</p>
                    <div className="app_form_input">
                        <input
                            value={data.phoneNo}
                            onChange={(e) => {
                                onFieldChange("phoneNo", e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="app_form_item bd_b" onClick={onClickDistrict}>
                    <p className="app_form_label">所在地区</p>
                    <div className="app_form_input">
                        <div>{area}</div>
                    </div>
                    <div className="iconfont icon-arrow-right"></div>
                </div>
                <DistrictSelect></DistrictSelect>
                <div className="app_form_item bd_b ai_fs">
                    <p className="app_form_label" style={{ paddingTop: 2 }}>详细地址</p>
                    <div className="app_form_input">
                        <textarea
                            placeholder="街道、楼牌号等"
                            onChange={(e) => {
                                onFieldChange("detail", e.target.value);
                            }}
                        >{data.detail}</textarea>
                    </div>
                </div>
                <div className="app_form_item adr_default">
                    <div className="fx_1">设置为默认地址</div>
                    <Switch
                        checked={data.isDefaultAddress}
                        onChange={(val) => {
                            onFieldChange('isDefaultAddress', val);
                        }}
                    ></Switch>
                </div>
            </MainScrollView>
        </div>
    );
}

export default inject(['addressEditService'], ([addressEditService]: [AddressEditService]) => {

    return {
        data: addressEditService.data,
        onFieldChange(name, value) {
            addressEditService.updateField(name, value);
        },
        onClickDistrict() {
            addressEditService.showDistrictSelectModal();
        },
        onSave: addressEditService.onSave
    };
})(Address);