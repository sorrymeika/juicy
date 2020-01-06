import { observable, util, asObservable } from "snowball";
import { Service, autowired } from "snowball/app";
import { toast } from "snowball/widget";
import DistrictSelectService from "./DistrictSelectService";

export default class AddressEditService extends Service {
    @observable data = {};

    @autowired
    addressService;

    @autowired
    districtSelectService: DistrictSelectService;

    constructor() {
        super();

        this.districtSelectService.onSelect(([province, city, district]) => {
            asObservable(this.data).set({
                ...province,
                ...city,
                ...district
            });
            this.districtSelectService.hide();
        });

        this.onSave = this.ctx.createEmitter(() => this.save());
    }

    showDistrictSelectModal() {
        this.districtSelectService.show(this.data);
    }

    updateField(field, value) {
        asObservable(this.data).set(field, value);
    }

    async save() {
        const {
            id,
            receiver,
            isDefaultAddress,
            phoneNo,
            provinceCode,
            cityCode,
            districtCode,
            detail,
            tag
        } = this.data;

        if (!receiver) {
            toast.showToast('请填写收货人!');
            return;
        }

        if (!phoneNo) {
            toast.showToast('请填写手机号码!');
            return;
        } else if (!util.validateMobile(phoneNo)) {
            toast.showToast('请填写正确的手机号码!');
            return;
        }

        if (!districtCode) {
            toast.showToast('请选择所在地区!');
            return;
        }

        try {
            if (!id) {
                await this.addressService.addUserAddress({
                    receiver,
                    isDefaultAddress: !!isDefaultAddress,
                    phoneNo,
                    provinceCode,
                    cityCode,
                    districtCode,
                    detail,
                    tag
                });
                toast.showToast('添加地址成功！');
            } else {
                await this.addressService.updateUserAddress({
                    id,
                    receiver,
                    isDefaultAddress: !!isDefaultAddress,
                    phoneNo,
                    provinceCode,
                    cityCode,
                    districtCode,
                    detail,
                    tag
                });
                toast.showToast('修改地址成功！');
            }
            this.ctx.navigation.back();
        } catch (e) {
            toast.showToast(e.message);
        }
    }
}