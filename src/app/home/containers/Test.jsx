import React from "react";

import imageHTML from '../mocks/images.html';
import { createBrickFactory } from "../../brick";

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
        template: {
            id: ++templateId,
            type,
            css,
            html
        },
        brick: {
            id: ++brickId,
            data: JSON.stringify(item),
            props: '{}'
        }
    }));
}

function parseTemplates(htmls) {
    return htmls.reduce((res, html) => res.concat(parseTemplate(html)), []);
}

export default function Test() {
    return (
        <div>
            {
                parseTemplates([
                    imageHTML
                ])
                    .map((props) => React.createElement(createBrickFactory(props.template.type), props))
            }
        </div>
    );
}
