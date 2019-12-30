import { Service } from "snowball/app";

export default class CartService extends Service {
    listUserCart() {
        return this.app.server.trade.post("/cart/listUserCart");
    }

    countCartTotalNum() {
        return this.app.server.trade.post("/cart/countCartTotalNum", null, {
            autoLogin: false
        });
    }

    addSkuToCart(sku, num) {
        return this.app.server.trade.post("/cart/addSkuToCart", {
            skuId: sku.id,
            num,
            price: sku.price
        });
    }

    updateCartNum(cartId, num) {
        return this.app.server.trade.post("/cart/updateCartNum", {
            cartId,
            num,
        });
    }

    updateCartSelected(cartId, selected) {
        return this.app.server.trade.post("/cart/updateCartSelected", {
            cartId,
            selected,
        });
    }

    updateSelectedByCartIds(cartIds, selected) {
        return this.app.server.trade.post("/cart/updateSelectedByCartIds", {
            cartIds,
            selected,
        });
    }

    updateAllSelected(selected) {
        return this.app.server.trade.post("/cart/updateAllSelected", {
            selected,
        });
    }
}