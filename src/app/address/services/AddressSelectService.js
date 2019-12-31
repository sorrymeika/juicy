import { Service, autowired } from "snowball/app";
import { observable } from "snowball";
import GlobalAddressService from "../../../shared/services/GlobalAddressService";
import AddressService from "../../../shared/services/AddressService";
import DistrictSelectService from "./DistrictSelectService";

export default class AddressSelectService extends Service {
    @observable visible = false;
    @observable addressList = [];
    @observable currentAddress;

    onBack = this.ctx.createEvent();
    onCancel = this.ctx.createEvent();
    onSelectAddress = this.ctx.createEvent();
    onToSelectOtherArea = this.ctx.createEvent();

    @autowired
    globalAddressService: GlobalAddressService;

    @autowired
    addressService: AddressService;

    @autowired
    districtSelectService: DistrictSelectService;

    constructor() {
        super();

        this.currentAddress = this.globalAddressService.current;

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

        this.globalAddressService.onAddressChange((address) => {
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
        this.globalAddressService.save(address);
        this.visible = false;
        this.districtSelectService.visible = false;
    }
}