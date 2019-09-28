import React, { useState } from 'react';
import { Header, MainScrollView, Switch } from 'snowball/components';
import { CheckBox } from 'sn-app';

export default function Invoice({ data }) {
    const [formData, setField] = useState({ ...data });

    return (
        <div className="iv_wrap">
            <Header
                className="iv_header"
                title="发票"
            />
            <footer className="app-footer bg_fff">
                <button className="iv_confirm">确定</button>
            </footer>
            <MainScrollView>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">发票类型</p>
                    <div className="app_form_input">
                        纸质发票
                    </div>
                    <button className="iconfont icon-arrow-right"></button>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">抬头类型</p>
                    <div className="app_form_input flex">
                        <CheckBox checked></CheckBox>
                        <div className="ml_s">个人或事业单位</div>
                        <CheckBox className="ml_l"></CheckBox>
                        <div className="ml_s">企业</div>
                    </div>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">发票抬头</p>
                    <div className="app_form_input">
                        <input placeholder="抬头名称" />
                    </div>
                    <button className="iconfont icon-arrow-right ta_r" style={{ width: 50 }}></button>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">税号</p>
                    <div className="app_form_input">
                        <input placeholder="纳税人识别号" />
                    </div>
                </div>
                <div className="app_form_item adr_default">
                    <div className="fx_1">设置为默认抬头</div>
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