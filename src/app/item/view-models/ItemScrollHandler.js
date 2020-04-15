import { observable } from "snowball";
import { ViewModel, ref } from "snowball/app";

export default class ItemScrollHandler extends ViewModel {
    @observable
    scrollPos = 'basic';

    @observable
    headerVisible = false;

    @ref
    mainScrollViewRef;

    onScroll = this.ctx.createEmitter();

    onInit() {
        this.onScroll(this._createScrollHandler());
    }

    scrollToComponent(componentName) {
        const node = this.ctx.page.findNode(`[item-component-name=${componentName}]`);
        this.mainScrollViewRef.current.scrollTo(0, node.offsetTop - 64, 200);
    }

    _createScrollHandler() {
        let scrollMarks;
        let timeout;

        return (e) => {
            if (e.y == 0) {
                if (this.headerVisible) {
                    this.headerVisible = false;
                }
            } else if (!this.headerVisible) {
                this.headerVisible = true;
            }

            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                timeout = scrollMarks = null;
            }, 1000);

            if (!scrollMarks) {
                scrollMarks = [...e.target.querySelectorAll('[item-component-name]')];
            }

            let maxTop;
            let current;

            scrollMarks.forEach((el) => {
                let top = el.getBoundingClientRect().top;
                if (top <= 80) {
                    if (top > maxTop || maxTop == null) {
                        current = el.getAttribute('item-component-name');
                        maxTop = top;
                    }
                }
            });

            if (current && this.scrollPos != current) {
                this.scrollPos = current;
            }
        };
    }
}