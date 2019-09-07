import { scroll } from "snowball/widget";
import { BrickBase } from "../core/BrickBase";

export class NavBall extends BrickBase {
    processData(data) {
        const { images, rows } = data;
        return {
            rows,
            width: Math.max(100, rows == 1 ? (images.length / 5) * 100 + 1 : ((images.length / 10) * 100 + 1)),
            images: images.map((img) => ({
                ...img,
                src: this.props.ctx.sfs.completeUrl(img.src)
            }))
        };
    }

    onLoad() {
        this.scroller = this.container.querySelector('.J_Scroller');
        this.scrollerBar = this.container.querySelector('.J_ScrollerBar');

        scroll.bind(this.container.querySelector('.J_Con'), {
            vScroll: false,
            hScroll: true
        });
    }

    onScroll(e) {
        const content = e.target;
        const leftPercent = content.scrollLeft / (content.scrollWidth - content.clientWidth);
        const scrollerDistance = this.scroller.clientWidth - this.scrollerBar.clientWidth;
        const scrollerBarLeft = scrollerDistance * leftPercent;

        this.scrollerBar.style.webkitTransform = 'translateX(' + scrollerBarLeft + 'px)';
    }
}