import { observable, util } from "snowball";
import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class CartListService extends Service {
    @observable sellers = [];
    @observable unavailableSkus = [];
    @observable total = 0;
    @observable amount = 0;
    @observable selectedCount = 0;

    onInit = this.ctx.createEvent();

    onSelectSku = this.ctx.createEvent();
    onSelectSeller = this.ctx.createEvent();
    onSelectAll = this.ctx.createEvent();
    onCartNumChange = this.ctx.createEvent();

    onCheckout = this.ctx.createEvent();


    constructor(cartService) {
        super();

        this.cartService = cartService;

        this.onInit.once(() => this.loadUserCart());

        this.onSelectSku((item) => this.selectItem(item));
        this.onSelectSeller((sellerId) => this.selectSeller(sellerId));
        this.onSelectAll((selected) => this.selectAll(selected));
        this.onCartNumChange((item) => this.changeCartNum(item));

        this.onCheckout(() => this.checkout());
    }

    loadUserCart() {
        this.cartService.listUserCart()
            .then(this._syncDataFromRemoteResult);
    }

    _syncDataFromRemoteResult = (res) => {
        this.sellers = res.data;
        this.unavailableSkus = res.unavailableSkus;
        this.total = res.total;
        this.amount = res.amount;
        this.selectedCount = res.selectedCount;
    }

    async selectItem(item) {
        try {
            const res = await this.cartService.updateCartSelected(item.id, item.selected);
            this._syncDataFromRemoteResult(res);
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
            const res = await this.cartService.updateSelectedByCartIds(cartIds, selected);
            this._syncDataFromRemoteResult(res);
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    async selectAll(selected) {
        try {
            const res = await this.cartService.updateAllSelected(selected);
            this._syncDataFromRemoteResult(res);
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

        current.withMutations((cart) => {
            cart.set({
                num: item.num
            });
        });

        if (item.num) {
            this._updateRemoteCartNum(item, current);
        } else {
            this._updateRemoteCartNum.clear();
        }
    }

    _updateRemoteCartNum = util.debounce(async (item, current) => {
        this.updatingNum = true;
        try {
            const res = await this.cartService.updateCartNum(item.id, item.num);
            this._syncDataFromRemoteResult(res);
        } catch (e) {
            toast.showToast(e.message);
            current.withMutations((cart) => {
                cart.set({
                    num: item.oldNum
                });
            });
        }
        this.updatingNum = false;
    }, 300)

    checkout() {
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

        this.ctx.navigation.forward("/order/create?skus=" + encodeURIComponent(JSON.stringify(skus)));
    }
}