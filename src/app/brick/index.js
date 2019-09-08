import React from "react";
import { createBrickFactory } from "./factories";

export { createBrickFactory };

export function renderBricks(pageData, bricks, ctx) {
    return bricks.map((brick) => React.createElement(createBrickFactory(brick.template.type), {
        key: brick.id,
        pageData,
        brick,
        ctx
    }));
}