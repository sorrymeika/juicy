import React from "react";
import { MainScrollView } from "snowball/components";

import imageHTML from '../mocks/images.html';
import sliderHTML from '../mocks/slider.html';
import navBallHTML from '../mocks/nav-ball.html';
import productsHTML from '../mocks/products.html';
import { renderBricks } from "../../brick";

let templateId = 0;
let brickId = 0;

function parseTemplate(html) {
    let data;
    let css;
    let type;

    html = html
        .replace(/<style[^>]*?>([\s\S]*)<\/style>/, (match, style) => {
            css = style;
            return '';
        })
        .replace(/<script[^>]*?>([\s\S]*)<\/script>/, (match, script) => {
            const template = new Function(script + ';return template;')();
            type = template.type;
            data = Array.isArray(template.data) ? template.data : [template.data];
            return '';
        });

    return data.map((item) => ({
        id: ++brickId,
        data: item,
        props: {},
        template: {
            id: ++templateId,
            type,
            css,
            html
        },
    }));
}

function parseTemplates(htmls) {
    return htmls.reduce((res, html) => res.concat(parseTemplate(html)), []);
}

export default function Test({ ctx }) {
    return (
        <MainScrollView>
            {
                renderBricks({
                    pageData: {},
                    bricks: parseTemplates([
                        sliderHTML,
                        navBallHTML,
                        imageHTML,
                        productsHTML
                    ])
                })
            }
        </MainScrollView>
    );
}
