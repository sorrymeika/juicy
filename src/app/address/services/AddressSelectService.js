import { Service, autowired, emitter } from "snowball/app";
import { observable, asObservable } from "snowball";
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

        this.currentAddress = asObservable(this.globalAddressService.current);

        this._initListeners();
    }

    _initListeners() {
        this.districtSelectService.onSelect(([province, city, district]) => {
            this.selectAddress({
                ...province,
                ...city,
                ...district
            });
        });
    }

    @emitter
    onCancel() {
        this.hide();
    }

    @emitter
    onBack() {
        this.districtSelectService.hide();
    }

    @emitter
    onSelectAddress(address) {
        this.selectAddress(address);
    }

    @emitter
    onToSelectOtherArea() {
        this.districtSelectService.show();
    }

    init() {
        if (!this._inited) {
            this._inited = true;
            this.addressService.listUserAddress()
                .then(res => {
                    this.addressList = res.data;
                });
        }
    }

    show() {
        this.init();
        this.visible = true;
    }

    hide() {
        this.visible = false;
        this.districtSelectService.hide();
    }

    selectAddress(address) {
        this.globalAddressService.save(address);
        this.visible = false;
        this.districtSelectService.visible = false;
    }
}