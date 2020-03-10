import { observable, asObservable } from "snowball";
import { Service, autowired } from "snowball/app";
import PageService from "../services/PageService";

export default class PageViewModel extends Service {
    @observable pageData = {};
    @observable bricks = [];
    @observable templates = [];

    @autowired
    _pageService: PageService;

    async initWithKeyName(keyName) {
        const res = await this._pageService.getPageByKeyName(keyName);
        if (res.success) {
            this.initWithData(res.data);
        }
    }

    async initWithId(id) {
        const res = await this._pageService.getPageById(id);
        if (res.success) {
            this.initWithData(res.data);
        }
    }

    async initWithShop(sellerId) {
        const res = await this._pageService.getPageBySellerId(sellerId);
        if (res.success && res.data) {
            this.initWithData(res.data);
        }
        return res;
    }

    initWithData(page) {
        this.pageData = {
            id: page.id,
            name: page.name,
            props: page.props || {}
        };
        this.templates = page.templates.map(tpl => ({
            ...tpl,
            props: tpl.props || {}
        }));
        const templates = asObservable(this.templates);
        this.bricks = page.bricks
            .sort((a, b) => a.sort - b.sort)
            .map((brick) => {
                return {
                    ...brick,
                    data: brick.data || {},
                    props: brick.props || {},
                    template: templates.find('id', brick.templateId)
                };
            });
    }
}