import { Service, autowired } from "snowball/app";
import { observable } from "snowball";
import GlobalAddressService from "../../../shared/services/GlobalAddressService";
import AddressService from "../../../shared/services/AddressService";
import DistrictSelectService from "./DistrictSelectService";

export default class AddressSelectService extends Service {
    @observable visible = false;
    @observable addressList = [];
    @observable currentAddress;

    @autowired
    globalAddressService: GlobalAddressService;

    @autowired
    addressService: AddressService;

    @autowired
    districtSelectService: DistrictSelectService;

    constructor() {
        super();

        this.ctx.autorun(() => {
            this.currentAddress = this.globalAddressService.current;
        });

        this.onCancel = this.ctx.createEmitter(() => {
            this.visible = false;
            this.districtSelectService.visible = false;
        });

        this.onBack = this.ctx.createEmitter(() => {
            this.districtSelectService.hide();
        });

        this.onSelectAddress = this.ctx.createEmitter((address) =>
            this.selectAddress(address)
        );

        this.onToSelectOtherArea = this.ctx.createEmitter(() => {
            this.districtSelectService.show();
        });

        this.districtSelectService.onSelect(([province, city, district]) => {
            this.selectAddress({
                ...province,
                ...city,
                ...district
            });
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