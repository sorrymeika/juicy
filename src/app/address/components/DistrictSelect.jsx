import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Modal, ScrollView } from "snowball/components";
import { inject } from "snowball/app";

function DistrictSelect({
    visible,
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
    onInit,
    onCancel,
    onTabChange,
    onProvinceChange,
    onCityChange,
    onDistrictChange
}) {
    const [shown, setShown] = useState(visible);
    if (visible && !shown) {
        setShown(true);
    }

    useEffect(() => {
        if (shown) {
            return onInit();
        }
    }, [shown, onInit]);

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
        <Modal
            visible={visible}
            animate="up"
        >
            <div className="adr_district_select">
                <div className="adr_district_select_hd flex jc_c ps_r ta_c bd_b">
                    <h4>配送至</h4>
                    <button className="iconfont icon-close dock_tr" onClick={() => onCancel()}></button>
                </div>
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
                        >
                            {
                                districts && districts.map((district) => {
                                    return (
                                        <div
                                            key={district.id}
                                            onClick={() => onDistrictChange(district)}
                                            className={"adr_district_select_list_item" + (district.areaCode == currentDistrictCode ? ' curr' : '')}
                                        >{district.name}</div>
                                    );
                                })
                            }
                        </ScrollView>
                    )
                }
            </div>
        </Modal >
    );
}

export default inject(({ addressSelectService }) => (
    addressSelectService
        ? {
            visible: addressSelectService.visible,
            provinces: addressSelectService.provinces,
            cities: addressSelectService.cities,
            districts: addressSelectService.districts,

            currentTab: addressSelectService.currentTab,

            currentProvinceCode: addressSelectService.currentProvinceCode,
            currentProvinceName: addressSelectService.currentProvinceName,
            currentCityCode: addressSelectService.currentCityCode,
            currentCityName: addressSelectService.currentCityName,
            currentDistrictCode: addressSelectService.currentDistrictCode,
            currentDistrictName: addressSelectService.currentDistrictName,

            onInit: addressSelectService.onInit.emit,
            onCancel: addressSelectService.onCancel.emit,
            onTabChange: addressSelectService.onTabChange.emit,
            onProvinceChange: addressSelectService.onProvinceChange.emit,
            onCityChange: addressSelectService.onCityChange.emit,
            onDistrictChange: addressSelectService.onDistrictChange.emit
        }
        : null
))(DistrictSelect);