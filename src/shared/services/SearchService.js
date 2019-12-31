import { Service, autowired } from "snowball/app";

export const ORDER_BY = {
    DEFAULT: 0,
    SALES_ASC: 1,
    SALES_DESC: 2,
    PRICE_ASC: 3,
    PRICE_DESC: 4,
    CREATE_DT_DESC: 5,
    COMMENTS_NUM_DESC: 6,
};

type SearchConditions = {
    keywords?: string,
    sellerIds?: number[],
    types?: { type?: number }[],
    cates?: { cateId?: number, subCateId?: number, subSubCateId?: number }[],
    brandName?: string,
    minSales?: number,
    maxSales?: number,
    minPrice?: number,
    maxPrice?: number,
    orderBy?: number,
    pageIndex: number,
    pageSize: number
}

class SearchService extends Service {
    @autowired
    _tradeServer;

    searchByFormula(formulaId, pageIndex, pageSize) {
        return this._tradeServer.post('/search/searchByFormula', { formulaId, pageIndex, pageSize });
    }

    searchByConditions(conditions: SearchConditions) {
        return this._tradeServer.post('/search/searchByConditions', conditions);
    }
}

export default SearchService;