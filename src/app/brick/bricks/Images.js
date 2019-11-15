import { BrickBase } from "../core/BrickBase";

class Images extends BrickBase {
    processData(data) {
        return {
            cols: data.cols,
            images: data.images.map((img) => ({
                ...img,
                src: this.props.ctx.app.sfs.completeUrl(img.src)
            }))
        };
    }
}

export { Images };