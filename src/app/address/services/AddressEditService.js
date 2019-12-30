import { observable, util } from "snowball";
import { Service, autowired } from "snowball/app";
import { toast } from "snowball/widget";

export default class AddressEditService extends Service {
    @observable data = {};

    onFieldChange = this.ctx.createEvent();
    onClickDistrict = this.ctx.createEvent();
    onSave = this.ctx.createEvent();

    @autowired
    addressService;

    @autowired
    districtSelectService;

    constructor() {
        super();

        this.onClickDistrict(() => this.showDistrictSelectModal());

        this.onFieldChange(({ name, value }) => this.updateField(name, value));

        this.districtSelectService.onSelect(([province, city, district]) => {
            this.data.withMutations((data) => {
                data.set({
                    ...province,
                    ...city,
                    ...district
                });
            });
            this.districtSelectService.hide();
        });

        this.onSave(() => this.save());
    }

    showDistrictSelectModal() {
        this.districtSelectService.show();
    }

    updateField(field, value) {
        this.data.withMutations((data) => {
            data.set(field, value);
        });
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