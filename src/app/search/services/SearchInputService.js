import { observable } from "snowball";
import { Service } from "snowball/app";

export default class SearchInputService extends Service {
    @observable keywords = "";

    onChange = this.ctx.createEvent();
    onSubmit = this.ctx.createEvent();

    constructor(searchService) {
        super();

        this.searchService = searchService;
        this.onChange((keywords) => {
            this.setKeywords(keywords);
        });
        this.onSubmit(() => {
            const { previousPage } = this.ctx.page;
            if (previousPage && previousPage.location.path === '/search') {
                previousPage.ctx.emit({
                    type: 'search',
                    data: {
                        keywords: this.keywords
                    }
                });
                this.app.navigation.back();
            } else {
                this.app.navigation.replace('/search?keywords=' + encodeURIComponent(this.keywords));
            }
        });
    }

    setKeywords(keywords) {
        this.keywords = keywords;
    }
}