import { observable } from "snowball";
import { Service } from "snowball/app";
import { toast } from "snowball/widget";

export default class OrderCreationService extends Service {
    @observable sellers = [];
    @observable total = 0;
    @observable totalAmount = 0;
    @observable totalPostFee = 0;

    onSubmit = this.ctx.createEvent();

    get orderAddress() {
        return this.orderAddressService.current;
    }

    constructor(orderService, orderAddressService) {
        super();

        this.orderService = orderService;
        this.orderAddressService = orderAddressService;

        this.onSubmit(() => {
            this.submit();
        });
    }

    init(skus) {
        this.orderAddressService.pull();
        this.orderService.getOrderBySkus(skus)
            .then(res => {
                this.sellers = res.data;
                this.totalAmount = res.totalAmount;
                this.totalPostFee = res.totalPostFee;
                this.total = res.total;
            });
    }

    async submit() {
        if (!this.orderAddress || !this.orderAddress.id) {
            toast.showToast('请选择配送地址！');
            return;
        }

        const sellerList = this.sellers.map((seller) => {
            return {
                id: seller.id,
                note: seller.note,
                invoice: seller.invoice || { type: 0, titleType: 0 },
                skus: seller.skus.map((sku) => {
                    return {
                        cartId: sku.cartId,
                        skuId: sku.skuId,
                        num: sku.num
                    };
                })
            };
        });
        console.log(sellerList, this.sellers, this.orderAddress);

        try {
            // await this.orderService.createOrder(sellerList, this.orderAddress.id);
            toast.showToast('创建订单成功！');
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}