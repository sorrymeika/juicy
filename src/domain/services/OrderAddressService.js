import { observable } from "snowball";

export default class OrderAddressService {
    @observable current;

    constructor() {
        this.addressService = this.ctx.service.address;
    }

    async pull() {
        const res = await this.addressService.getDefaultAddress();
        this.current = res.data || null;
    }
}