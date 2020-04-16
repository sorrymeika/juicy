import React from 'react';
import { inject, autowired } from 'snowball/app';

function Title({ title }) {
    return (
        <div className="it_title flex ai_fs">
            <div className="fx_1 tit">{title}</div>
            <div className="ta_c fav bd_l">
                <div className="iconfont icon-like"></div>
                <p>收藏</p>
            </div>
        </div>
    );
}

export default inject(() => {
    const itemViewModel = autowired('itemViewModel');
    return {
        title: itemViewModel.item.title
    };
})(Title);