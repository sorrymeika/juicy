import React from 'react';
import { inject, autowired } from "snowball/app";

function Money({ minPrice, maxPrice, sales }) {
    const [minPriceLeft, minPriceRight] = minPrice == null ? [] : minPrice.toFixed(2).split('.');
    const [maxPriceLeft, maxPriceRight] = minPrice == null ? [] : maxPrice.toFixed(2).split('.');

    return (
        <div className="it_money flex">
            <div className="it_money_price fx_1">
                {
                    minPrice == null
                        ? ''
                        : <span className="price">
                            <i>{minPriceLeft}</i>
                            <em>.{minPriceRight}</em>
                        </span>
                }
                {
                    maxPrice == minPrice || maxPrice == null
                        ? ''
                        : (
                            <>
                                <span> ~ </span>
                                <span className="price">
                                    <i>{maxPriceLeft}</i>
                                    <em>.{maxPriceRight}</em>
                                </span>
                            </>
                        )
                }
            </div>
            {
                sales
                    ?
                    <div className="it_money_sales">
                        已售{sales}
                    </div>
                    : null
            }
        </div>
    );
}

export default inject(() => {
    const itemViewModel = autowired('itemViewModel');
    return {
        minPrice: itemViewModel.item.minPrice,
        maxPrice: itemViewModel.item.maxPrice,
        sales: itemViewModel.item.sales
    };
})(Money);