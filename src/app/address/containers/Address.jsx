import React, { useState } from 'react';
import { Header, MainScrollView, Switch } from 'snowball/components';

export default function Address({ data }) {
    data = {
        receiver: '孙路',
        phoneNo: '187****0239',
        countryId: 0,
        countryName: '中国',
        provinceId: 0,
        provinceName: '上海',
        detail: 'sl上海上海上海df上海jo',
        isDefaultAddress: false,
    };

    const [formData, setField] = useState({ ...data });

    return (
        <div className="adr_wrap">
            <Header
                title="添加收货地址"
                buttons={
                    <button className="adr_save pr_m">保存</button>
                }
            />
            <MainScrollView>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">收货人</p>
                    <div className="app_form_input">
                        <input />
                    </div>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">手机号码</p>
                    <div className="app_form_input">
                        <input />
                    </div>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">所在地区</p>
                    <div className="app_form_input">
                        <div>asdfasf</div>
                    </div>
                    <div className="iconfont icon-arrow-right"></div>
                </div>
                <div className="app_form_item bd_b ai_fs">
                    <p className="app_form_label" style={{ paddingTop: 2 }}>详细地址</p>
                    <div className="app_form_input">
                        <textarea placeholder="街道、楼牌号等" />
                    </div>
                </div>
                <div className="app_form_item adr_default">
                    <div className="fx_1">设置为默认地址</div>
                    <Switch
                        checked={formData.isDefaultAddress}
                        onChange={(val) => setField({
                            ...formData,
                            isDefaultAddress: val
                        })}
                    ></Switch>
                </div>
            </MainScrollView>
        </div>
    );
}