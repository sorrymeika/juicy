import { observable } from "snowball";
import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class ItemService extends Service {
    @observable item = {};
    @observable seller = {};
    @observable spuProps = [];
    @observable skus = [];
    @observable buyNum = 1;
    @observable currentSku = {};

    @observable isSpecSelectModalVisible = false;

    onPostClick = this.ctx.createEvent();
    onBuyNumChange = this.ctx.createEvent();

    onAddToCart = this.ctx.createEvent();
    onBuyNow = this.ctx.createEvent();

    onConfirmSku = this.ctx.createEvent();
    onCancelSkuSelect = this.ctx.createEvent();

    constructor(
        productService,
        addressSelectService
    ) {
        super();

        this.addressSelectService = addressSelectService;
        this.productService = productService;

        this.onPostClick(() => {
            this.addressSelectService.visible = true;
        });

        this.onBuyNumChange((num) => {
            this.buyNum = num;
        });

        this.onAddToCart((sku) => {
            if (!sku) {
                if (this.skus.length === 1) {
                    this.addToCart(this.currentSku);
                } else {
                    this.showSkuSelect();
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
                    this.showSkuSelect();
                }
            } else {
                this.buyNow(sku);
            }
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

    showSkuSelect() {
    }

    addToCart(sku) {
        if (!sku || !sku.id) {
            toast.showToast('请选择一个商品!');
            return;
        }
    }

    buyNow(sku) {
        if (!sku || !sku.id) {
            toast.showToast('请选择一个商品!');
            return;
        }
    }
}