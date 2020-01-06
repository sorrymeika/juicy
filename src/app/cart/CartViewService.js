import { observable, util, asObservable } from "snowball";
import { Service, autowired } from "snowball/app";
import { toast } from "snowball/widget";
import CartService from "../../shared/services/CartService";

export default class CartViewService extends Service {
    @observable sellers = [];
    @observable unavailableSkus = [];
    @observable total = 0;
    @observable amount = 0;
    @observable selectedCount = 0;

    @autowired
    cartService: CartService;

    @autowired
    cartNumService;

    constructor() {
        super();

        this.onSelectSku = this.ctx.createEmitter((item) => this.selectItem(item));
        this.onSelectSeller = this.ctx.createEmitter((sellerId) => this.selectSeller(sellerId));
        this.onSelectAll = this.ctx.createEmitter((selected) => this.selectAll(selected));

        this.onCartNumChange = this.ctx.createEmitter((item) =>
            this.changeCartNum(item)
        );

        this.onCheckout = this.ctx.createEmitter(() =>
            this.checkout()
        );
    }

    async loadUserCart() {
        const res = await this.cartService.listUserCart();
        this._syncDataFromRemoteResult(res);
        return res;
    }

    _syncDataFromRemoteResult = (res) => {
        this.sellers = res.data;
        this.unavailableSkus = res.unavailableSkus;
        this.total = res.total;
        this.amount = res.amount;
        this.selectedCount = res.selectedCount;
        this.cartNumService.total = this.total;
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

        const currentObs = asObservable(current).set({
            num: item.num
        });

        if (item.num) {
            this._updateRemoteCartNum(item, currentObs);
        } else {
            this._updateRemoteCartNum.clear();
        }
    }

    _updateRemoteCartNum = util.debounce(async (item, cartObs) => {
        this.updatingNum = true;
        try {
            const res = await this.cartService.updateCartNum(item.id, item.num);
            this._syncDataFromRemoteResult(res);
        } catch (e) {
            toast.showToast(e.message);
            cartObs.set({
                num: item.oldNum
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