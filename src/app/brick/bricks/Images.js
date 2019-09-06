import { BrickBase } from "../core/BrickBase";
import { inject } from "snowball/app";

@inject('ctx')
class Images extends BrickBase {
    processData(data) {
        return {
            cols: data.cols,
            images: data.images.map((img) => ({
                ...img,
                src: this.props.ctx.sfs.completeUrl(img.src)
            }))
        };
    }
}

export { Images };