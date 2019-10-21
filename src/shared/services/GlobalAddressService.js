import { util, observable, Emitter } from "snowball";

export default class GlobalAddressService {
    @observable current;

    onAddressChange = Emitter.create();

    constructor() {
        this.current = util.store("MALL_GLOBAL_ADDRESS") || {};
    }

    save(address) {
        this.current = address;
        util.store("MALL_GLOBAL_ADDRESS", address);
        this.onAddressChange.emit(this.current);
    }
}