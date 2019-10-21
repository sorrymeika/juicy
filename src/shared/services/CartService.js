export default class CartService {
    listUserCart() {
        return this.ctx.server.trade.post("/cart/listUserCart");
    }

    countCartTotalNum() {
        return this.ctx.server.trade.post("/cart/countCartTotalNum");
    }

    addSkuToCart(sku, num) {
        return this.ctx.server.trade.post("/cart/addSkuToCart", {
            skuId: sku.id,
            num,
            price: sku.price
        });
    }

    updateCartNum(cartId, num) {
        return this.ctx.server.trade.post("/cart/updateCartNum", {
            cartId,
            num,
        });
    }

    updateCartSelected(cartId, selected) {
        return this.ctx.server.trade.post("/cart/updateCartSelected", {
            cartId,
            selected,
        });
    }

    updateSelectedByCartIds(cartIds, selected) {
        return this.ctx.server.trade.post("/cart/updateSelectedByCartIds", {
            cartIds,
            selected,
        });
    }

    updateAllSelected(selected) {
        return this.ctx.server.trade.post("/cart/updateAllSelected", {
            selected,
        });
    }
}