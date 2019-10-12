import { Service } from "snowball/app";
import { observable } from "snowball";

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

    onInit = this.ctx.createEvent();
    onCancel = this.ctx.createEvent();
    onTabChange = this.ctx.createEvent();
    onProvinceChange = this.ctx.createEvent();
    onCityChange = this.ctx.createEvent();
    onDistrictChange = this.ctx.createEvent();

    constructor(addressService) {
        super();

        this.addressService = addressService;

        this.onInit(() => this.init());
        this.onTabChange((tab) => {
            this.currentTab = tab;
        });
        this.onCancel(() => {
            this.visible = false;
        });
        this.onProvinceChange((province) => this.selectProvince(province.areaCode));
        this.onCityChange((city) => this.selectCity(city.areaCode));
        this.onDistrictChange((district) => this.selectDistrict(district.areaCode));
    }

    async init() {
        const res = await this.addressService.getProvinces();
        this.provinces = res.data;
    }

    setSelectedAddress(provinceCode, cityCode, districtCode) {
        this.selectProvince(provinceCode);
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