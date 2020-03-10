import { observable, util, asObservable } from "snowball";
import { autowired, ViewModel } from "snowball/app";
import { toast } from "snowball/widget";
import CartService from "../../../shared/services/CartService";

export default class CartViewModel extends ViewModel {
    @observable
    isInEditMode = false;

    @observable
    sellers = [];

    @observable
    unavailableSkus = [];

    @observable
    total = 0;

    @observable
    amount = 0;

    @observable
    selectedCount = 0;

    @autowired
    _cartService: CartService;

    @autowired
    _cartNumService;

    async loadUserCart() {
        const res = await this._cartService.listUserCart();
        this._setData(res);
        return res;
    }

    _setData = (res) => {
        this.sellers = res.data;
        this.unavailableSkus = res.unavailableSkus;
        this.total = res.total;
        this.amount = res.amount;
        this.selectedCount = res.selectedCount;
        this._cartNumService.total = this.total;
    }

    toggleEditMode() {
        this.isInEditMode = !this.isInEditMode;
    }

    async selectItem(item) {
        try {
            const res = await this._cartService.updateCartSelected(item.id, item.selected);
            this._setData(res);
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    async selectSeller(sellerId) {
        const seller = this.sellers.find(seller => seller.id == sellerId);
        const unselectedItems = seller.skus.filter(sku => !sku.selected);
        let selected = false;
        let cartIds;
        if (unselectedItems.length) {
            selected = true;
            cartIds = unselectedItems.map(item => item.id);
        } else {
            cartIds = seller.skus.map(item => item.id);
        }

        try {
            const res = await this._cartService.updateSelectedByCartIds(cartIds, selected);
            this._setData(res);
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    async selectAll(selected) {
        try {
            const res = await this._cartService.updateAllSelected(selected);
            this._setData(res);
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    changeCartNum(item) {
        if (this.updatingNum) return;

        let current;
        for (let i = 0; i < this.sellers.length; i++) {
            const seller = this.sellers[i];
            current = seller.skus.find(sku => item.id === sku.id);
            if (current) {
                break;
            }
        }
        if (!current) {
            throw new Error('变更购物车数量参数错误!');
        }

        const currentObs = asObservable(current).set({
            num: item.num
        });

        if (item.num) {
            this._updateCartNum(item, currentObs);
        } else {
            this._updateCartNum.clearDebounce();
        }
    }

    _updateCartNum = util.debounce(async (item, cartObs) => {
        this.updatingNum = true;
        try {
            const res = await this._cartService.updateCartNum(item.id, item.num);
            this._setData(res);
        } catch (e) {
            toast.showToast(e.message);
            cartObs.set({
                num: item.oldNum
            });
        }
        this.updatingNum = false;
    }, 300)

    async delSelectedItems() {
        const skus = this._getSelectedItems();
        if (!skus.length) {
            toast.showToast('请至少选择一个商品！');
            return;
        }

        try {
            const res = await this._cartService.delByCartIds(skus.map(sku => sku.cartId));
            toast.showToast('删除成功！');
            this._setData(res);
        } catch (error) {
            toast.showToast(error.message);
        }
    }

    checkout() {
        const skus = this._getSelectedItems();
        if (!skus.length) {
            toast.showToast('请至少选择一个商品！');
            return;
        }
        this.ctx.navigation.forward("/order/create?skus=" + encodeURIComponent(JSON.stringify(skus)));
    }

    _getSelectedItems() {
        const skus = this.sellers
            .reduce((result, seller) => {
                const skus = seller.skus
                    .filter(sku => sku.selected)
                    .map(sku => ({
                        cartId: sku.id,
                        skuId: sku.skuId,
                        num: sku.num
                    }));

                return !!skus.length ? result.concat(skus) : result;
            }, []);

        return skus;
    }
}