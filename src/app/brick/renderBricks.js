import React from "react";
import brickFactory from "./brickFactory";

export default function renderBricks({ pageData, bricks, templates }) {
    const normalBricks = [];
    const fixedBricks = [];

    console.log(bricks);

    bricks.forEach((brick) => {
        const itemProps = {
            ...brick,
            pageData,
            bricks,
            templates,
        };
        if (brick.template.props.isFixed) {
            fixedBricks.push(brickFactory({
                ...itemProps,
                index: fixedBricks.length
            }));
        } else {
            normalBricks.push(brickFactory({
                ...itemProps,
                index: normalBricks.length
            }));
        }
    });

    return <>
        {normalBricks}
        <div className="bk_fixed_wrapper">{fixedBricks}</div>
    </>;
}