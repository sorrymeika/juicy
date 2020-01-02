import React from "react";
import ReactDOM from "react-dom";
import { ViewModel } from "snowball";
import { MainScrollView } from "snowball/components";

import imageHTML from './mocks/images.html';
import sliderHTML from './mocks/slider.html';
import navBallHTML from './mocks/nav-ball.html';
import productsHTML from './mocks/products.html';
import { createBrickFactory } from "../brick";
import { Component } from "preact";

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
        brick: {
            id: ++brickId,
            data: JSON.stringify(item),
            props: '{}',
            template: {
                id: ++templateId,
                type,
                css,
                html
            },
        }
    }));
}

function parseTemplates(htmls) {
    return htmls.reduce((res, html) => res.concat(parseTemplate(html)), []);
}

class TestViewModel extends Component {
    viewModel = new ViewModel({
        el: '<div>after:{after&&after()}</div>',
        attributes: {
        }
    })

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.viewModel.appendTo(
            ReactDOM.findDOMNode(this)
        );

        const after = new ViewModel({
            el: '<div>bbb{name}</div>',
            attributes: {
                name: '猪头'
            }
        });

        this.viewModel.set({
            after() {
                return after;
            }
        });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default function Test({ ctx }) {
    return (
        <MainScrollView>
            <TestViewModel></TestViewModel>
            {
                parseTemplates([
                    sliderHTML,
                    navBallHTML,
                    imageHTML,
                    productsHTML
                ])
                    .map((props) => React.createElement(createBrickFactory(props.brick.template.type), { ...props, ctx }))
            }
        </MainScrollView>
    );
}
