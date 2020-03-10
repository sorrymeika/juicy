import { BrickBase } from "../base/BrickBase";

class Slider extends BrickBase {
    processData(data) {
        return {
            images: data.images && data.images.map((img) => ({
                ...img,
                src: this.context.app.sfs.completeUrl(img.src)
            }))
        };
    }
}

export { Slider };