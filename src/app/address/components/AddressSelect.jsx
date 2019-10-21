import React, { useEffect } from "react";
import { inject } from "snowball/app";
import { Modal, ScrollView } from "snowball/components";
import { DistrictSelect } from "./DistrictSelect";

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
    districtSelectProps,
    onInit,
    onCancel,
    onBack,
    onSelectAddress,
    onToSelectOtherArea
}) {
    useEffect(() => {
        if (visible) {
            return onInit();
        }
    }, [onInit, visible]);

    return (
        <Modal
            visible={visible}
            animate="up"
            onCancel={onCancel}
        >
            <div className="adr_district_select_hd flex jc_c ps_r ta_c bd_b">
                {
                    districtSelectProps.visible && (
                        <button className="iconfont icon-back dock_tl" onClick={() => onBack()}></button>
                    )
                }
                <h4>配送至</h4>
                <button className="iconfont icon-close dock_tr" onClick={() => onCancel()}></button>
            </div>
            {
                !districtSelectProps.visible
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
                        <DistrictSelect {...districtSelectProps}></DistrictSelect>
                    )
            }

        </Modal>
    );
}

export default inject(({ addressSelectService, districtSelectService }) => (
    addressSelectService && districtSelectService
        ? {
            visible: addressSelectService.visible,
            addressList: addressSelectService.addressList,
            currentAddress: addressSelectService.currentAddress,
            onInit: addressSelectService.onInit.emit,
            onBack: addressSelectService.onBack.emit,
            onCancel: addressSelectService.onCancel.emit,
            onSelectAddress: addressSelectService.onSelectAddress.emit,
            onToSelectOtherArea: addressSelectService.onToSelectOtherArea.emit,

            districtSelectProps: {
                visible: districtSelectService.visible,
                provinces: districtSelectService.provinces,
                cities: districtSelectService.cities,
                districts: districtSelectService.districts,

                currentTab: districtSelectService.currentTab,

                currentProvinceCode: districtSelectService.currentProvinceCode,
                currentProvinceName: districtSelectService.currentProvinceName,
                currentCityCode: districtSelectService.currentCityCode,
                currentCityName: districtSelectService.currentCityName,
                currentDistrictCode: districtSelectService.currentDistrictCode,
                currentDistrictName: districtSelectService.currentDistrictName,

                onTabChange: districtSelectService.onTabChange.emit,
                onProvinceChange: districtSelectService.onProvinceChange.emit,
                onCityChange: districtSelectService.onCityChange.emit,
                onDistrictChange: districtSelectService.onDistrictChange.emit
            }
        }
        : null
))(AddressSelectModal);