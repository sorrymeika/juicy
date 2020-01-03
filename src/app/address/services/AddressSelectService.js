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

        this._initListeners();
    }

    _initListeners() {
        this.onCancel = this.ctx.createEmitter(() => {
            this.visible = false;
            this.districtSelectService.hide();
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

    selectAddress(address) {
        this.globalAddressService.save(address);
        this.visible = false;
        this.districtSelectService.visible = false;
    }
}