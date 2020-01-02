import { observable } from "snowball";
import { Service, autowired } from "snowball/app";
import { toast } from "snowball/widget";
import OrderService from "../../../shared/services/OrderService";
import AddressService from "../../../shared/services/AddressService";

export default class OrderCreationService extends Service {
    @observable sellers = [];
    @observable total = 0;
    @observable totalAmount = 0;
    @observable totalPostFee = 0;

    onSubmit = this.ctx.createEmitter();
    onNoteChange = this.ctx.createEmitter();

    @observable orderAddress;

    @autowired
    orderService: OrderService;

    @autowired
    addressService: AddressService;

    constructor(orderService, addressService) {
        super();

        this.onNoteChange(({ sellerId, note }) => {
            const seller = this.sellers.find(seller => seller.id == sellerId);
            if (seller) {
                seller.withMutations((sellerModel) => {
                    sellerModel.set('note', note);
                });
            }
        });

        this.onSubmit(() => {
            this.submit();
        });

        this.ctx.autoDispose(
            this.orderService.onAddressChange((data) => {
                this.orderAddress = data;
            })
        );

        this.ctx.autoDispose(
            this.orderService.onInvoiceChange((data) => {
                console.log(data);
                const seller = this.sellers.find(seller => seller.id == data.sellerId);
                if (seller) {
                    seller.withMutations((sellerModel) => {
                        sellerModel.set('invoice', data);
                    });
                }
            })
        );
    }

    init(skus) {
        this.addressService.getDefaultAddress()
            .then((res) => {
                this.orderAddress = res.data || null;
            });

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
            const res = await this.orderService.createOrder(sellerList, this.orderAddress.id);
            toast.showToast('下单成功！');
            this.ctx.navigation.replace(`/pay/${res.data.id}`);
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}