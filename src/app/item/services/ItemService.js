import { observable } from "snowball";
import { Service, ref, autowired } from "snowball/app";
import { toast } from "snowball/widget";
import ItemShopService from "./ItemShopService";

const SKU_SELECT_MODE = {
    NONE: null,
    BUY_NOW: 'buyNow',
    ADD_TO_CART: 'addToCart'
};


export default class ItemService extends Service {
    @observable headerVisible = false;
    @observable scrollPos = 'basic';

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

    @autowired
    productService;

    @autowired
    addressSelectService;

    @autowired
    cartService;

    @autowired
    cartNumService;

    @autowired
    itemShopService: ItemShopService

    @autowired
    picturesService;

    constructor() {
        super();

        this._registerListeners();
    }

    _registerListeners() {
        this.onScroll = this.ctx.createEvent(this.createScrollHandler());

        this.onPostClick = this.ctx.createEvent(() => {
            this.addressSelectService.visible = true;
        });

        this.onClickSpec = this.ctx.createEvent(() => {
            this.isSpecSelectModalVisible = true;
        });

        this.onBuyNumChange = this.ctx.createEvent((num) => {
            this.buyNum = num;
        });

        this.onCancelSelectSpec = this.ctx.createEvent(() => {
            this.isSpecSelectModalVisible = false;
        });

        this.onAddToCart = this.ctx.createEvent((sku) => {
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

        this.onBuyNow = this.ctx.createEvent((sku) => {
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

        this.onCancelSkuSelect = this.ctx.createEvent(() => {
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

        this.itemShopService.seller = data.seller;
        this.itemShopService.loadRecommends([data.item.id]);

        this.picturesService.onReleaseToSeeMore(() => {
            this.scrollToComponent('detail');
        });

        this.ctx.autorun(() => {
            this.picturesService.pictures = this.item.pictures
                ? this.item.pictures.split(',').map((img) => this.app.sfs.completeUrl(img))
                : [];
        });
    }

    scrollToComponent(componentName) {
        const node = this.ctx.page.findNode(`[item-component-name=${componentName}]`);
        this.mainScrollViewRef.current.scrollTo(0, node.offsetTop - 64, 200);
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
                scrollMarks = [...e.target.querySelectorAll('[item-component-name]')];
            }

            let maxTop;
            let current;

            scrollMarks.forEach((el) => {
                let top = el.getBoundingClientRect().top;
                if (top <= 80) {
                    if (top > maxTop || maxTop == null) {
                        current = el.getAttribute('item-component-name');
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