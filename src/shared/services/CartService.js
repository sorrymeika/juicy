import { Service, autowired } from "snowball/app";

export default class CartService extends Service {
    @autowired
    _tradeServer;

    listUserCart() {
        return this._tradeServer.post("/cart/listUserCart");
    }

    countCartTotalNum() {
        return this._tradeServer.post("/cart/countCartTotalNum", null, {
            autoLogin: false
        });
    }

    addSkuToCart(sku, num) {
        return this._tradeServer.post("/cart/addSkuToCart", {
            skuId: sku.id,
            num,
            price: sku.price
        });
    }

    updateCartNum(cartId, num) {
        return this._tradeServer.post("/cart/updateCartNum", {
            cartId,
            num,
        });
    }

    updateCartSelected(cartId, selected) {
        return this._tradeServer.post("/cart/updateCartSelected", {
            cartId,
            selected,
        });
    }

    updateSelectedByCartIds(cartIds, selected) {
        return this._tradeServer.post("/cart/updateSelectedByCartIds", {
            cartIds,
            selected,
        });
    }

    updateAllSelected(selected) {
        return this._tradeServer.post("/cart/updateAllSelected", {
            selected,
        });
    }

    delByCartIds(cartIds) {
        return this._tradeServer.post("/cart/delByCartIds", {
            cartIds,
        });
    }
}