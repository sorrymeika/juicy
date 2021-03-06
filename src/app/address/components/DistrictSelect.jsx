import React, { useRef, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { Modal, ScrollView } from "snowball/components";
import { inject } from "snowball/app";
import DistrictSelectService from "../services/DistrictSelectService";

function _DistrictSelect({
    provinces,
    cities,
    districts,
    currentTab,
    currentProvinceCode,
    currentProvinceName,
    currentCityCode,
    currentCityName,
    currentDistrictCode,
    currentDistrictName,
    onTabChange,
    onProvinceChange,
    onCityChange,
    onDistrictChange
}) {
    const scrollViewRef = useRef();

    useLayoutEffect(() => {
        if (scrollViewRef.current) {
            const currentItem = ReactDOM.findDOMNode(scrollViewRef.current).querySelector('.curr');
            if (currentItem) {
                scrollViewRef.current.scrollTo(0, currentItem.offsetTop, 100);
            }
        }
    }, [currentTab]);

    return (
        <div className="adr_district_select">
            <div className="adr_district_select_result flex ps_r bd_b">
                <div
                    className={currentTab == 0 ? 'curr' : ''}
                    onClick={() => onTabChange(0)}
                >{currentProvinceName || '请选择'}</div>
                {
                    !!currentProvinceCode && (
                        <div
                            className={currentTab == 1 ? 'curr' : ''}
                            onClick={() => onTabChange(1)}
                        >{currentCityName || '请选择'}</div>
                    )
                }
                {
                    !!currentCityCode && (
                        <div
                            className={currentTab == 2 ? 'curr' : ''}
                            onClick={() => onTabChange(2)}
                        >{currentDistrictName || '请选择'}</div>
                    )
                }
            </div>
            {
                currentTab == 0 && (
                    <ScrollView
                        ref={scrollViewRef}
                        className="adr_district_select_list"
                        style={{ height: window.innerHeight - 235 }}
                    >
                        {
                            provinces && provinces.map((province) => {
                                return (
                                    <div
                                        key={province.id}
                                        onClick={() => onProvinceChange(province)}
                                        className={"adr_district_select_list_item" + (province.areaCode == currentProvinceCode ? ' curr' : '')}
                                    >{province.name}</div>
                                );
                            })
                        }
                    </ScrollView>
                )
            }
            {
                currentTab == 1 && (
                    <ScrollView
                        ref={scrollViewRef}
                        className="adr_district_select_list"
                        style={{ height: window.innerHeight - 235 }}
                    >
                        {
                            cities && cities.map((city) => {
                                return (
                                    <div
                                        key={city.id}
                                        onClick={() => onCityChange(city)}
                                        className={"adr_district_select_list_item" + (city.areaCode == currentCityCode ? ' curr' : '')}
                                    >{city.name}</div>
                                );
                            })
                        }
                    </ScrollView>
                )
            }
            {
                currentTab == 2 && (
                    <ScrollView
                        ref={scrollViewRef}
                        className="adr_district_select_list"
                        style={{ height: window.innerHeight - 235 }}
                    >
                        {
                            districts && districts.map((district) => {
                                return (
                                    <div
                                        key={district.id}
                                        onClick={() => {
                                            onDistrictChange(district);
                                        }}
                                        className={"adr_district_select_list_item" + (district.areaCode == currentDistrictCode ? ' curr' : '')}
                                    >{district.name}</div>
                                );
                            })
                        }
                    </ScrollView>
                )
            }
        </div>
    );
}

export const DistrictSelect = inject(
    ['districtSelectService'], ([districtSelectService]: [DistrictSelectService]) => {
        return {
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

            onTabChange: districtSelectService.onTabChange,
            onProvinceChange: districtSelectService.onProvinceChange,
            onCityChange: districtSelectService.onCityChange,
            onDistrictChange: districtSelectService.onDistrictChange
        };
    }
)(_DistrictSelect);

function _DistrictSelectModal({
    visible,
    onInit,
    onCancel,
    ...props
}) {
    useEffect(() => {
        if (visible) {
            onInit();
        }
    }, [onInit, visible]);

    return (
        <Modal
            visible={visible}
            animate="up"
        >
            <div className="adr_district_select_hd flex jc_c ps_r ta_c bd_b">
                <h4>配送至</h4>
                <button className="iconfont icon-close dock_tr" onClick={() => onCancel()}></button>
            </div>
            <DistrictSelect {...props}></DistrictSelect>
        </Modal >
    );
}

export const DistrictSelectModal = inject(
    ['districtSelectService'], ([districtSelectService]: [DistrictSelectService], props) => {
        return {
            onInit: districtSelectService.onInit,
            onCancel: districtSelectService.onCancel,
            visible: districtSelectService.visible,
        };
    }
)(_DistrictSelectModal);