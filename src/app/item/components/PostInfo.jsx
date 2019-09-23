import React from 'react';

export default function PostInfo() {
    return (
        <div className="it_postinfo">
            <div className="flex item">
                <div className="hd">送至</div>
                <div className="bd fx_1"><i className="iconfont icon-loc"></i> 上海市</div>
                <div className="iconfont icon-more"></div>
            </div>
            <div className="flex postinfo">
                <div className="hd">邮费</div>
                <div className="bd fx_1">包邮</div>
            </div>
        </div>
    );
}