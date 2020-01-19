import React from "react";
import { Modal, SmallTag, ScrollView } from "snowball/components";

function InvoiceListModal({
    dataSource,
    visible,
    onSelect,
    onClose
}) {

    return (
        <Modal
            visible={visible}
            animate={'up'}
            className="iv_list_modal"
            onCancel={onClose}
        >
            <div className="iv_list">
                <div className="iv_list_hd">
                    <h4 className="tit">抬头选择</h4>
                    <button
                        className="iconfont icon-close"
                        onClick={onClose}
                    ></button>
                </div>
                <ScrollView
                    className="iv_list_bd"
                    style={{ minHeight: window.innerHeight - 250 }}
                >
                    {
                        dataSource && dataSource.length
                            ? dataSource.map((invoice) => {
                                return (
                                    <div
                                        className="iv_list_item bd_b"
                                        onClick={() => onSelect(invoice)}
                                    >
                                        <div className="clearfix">
                                            <SmallTag
                                                className="tag fl_l"
                                                text={invoice.type == 1 ? '纸质发票' : '电子发票'}
                                            />
                                            <span className="tit">{invoice.titleType == 2 ? '企业' : '个人'}，{invoice.title}</span>
                                        </div>
                                        {
                                            invoice.titleType == 2
                                                ? (
                                                    <div className="taxCode">税号：{invoice.taxCode}</div>
                                                )
                                                : null
                                        }
                                    </div>
                                );
                            })
                            : null
                    }
                </ScrollView>
            </div>
        </Modal>
    );
}

export default InvoiceListModal;