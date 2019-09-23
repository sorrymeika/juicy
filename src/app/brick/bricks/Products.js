import { BrickBase } from "../core/BrickBase";

class Products extends BrickBase {
    processData(data) {
        let search;
        const products = data.products || [];

        if (data.type == 1) {
            const formulaId = Number(data.formulaId);
            const maxNum = Number(data.maxNum);

            search = this.context.searchService.searchByFormula(formulaId, 1, maxNum);
        } else {
            const ids = products.map(prd => prd.id);
            search = this.context.productService.getSpusByIds(ids);
        }

        search.then((res) => {
            this.model.set({
                products: res.data.map((prd) => {
                    const [priceInt, priceDec] = prd.price.toFixed(2).split('.');
                    const [maxPriceIntegerPart, maxPriceDecimalPart] = prd.maxPrice.toFixed(2).split('.');
                    return {
                        ...prd,
                        src: this.props.ctx.sfs.completeUrl(prd.pictures.split(',')[0], '380x380', '80-2'),
                        priceIntegerPart: priceInt,
                        priceDecimalPart: priceDec,
                        maxPriceIntegerPart,
                        maxPriceDecimalPart,
                    };
                })
            });
        });

        return {
            cols: data.cols,
            products
        };
    }
}

export default Products;