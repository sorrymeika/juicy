import { Service, autowired } from "snowball/app";

export default class AddressService extends Service {
    @autowired
    _userServer;

    @autowired
    _baseServer;

    getProvinces() {
        return this._baseServer.post('/address/getProvinces');
    }

    getCitiesByProvinceId(provinceId) {
        return this._baseServer.post('/address/getCitiesByProvinceId', {
            provinceId
        });
    }

    getDistrictsByCityId(cityId) {
        return this._baseServer.post('/address/getDistrictsByCityId', {
            cityId
        });
    }

    getCitiesByProvinceCode(provinceCode) {
        return this._baseServer.post('/address/getCitiesByProvinceCode', {
            provinceCode
        });
    }

    getDistrictsByCityCode(cityCode) {
        return this._baseServer.post('/address/getDistrictsByCityCode', {
            cityCode
        });
    }

    addUserAddress(data) {
        return this._userServer.post('/userAddress/addUserAddress', data);
    }

    updateUserAddress(data) {
        return this._userServer.post('/userAddress/updateUserAddress', data);
    }

    listUserAddress() {
        return this._userServer.post('/userAddress/listUserAddress');
    }

    getDefaultAddress() {
        return this._userServer.post('/userAddress/getDefaultAddress');
    }

    getUserAddressById(addressId) {
        return this._userServer.post('/userAddress/getUserAddressById', { addressId });
    }
}