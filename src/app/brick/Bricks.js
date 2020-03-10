import { util } from "snowball";
import { inject, autowired } from "snowball/app";
import renderBricks from "./renderBricks";

const Bricks = inject(() => {
    const pageViewModel = autowired('pageViewModel');
    return util.pick(pageViewModel, ['pageData', 'bricks', 'templates']);
})(renderBricks);

export default Bricks;