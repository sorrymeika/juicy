import { Service } from "snowball/app";
import { observable } from "snowball";

export default class AddressSelectService extends Service {
    @observable visible = false;
    @observable addressList = [];
    @observable currentAddress;

    onInit = this.ctx.createEvent();
    onBack = this.ctx.createEvent();
    onCancel = this.ctx.createEvent();
    onSelectAddress = this.ctx.createEvent();
    onToSelectOtherArea = this.ctx.createEvent();

    constructor(addressService, districtSelectService) {
        super();

        this.addressService = addressService;
        this.districtSelectService = districtSelectService;
        this.currentAddress = this.ctx.service.globalAddress.current;

        this.onInit(() => this.init());
        this.onCancel(() => {
            this.visible = false;
            this.districtSelectService.visible = false;
        });

        this.onBack(() => {
            this.districtSelectService.hide();
        });

        this.onSelectAddress((address) => this.selectAddress(address));

        this.onToSelectOtherArea(() => {
            this.districtSelectService.show();
        });

        this.districtSelectService.onSelect(([province, city, district]) => {
            this.selectAddress({
                ...province,
                ...city,
                ...district
            });
        });

        this.ctx.service.globalAddress.onAddressChange((address) => {
            this.currentAddress = address;
        });
    }

    init() {
        this.addressService.listUserAddress()
            .then(res => {
                this.addressList = res.data;
            });
    }

    selectAddress(address) {
        this.ctx.service.globalAddress.save(address);
        this.visible = false;
        this.districtSelectService.visible = false;
    }
}