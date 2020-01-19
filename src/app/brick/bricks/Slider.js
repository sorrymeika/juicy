import { BrickBase } from "../core/BrickBase";

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