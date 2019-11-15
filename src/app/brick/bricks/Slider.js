import { BrickBase } from "../core/BrickBase";
import { registerComponent } from "snowball";
import { SliderComponent } from "snowball/widget";

registerComponent('slider', SliderComponent);

class Slider extends BrickBase {
    processData(data) {
        return {
            images: data.images && data.images.map((img) => ({
                ...img,
                src: this.props.ctx.app.sfs.completeUrl(img.src)
            }))
        };
    }
}

export { Slider };