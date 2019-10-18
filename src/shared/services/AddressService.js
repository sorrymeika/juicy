export default class AddressService {
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

    addUserAddress(data) {
        return this.ctx.server.user.post('/userAddress/addUserAddress', data);
    }

    updateUserAddress(data) {
        return this.ctx.server.user.post('/userAddress/updateUserAddress', data);
    }

    listUserAddress() {
        return this.ctx.server.user.post('/userAddress/listUserAddress');
    }

    getDefaultAddress() {
        return this.ctx.server.user.post('/userAddress/getDefaultAddress');
    }

    getUserAddressById(addressId) {
        return this.ctx.server.user.post('/userAddress/getUserAddressById', { addressId });
    }
}