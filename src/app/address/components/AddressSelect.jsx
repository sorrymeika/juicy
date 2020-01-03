import React, { useEffect } from "react";
import { inject } from "snowball/app";
import { Modal, ScrollView } from "snowball/components";
import { DistrictSelect } from "./DistrictSelect";
import DistrictSelectService from "../services/DistrictSelectService";
import AddressSelectService from "../services/AddressSelectService";

function AddressSelect({
    currentAddress,
    addressList,
    onSelect
}) {
    return (
        <ScrollView className="adr_address_select" style={{ height: window.innerHeight - 250 }}>
            {
                addressList && addressList.map((address, i) => {
                    const selected = currentAddress && currentAddress.id == address.id;

                    return (
                        <div
                            className={"adr_address_select_item dp_f bd_b" + (selected ? ' selected' : '')}
                            onClick={() => onSelect(address)}
                        >
                            <i className="iconfont icon-loc"></i>
                            <div className="con fx_1">
                                {address.provinceName}
                                {address.cityName}
                                {address.districtName}
                                {address.detail}
                            </div>
                            {
                                selected && (
                                    <i className="iconfont icon-right"></i>
                                )
                            }
                        </div>
                    );
                })
            }
        </ScrollView>
    );
}

function AddressSelectModal({
    visible,
    currentAddress,
    addressList,
    districtSelectVisible,
    onShow,
    onCancel,
    onBack,
    onSelectAddress,
    onToSelectOtherArea
}) {
    useEffect(() => {
        if (visible && onShow) {
            onShow();
        }
    }, [onShow, visible]);

    return (
        <Modal
            visible={visible}
            animate="up"
            onCancel={onCancel}
        >
            <div className="adr_district_select_hd flex jc_c ps_r ta_c bd_b">
                {
                    districtSelectVisible && (
                        <button className="iconfont icon-back dock_tl" onClick={() => onBack()}></button>
                    )
                }
                <h4>配送至</h4>
                <button className="iconfont icon-close dock_tr" onClick={() => onCancel()}></button>
            </div>
            {
                !districtSelectVisible
                    ? (
                        <>
                            <AddressSelect
                                currentAddress={currentAddress}
                                addressList={addressList}
                                onSelect={onSelectAddress}
                            ></AddressSelect>
                            <div className="adr_address_select_ft">
                                <button
                                    className="app-button-gradient"
                                    onClick={onToSelectOtherArea}
                                >选择其他区域</button>
                            </div>
                        </>
                    )
                    : (
                        <DistrictSelect></DistrictSelect>
                    )
            }
        </Modal>
    );
}

export default inject(
    ['addressSelectService', 'districtSelectService'],
    ([addressSelectService, districtSelectService]: [AddressSelectService, DistrictSelectService], props) => {
        return {
            visible: addressSelectService.visible,
            addressList: addressSelectService.addressList,
            currentAddress: addressSelectService.currentAddress,
            onBack: addressSelectService.onBack,
            onCancel: addressSelectService.onCancel,
            onSelectAddress: addressSelectService.onSelectAddress,
            onToSelectOtherArea: addressSelectService.onToSelectOtherArea,

            districtSelectVisible: districtSelectService.visible
        };
    }
)(AddressSelectModal);