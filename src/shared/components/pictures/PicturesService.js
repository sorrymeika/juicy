import { Service } from "snowball/app";
import { observable } from "snowball";

export default class PicturesService extends Service {
    @observable pictures;
    onReleaseToSeeMore = this.ctx.createEmitter();
}