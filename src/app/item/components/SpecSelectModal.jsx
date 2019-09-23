import React from 'react';
import { inject } from "snowball/app";

function SpecSelect({ minPrice, maxPrice, sales }) {
    return (
        <div className="flex">
            <div className="fx_1">
                {minPrice == null ? '' : minPrice.toFixed(2)}
                {
                    minPrice == maxPrice || maxPrice == null
                        ? ''
                        : ('~' + maxPrice.toFixed(2))
                }
            </div>
            <div>
                已售{sales}
            </div>
        </div>
    );
}

export default inject(({ itemService }) => (
    itemService
        ? {
            minPrice: itemService.item.minPrice,
            maxPrice: itemService.item.maxPrice,
            sales: itemService.item.sales
        }
        : {}
))(SpecSelect);