import { observable } from "snowball";
import { Service, ref } from "snowball/app";
import { toast } from "snowball/widget";

const SKU_SELECT_MODE = {
    NONE: null,
    BUY_NOW: 'buyNow',
    ADD_TO_CART: 'addToCart'
};


export default class ItemService extends Service {
    @observable headerVisible = false;
    @observable scrollPos = 'basic';
    onScroll = this.ctx.createEvent();
    onScrollToComponent = this.ctx.createEvent();

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

    @ref mainScrollViewRef;

    get cartNum() {
        return this.cartNumService.total;
    }

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
        addressSelectService,
        cartService,
        cartNumService
    ) {
        super();

        this.addressSelectService = addressSelectService;
        this.productService = productService;
        this.cartService = cartService;
        this.cartNumService = cartNumService;

        this.onScroll(this.createScrollHandler());

        this.onScrollToComponent((pos) => {
            const node = this.ctx.page.findNode(`[item-scroll-mark=${pos}]`);
            this.mainScrollViewRef.current.scrollTo(0, node.offsetTop - 64, 200);
        });

        this.onPostClick(() => {
            this.addressSelectService.visible = true;
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

        const detailRes = await this.productService.getDetailById(spuId);

        this.detailHtml = detailRes.data.content;
        this.detailVideo = detailRes.data.detailVideo;
    }

    createScrollHandler() {
        let scrollMarks;
        let timeout;

        return (e) => {
            if (e.y == 0) {
                if (this.headerVisible) {
                    this.headerVisible = false;
                }
            } else if (!this.headerVisible) {
                this.headerVisible = true;
            }

            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                timeout = scrollMarks = null;
            }, 1000);

            if (!scrollMarks) {
                scrollMarks = [...e.target.querySelectorAll('[item-scroll-mark]')];
            }

            let maxTop;
            let current;

            scrollMarks.forEach((el) => {
                let top = el.getBoundingClientRect().top;
                if (top <= 80) {
                    if (top > maxTop || maxTop == null) {
                        current = el.getAttribute('item-scroll-mark');
                        maxTop = top;
                    }
                }
            });

            if (current && this.scrollPos != current) {
                this.scrollPos = current;
            }
        };
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
            this.cartNumService.pull();
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