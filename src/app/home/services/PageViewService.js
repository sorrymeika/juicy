import { observable } from "snowball";
import { Service } from "snowball/app";

export default class PageViewService extends Service {
    @observable pageData = {};
    @observable bricks = [];

    constructor({ pageService }) {
        super();

        this.pageService = pageService;
    }

    async initWithKeyName(keyName) {
        const res = await this.pageService.getPageByKeyName(keyName);
        if (res.success) {
            this.init(res.data);
        }
    }

    async initWithId(id) {
        const res = await this.pageService.getPageById(id);
        if (res.success) {
            this.init(res.data);
        }
    }

    init(page) {
        this.pageData = {
            id: page.id,
            name: page.name,
            props: JSON.parse(page.props || '{}')
        };

        this.bricks = page.bricks
            .sort((a, b) => a.sort - b.sort)
            .map((brick) => {
                return {
                    ...brick,
                    template: page.templates.find((tpl) => tpl.id == brick.templateId)
                };
            });
    }
}