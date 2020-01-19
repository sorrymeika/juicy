import { observable, util } from "snowball";
import { Service, autowired, param, emitter } from "snowball/app";
import { toast } from "snowball/widget";

import InvoiceService from "../services/InvoiceService";
import OrderService from "../../../shared/services/OrderService";

export default class InvoiceViewModel extends Service {
    @param
    sellerId;

    @observable
    data = {};

    @observable isInvoiceSelectorVisible = false;
    @observable invoiceList = [];
    onCloseInvoiceSelector = this.ctx.createEmitter();
    onSelectInvoice = this.ctx.createEmitter();

    @autowired
    _invoiceService: InvoiceService;

    @autowired
    _orderService: OrderService;

    constructor() {
        super();

        this.onCloseInvoiceSelector(() => {
            this.isInvoiceSelectorVisible = false;
        });
        this.onSelectInvoice((invoice) => {
            this.data = invoice;
            this.isInvoiceSelectorVisible = false;
        });
    }

    init() {
        this._invoiceService.listInvoice()
            .then((res) => {
                this.invoiceList = res.data;
                this.data = (res.data.length && res.data.find(invoice => invoice.isDefault)) || {
                    type: 1,
                    titleType: 1,
                    isDefault: false
                };
            });
    }

    @emitter
    onShowInvoiceSelector() {
        this.isInvoiceSelectorVisible = true;
    }

    onFieldChange(name, value) {
        this.data.withMutations((data) => {
            data.set(name, value);
        });
    }

    @emitter('onConfirm')
    async confirm() {
        if (!this.data.title) {
            toast.showToast('请设置抬头!');
            return;
        }

        if (this.data.titleType == 2 && !this.data.taxCode) {
            toast.showToast('请设置税号!');
            return;
        }

        if (this.data.type == 2) {
            if (!this.data.phoneNo) {
                toast.showToast('请填写收票人手机号!');
                return;
            } else if (!util.validateMobile(this.data.phoneNo)) {
                toast.showToast('请正确填写收票人手机号!');
                return;
            }
        }

        const invoice = {
            isDefault: !!this.data.isDefault,
            type: this.data.type,
            titleType: this.data.titleType,
            title: this.data.title,
            taxCode: this.data.titleType == 2 ? this.data.taxCode : null,
            phoneNo: this.data.type == 2 ? this.data.phoneNo : null
        };

        try {
            await this._invoiceService.addInvoice(invoice);

            this._orderService.onInvoiceChange({
                ...invoice,
                sellerId: this.sellerId
            });

            this.ctx.navigation.back();
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}