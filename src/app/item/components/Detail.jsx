import React from 'react';
import { inject } from 'snowball/app';

function Detail({ detailHtml }) {
    return (
        <div
            className="it_detail"
            item-component-name="detail"
        >
            <div className="it_detail_tit ta_c flex"><p className="fx_1 bd_b"></p><p className="tit">商品详情</p><p className="fx_1 bd_b"></p></div>
            <div
                className="it_detail_con"
                dangerouslySetInnerHTML={{
                    __html: detailHtml
                }}
            />
        </div>
    );
}

export default inject(({ itemViewModel }, props) => {
    return {
        detailHtml: itemViewModel.detailHtml
    };
})(Detail);