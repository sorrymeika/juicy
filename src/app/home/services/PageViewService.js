import { observable } from "snowball";
import { Service } from "snowball/app";

export default class PageViewService extends Service {
    @observable pageData = {};

    constructor({ pageService }) {
        super();

        this.pageService = pageService;
    }

    async initWithKeyName(keyName) {
        const res = await this.pageService.getPageByKeyName(keyName);
        console.log(res);
    }
}