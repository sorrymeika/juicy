import { observable } from "snowball";
import { Service } from "snowball/app";
import { toast } from "snowball/widget";

const SKU_SELECT_MODE = {
    NONE: null,
    BUY_NOW: 'buyNow',
    ADD_TO_CART: 'addToCart'
};


export default class ItemService extends Service {
    @observable item = {};
    @observable seller = {};
    @observable spuProps = [];
    @observable skus = [];
    @observable buyNum = 1;
    @observable currentSku = {};

    @observable skuSelectMode = false;
    @observable isSpecSelectModalVisible = false;

    onPostClick = this.ctx.createEvent();

    onClickSpec = this.ctx.createEvent();
    onSpecChange = this.ctx.createEvent();
    onBuyNumChange = this.ctx.createEvent();
    onCancelSelectSpec = this.ctx.createEvent();

    onAddToCart = this.ctx.createEvent();
    onBuyNow = this.ctx.createEvent();

    onConfirmSku = this.ctx.createEvent();
    onCancelSkuSelect = this.ctx.createEvent();

    constructor(
        productService,
        districtSelectService,
        cartService
    ) {
        super();

        this.districtSelectService = districtSelectService;
        this.productService = productService;
        this.cartService = cartService;

        this.onPostClick(() => {
            this.districtSelectService.visible = true;
        });

        this.onClickSpec(() => {
            this.isSpecSelectModalVisible = true;
        });

        this.onBuyNumChange((num) => {
            this.buyNum = num;
        });

        this.onCancelSelectSpec(() => {
            this.isSpecSelectModalVisible = false;
        });

        this.onAddToCart((sku) => {
            if (!sku) {
                if (this.skus.length === 1) {
                    this.addToCart(this.currentSku);
                } else {
                    this.showSkuSelect(SKU_SELECT_MODE.ADD_TO_CART);
                }
            } else {
                this.addToCart(sku);
            }
        });

        this.onBuyNow((sku) => {
            if (!sku) {
                if (this.skus.length === 1) {
                    this.buyNow(this.currentSku);
                } else {
                    this.showSkuSelect(SKU_SELECT_MODE.BUY_NOW);
                }
            } else {
                this.buyNow(sku);
            }
        });

        this.onCancelSkuSelect(() => {
            this.skuSelectMode = SKU_SELECT_MODE.NONE;
        });
    }

    async init(spuId) {
        const { data } = await this.productService.getProductById(spuId);
        this.item = data.item;
        this.seller = data.seller;
        this.skus = data.skus;
        this.spuProps = data.spuProps;
        this.currentSku = data.skus[0];
    }

    showSkuSelect(mode) {
        this.skuSelectMode = mode;
    }

    async addToCart(sku) {
        console.log(sku, this.buyNum);
        if (!sku || !sku.id) {
            toast.showToast('请选择一个商品!');
            return;
        }

        try {
            await this.cartService.addSkuToCart(sku, this.buyNum);
            this.skuSelectMode = SKU_SELECT_MODE.NONE;
        } catch (e) {
            toast.showToast(e.message);
        }
    }

    buyNow(sku) {
        console.log(sku);

        if (!sku || !sku.id) {
            toast.showToast('请选择一个商品!');
            return;
        }

        this.skuSelectMode = SKU_SELECT_MODE.NONE;
    }
}