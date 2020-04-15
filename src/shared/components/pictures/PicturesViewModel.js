import { observable } from "snowball";
import { ViewModel } from "snowball/app";

export default class PicturesViewModel extends ViewModel {
    @observable
    pictures;

    onReleaseToSeeMore = this.ctx.createEmitter();
}