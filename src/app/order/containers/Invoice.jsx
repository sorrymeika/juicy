import React from 'react';
import { Header, MainScrollView, Switch } from 'snowball/components';
import { CheckBox, TagList } from 'sn-app';
import InvoiceListModal from '../components/InvoiceListModal';

export default function Invoice({
    data = {},
    isInvoiceSelectorVisible,
    onFieldChange,
    onShowInvoiceSelector,
    onConfirm
}) {
    return (
        <div className="iv_wrap">
            <Header
                className="iv_header"
                title="发票"
            />
            <footer className="app-footer bg_fff">
                <button
                    className="iv_confirm"
                    onClick={onConfirm}
                >确定</button>
            </footer>
            <MainScrollView>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">发票类型</p>
                    <div className="app_form_input">
                        <TagList
                            value={data.type || 1}
                            dataSource={[{
                                value: 1,
                                label: '纸质发票'
                            }, {
                                value: 2,
                                label: '电子发票'
                            }]}
                            onChange={(type) => onFieldChange('type', type)}
                        />
                    </div>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">抬头类型</p>
                    <div className="app_form_input flex">
                        <div
                            className="flex"
                            onClick={() => onFieldChange('titleType', 1)}
                        >
                            <CheckBox checked={!data.titleType || data.titleType == 1}></CheckBox>
                            <div className="ml_s">个人或事业单位</div>
                        </div>
                        <div
                            className="flex ml_l"
                            onClick={() => onFieldChange('titleType', 2)}
                        >
                            <CheckBox checked={data.titleType == 2}></CheckBox>
                            <div className="ml_s">企业</div>
                        </div>
                    </div>
                </div>
                <div className="app_form_item bd_b">
                    <p className="app_form_label">发票抬头</p>
                    <div className="app_form_input">
                        <input
                            placeholder="抬头名称"
                            value={data.title}
                            onChange={(e) => onFieldChange('title', e.target.value)}
                        />
                    </div>
                    <button
                        className="iconfont icon-arrow-right ta_r" style={{ width: 50 }}
                        onClick={onShowInvoiceSelector}
                    ></button>
                </div>
                <InvoiceListModal
                    visible={isInvoiceSelectorVisible}
                />
                {
                    data.titleType == 2 && (
                        <div className="app_form_item bd_b">
                            <p className="app_form_label">税号</p>
                            <div className="app_form_input">
                                <input
                                    placeholder="纳税人识别号"
                                    value={data.taxCode}
                                    onChange={(e) => onFieldChange('taxCode', e.target.value)}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    data.type == 2 && (
                        <div className="app_form_item bd_b">
                            <p className="app_form_label">收票人手机</p>
                            <div className="app_form_input">
                                <input
                                    placeholder="请填写收票人手机号"
                                    value={data.phoneNo}
                                    onChange={(e) => onFieldChange('phoneNo', e.target.value)}
                                />
                            </div>
                        </div>
                    )
                }
                <div className="app_form_item adr_default">
                    <div className="fx_1">设置为默认抬头</div>
                    <Switch
                        checked={data.isDefault}
                        onChange={(val) => onFieldChange('isDefault', val)}
                    ></Switch>
                </div>
            </MainScrollView>
        </div>
    );
}