import { observable, util } from "snowball";
import { Service, autowired } from "snowball/app";
import { toast } from "snowball/widget";

import UserService from "../../../shared/services/UserService";

export default class InvoiceService extends Service {
    sellerId;

    @observable data = {};

    onFieldChange = this.ctx.createEmitter();
    onShowInvoiceSelector = this.ctx.createEmitter();

    @observable isInvoiceSelectorVisible = false;
    @observable invoiceList = [];
    onCloseInvoiceSelector = this.ctx.createEmitter();
    onSelectInvoice = this.ctx.createEmitter();

    onInit = this.ctx.createEmitter();
    onConfirm = this.ctx.createEmitter();

    @autowired
    userService: UserService

    constructor(userService) {
        super();

        this.onFieldChange(({ name, value }) => {
            this.data.withMutations((data) => {
                data.set(name, value);
            });
        });

        this.onInit(() => this.init());

        this.onShowInvoiceSelector(() => {
            this.isInvoiceSelectorVisible = true;
        });
        this.onCloseInvoiceSelector(() => {
            this.isInvoiceSelectorVisible = false;
        });
        this.onSelectInvoice((invoice) => {
            this.data = invoice;
            this.isInvoiceSelectorVisible = false;
        });

        this.onConfirm(() => this.confirm());
    }

    init() {
        this.userService.listInvoice()
            .then((res) => {
                this.invoiceList = res.data;
                this.data = (res.data.length && res.data.find(invoice => invoice.isDefault)) || {
                    type: 1,
                    titleType: 1,
                    isDefault: false
                };
            });
    }

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
            await this.userService.addInvoice(invoice);

            this.ctx.service.order.onInvoiceChange.emit({
                ...invoice,
                sellerId: this.sellerId
            });

            this.ctx.navigation.back();
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}