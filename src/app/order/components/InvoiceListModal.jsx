import React from "react";
import { inject } from "snowball/app";
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
                                        <div>
                                            <SmallTag
                                                className="tag"
                                                text={invoice.type == 1 ? '纸质发票' : '电子发票'}
                                            />
                                            <span className="tit">{invoice.title}</span>
                                        </div>
                                        <div className="taxCode">税号：{invoice.taxCode}</div>
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

export default inject(({ invoiceService }) => (
    invoiceService
        ? {
            dataSource: invoiceService.invoiceList,
            onClose: invoiceService.onCloseInvoiceSelector.emit,
            onSelect: invoiceService.onSelectInvoice.emit
        }
        : null
))(InvoiceListModal);