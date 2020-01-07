import { Service, autowired } from "snowball/app";
import { observable } from "snowball";
import AddressService from "../../../shared/services/AddressService";

export default class DistrictSelectService extends Service {
    @observable visible = false;
    @observable provinces = [];
    @observable cities = [];
    @observable districts = [];

    @observable currentProvinceCode;
    @observable currentProvinceName;
    @observable currentCityCode;
    @observable currentCityName;
    @observable currentDistrictCode;
    @observable currentDistrictName;

    @observable currentTab = 0;

    onInit = this.ctx.createEmitter();
    onLoad = this.ctx.createEmitter();
    onCancel = this.ctx.createEmitter();
    onTabChange = this.ctx.createEmitter();
    onProvinceChange = this.ctx.createEmitter();
    onCityChange = this.ctx.createEmitter();
    onDistrictChange = this.ctx.createEmitter();
    onSelect = this.ctx.createEmitter();

    @autowired
    addressService: AddressService;

    constructor() {
        super();

        this._registerListeners();
    }

    _registerListeners() {
        this.onInit.once(() => this.init());

        this.onTabChange((tab) => {
            this.currentTab = tab;
        });

        this.onCancel(() => {
            this.visible = false;
        });

        this.onProvinceChange((province) => {
            this.selectProvince(province.areaCode);
            this.selectCity('');
            this.selectDistrict('');
        });

        this.onCityChange((city) => {
            this.selectCity(city.areaCode);
            this.selectDistrict('');
        });

        this.onDistrictChange((district) => {
            this.selectDistrict(district.areaCode);
            this.onSelect.emit([{
                provinceCode: this.currentProvinceCode,
                provinceName: this.currentProvinceName
            }, {
                cityCode: this.currentCityCode,
                cityName: this.currentCityName
            }, {
                districtCode: district.areaCode,
                districtName: district.name
            }]);
        });
    }

    async init() {
        const res = await this.addressService.getProvinces();
        this.provinces = res.data;
        this.onLoad.emit();
        this.loaded = true;
    }

    show({ provinceCode, cityCode, districtCode } = {}) {
        this.visible = true;
        this.onInit.emit();
        if (this.loaded) {
            this.setSelectedAddress(provinceCode, cityCode, districtCode);
        } else {
            this.onLoad.once(() => {
                this.setSelectedAddress(provinceCode, cityCode, districtCode);
            });
        }
    }

    hide() {
        this.visible = false;
    }

    async setSelectedAddress(provinceCode = '', cityCode = '', districtCode = '') {
        await this.selectProvince(provinceCode);
        await this.selectCity(cityCode);
        await this.selectDistrict(districtCode);
        this.currentTab = districtCode ? 2 : cityCode ? 1 : 0;
    }

    async selectProvince(provinceCode) {
        if (this.currentProvinceCode != provinceCode) {
            this.currentProvinceCode = provinceCode;
            if (!provinceCode) {
                this.currentProvinceName = '';
                this.cities = [];
                this.currentTab = 0;
            } else {
                this.currentProvinceName = this.provinces.find((province) => province.areaCode == provinceCode).name;
                const res = await this.addressService.getCitiesByProvinceCode(provinceCode);
                this.cities = res.data;
                this.currentTab = 1;
            }
        }
    }

    async selectCity(cityCode) {
        if (this.currentCityCode != cityCode) {
            this.currentCityCode = cityCode;

            if (!cityCode) {
                this.currentCityName = '';
                this.districts = [];
                this.currentTab = 1;
            } else {
                this.currentCityName = this.cities.find((city) => city.areaCode == cityCode).name;

                const res = await this.addressService.getDistrictsByCityCode(cityCode);
                this.districts = res.data;
                this.currentTab = 2;
            }
        }
    }

    async selectDistrict(districtCode) {
        if (this.currentDistrictCode != districtCode) {
            this.currentDistrictCode = districtCode;
            if (!districtCode) {
                this.currentDistrictName = '';
            } else {
                this.currentDistrictName = this.districts.find((district) => district.areaCode == districtCode).name;
            }
        }
    }
}