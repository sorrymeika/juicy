import { Service } from "snowball/app";

export default class AddressService extends Service {
    getProvinces() {
        return this.ctx.server.base.post('/address/getProvinces');
    }

    getCitiesByProvinceId(provinceId) {
        return this.ctx.server.base.post('/address/getCitiesByProvinceId', {
            provinceId
        });
    }

    getDistrictsByCityId(cityId) {
        return this.ctx.server.base.post('/address/getDistrictsByCityId', {
            cityId
        });
    }

    getCitiesByProvinceCode(provinceCode) {
        return this.ctx.server.base.post('/address/getCitiesByProvinceCode', {
            provinceCode
        });
    }

    getDistrictsByCityCode(cityCode) {
        return this.ctx.server.base.post('/address/getDistrictsByCityCode', {
            cityCode
        });
    }
}