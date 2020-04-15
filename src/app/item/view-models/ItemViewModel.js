import { observable } from "snowball";
import { ViewModel, autowired, emitter } from "snowball/app";
import { toast } from "snowball/widget";
import ItemShopViewModel from "./ItemShopViewModel";
import AddressSelectService from "../../address/services/AddressSelectService";

const SKU_SELECT_MODE = {
    NONE: null,
    BUY_NOW: 'buyNow',
    ADD_TO_CART: 'addToCart'
};


export default class ItemViewModel extends ViewModel {
    @observable item = {};
    @observable seller = {};
    @observable spuProps = [];
    @observable skus = [];
    @observable buyNum = 1;
    @observable currentSku = {};
    @observable detailHtml;
    @observable detailVideo;

    @observable skuSelectMode = false;
    @observable isSpecSelectModalVisible = false;

    get cartNum() {
        return this._cartNumService.total;
    }

    @autowired
    _productService;

    @autowired
    addressSelectService: AddressSelectService;

    @autowired
    cartService;

    @autowired
    _cartNumService;

    @autowired
    itemShopService: ItemShopViewModel

    @autowired
    _picturesViewModel;

    @autowired
    _itemScrollHandler;

    async init(spuId) {
        const { data } = await this._productService.getProductById(spuId);
        this.item = data.item;
        this.seller = data.seller;
        this.skus = data.skus;
        this.spuProps = data.spuProps;
        this.currentSku = data.skus[0];

        const detailRes = await this._productService.getDetailById(spuId);

        this.detailHtml = detailRes.data.content;
        this.detailVideo = detailRes.data.detailVideo;

        this.itemShopService.seller = data.seller;
        this.itemShopService.loadRecommends([data.item.id]);

        this._picturesViewModel.onReleaseToSeeMore(() => {
            this._itemScrollHandler.scrollToComponent('detail');
        });

        this.ctx.autorun(() => {
            this._picturesViewModel.pictures = this.item.pictures
                ? this.item.pictures.split(',').map((img) => this.app.sfs.completeUrl(img))
                : [];
        });
    }

    @emitter
    onPostClick() {
        this.addressSelectService.show();
    }

    @emitter
    onClickSpec() {
        this.isSpecSelectModalVisible = true;
    }

    @emitter
    onBuyNumChange(num) {
        this.buyNum = num;
    }

    @emitter
    onCancelSelectSpec() {
        this.isSpecSelectModalVisible = false;
    }

    @emitter
    onAddToCart(sku) {
        if (!sku) {
            if (this.skus.length === 1) {
                this.addToCart(this.currentSku);
            } else {
                this.showSkuSelect(SKU_SELECT_MODE.ADD_TO_CART);
            }
        } else {
            this.addToCart(sku);
        }
    }

    @emitter
    onBuyNow(sku) {
        if (!sku) {
            if (this.skus.length === 1) {
                this.buyNow(this.currentSku);
            } else {
                this.showSkuSelect(SKU_SELECT_MODE.BUY_NOW);
            }
        } else {
            this.buyNow(sku);
        }
    }

    @emitter
    onCancelSkuSelect() {
        this.skuSelectMode = SKU_SELECT_MODE.NONE;
    }

    showSkuSelect(mode) {
        this.skuSelectMode = mode;
    }

    async addToCart(sku) {
        if (!sku || !sku.id) {
            toast.showToast('请选择一个商品!');
            return;
        }

        try {
            await this.cartService.addSkuToCart(sku, this.buyNum);
            this._cartNumService.pull();
            this.skuSelectMode = SKU_SELECT_MODE.NONE;
            toast.showToast('加车成功!');
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    buyNow(sku) {
        if (!sku || !sku.id) {
            toast.showToast('请选择一个商品!');
            return;
        }
        this.skuSelectMode = SKU_SELECT_MODE.NONE;
        this.ctx.navigation.forward("/order/create?skus=" + encodeURIComponent(JSON.stringify([{ skuId: sku.id, num: 1 }])));
    }
}