import { BrickBase } from "../core/BrickBase";
import { inject } from "snowball/app";

@inject('ctx')
class Slider extends BrickBase {
    processData(data) {
        return {
            images: data.images.map((img) => ({
                ...img,
                src: this.props.ctx.sfs.completeUrl(img.src)
            }))
        };
    }
}

export { Slider };