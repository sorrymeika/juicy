import { Service } from "snowball/app";

export default class AddressService extends Service {
    getProvinces() {
        return this.app.server.base.post('/address/getProvinces');
    }

    getCitiesByProvinceId(provinceId) {
        return this.app.server.base.post('/address/getCitiesByProvinceId', {
            provinceId
        });
    }

    getDistrictsByCityId(cityId) {
        return this.app.server.base.post('/address/getDistrictsByCityId', {
            cityId
        });
    }

    getCitiesByProvinceCode(provinceCode) {
        return this.app.server.base.post('/address/getCitiesByProvinceCode', {
            provinceCode
        });
    }

    getDistrictsByCityCode(cityCode) {
        return this.app.server.base.post('/address/getDistrictsByCityCode', {
            cityCode
        });
    }

    addUserAddress(data) {
        return this.app.server.user.post('/userAddress/addUserAddress', data);
    }

    updateUserAddress(data) {
        return this.app.server.user.post('/userAddress/updateUserAddress', data);
    }

    listUserAddress() {
        return this.app.server.user.post('/userAddress/listUserAddress');
    }

    getDefaultAddress() {
        return this.app.server.user.post('/userAddress/getDefaultAddress');
    }

    getUserAddressById(addressId) {
        return this.app.server.user.post('/userAddress/getUserAddressById', { addressId });
    }
}