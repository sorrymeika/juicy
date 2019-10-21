import React from 'react';
import { inject } from 'snowball/app';
import AddressSelect from '../../address/components/AddressSelect';

function PostInfo({ currentAddress, onPostClick }) {
    return (
        <div className="it_postinfo">
            <div className="flex item" onClick={onPostClick}>
                <div className="hd">送至</div>
                <div className="bd fx_1"><i className="iconfont icon-loc"></i> {
                    currentAddress
                        ? currentAddress.provinceName + currentAddress.cityName + currentAddress.districtName + (currentAddress.detail || '')
                        : ''
                }</div>
                <div className="iconfont icon-more"></div>
            </div>
            <div className="flex postinfo">
                <div className="hd">邮费</div>
                <div className="bd fx_1">包邮</div>
            </div>
            <AddressSelect></AddressSelect>
        </div>
    );
}

export default inject(({ itemService, currentAddress }) => {
    return {
        currentAddress,
        onPostClick: itemService.onPostClick.emit
    };
})(PostInfo);