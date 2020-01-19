import { observable } from "snowball";
import { Service, autowired } from "snowball/app";

import CategoryService from "./CategoryService";
import { toast } from "snowball/widget";

export default class CategoryViewService extends Service {
    @observable cates;
    @observable currentCate;

    onCateChange = this.ctx.createEmitter();
    onClickSubSubCate = this.ctx.createEmitter();

    @autowired
    categoryService: CategoryService;

    constructor() {
        super();

        this.onCateChange((cate) => this.changeCate(cate));
        this.onClickSubSubCate((subSubCate) => {
            if (subSubCate.linkType == 0) {
                this.ctx.navigation.forward('/search?keywords=' + encodeURIComponent(subSubCate.link));
            } else if (subSubCate.linkType == 1) {
                this.ctx.navigation.forward(subSubCate.link);
            } else if (subSubCate.linkType == 2) {
                this.ctx.navigation.forward('/search?formulaId=' + subSubCate.formulaId);
            }
        });
    }

    loadCates() {
        this.categoryService.getCates(0)
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
                this.categoryService.getSubCatesTreeByPid(cate.id)
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