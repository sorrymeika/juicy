import { observable } from "snowball";
import { Service } from "snowball/app";

import CategoryDataService from "../../../shared/services/CategoryDataService";
import { toast } from "snowball/widget";

export default class CategoryService extends Service {
    @observable cates;
    @observable currentCate;

    onCateChange = this.ctx.createEvent();

    constructor(categoryDataService: CategoryDataService) {
        super();

        this.categoryDataService = categoryDataService;

        this.onCateChange((cate) => this.changeCate(cate));
    }

    loadCates() {
        this.categoryDataService.getCates(0)
            .then(res => {
                this.cates = res.data;
                this.currentCate = res.data && res.data[0];
            });
    }

    changeCate(cate) {
        if (this.currentCate.id != cate.id) {
            this.currentCate = cate;
            if (!this.currentCate.children) {
                if (this.changing) return;
                this.changing = true;
                this.categoryDataService.getSubCatesTreeByPid(cate.id)
                    .then(res => {
                        this.currentCate.withMutations((currentCate) => {
                            currentCate.set({
                                children: res.data
                            });
                        });
                        this.cates.find(item => item.id == cate.id)
                            .withMutations((cateModel) => {
                                cateModel.set({
                                    children: res.data
                                });
                            });
                        this.changing = false;
                    })
                    .catch(e => {
                        toast.showToast(e.message);
                        this.changing = false;
                    });
            }
        }
    }
}