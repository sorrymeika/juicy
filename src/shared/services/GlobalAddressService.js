import { util, observable, Emitter } from "snowball";
import { Service } from "snowball/app";

export default class GlobalAddressService extends Service {
    @observable current;

    onAddressChange = Emitter.create();

    constructor() {
        super();

        this.current = util.store("MALL_GLOBAL_ADDRESS") || {};
    }

    save(address) {
        this.current = address;
        util.store("MALL_GLOBAL_ADDRESS", address);
        this.onAddressChange.emit(this.current);
    }
}