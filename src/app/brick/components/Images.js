import { BrickBase } from "../base/BrickBase";

export default class Images extends BrickBase {
    processData(data) {
        return {
            cols: data.cols,
            images: data.images.map((img) => ({
                ...img,
                src: this.context.app.sfs.completeUrl(img.src)
            }))
        };
    }
}
