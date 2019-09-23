import React, { Component } from "react";
import { ViewModel, util } from "snowball";
import { PageContext } from "snowball/app";

class BrickBase extends Component {
    static contextType = PageContext;

    constructor(props, context) {
        super(props, context);

        const {
            pageData,
            brick
        } = props;

        const template = brick.template;
        const data = brick.data ? JSON.parse(brick.data) : {};
        const brickProps = brick.props ? JSON.parse(brick.props) : {};

        this._prevData = brick.data;

        util.style('brick_' + template.id, template.css);

        this.model = new ViewModel({
            el: template.html,
            attributes: {
                env: this.props.ctx.env,
                pageData,
                data,
                props: brickProps
            },
            delegate: this
        });
        this.initialize && this.initialize(data);
        this._processData(data);
        this.model.nextTick(() => {
            this.onLoad && this.onLoad(data);
        });
    }

    _initRef = (ref) => {
        if (ref && !this.container) {
            this.model.appendTo(ref);
        }
        this.container = ref;
    }

    shouldComponentUpdate(nextProps) {
        if (this._prevData !== nextProps.brick.data) {
            const data = nextProps.brick.data ? JSON.parse(nextProps.brick.data) : {};
            this._prevData = nextProps.brick.data;
            this.model.set({
                data
            });
            this.onUpdate && this.onUpdate(data);
            this._processData(data);
        }
        if (this.props.pageData !== nextProps.pageData) {
            this.model.set({
                pageData: nextProps.pageData
            });
        }
        return false;
    }

    _processData(data) {
        if (this.processData) {
            const result = this.processData(data);
            if (util.isThenable(result)) {
                result.then((res) => {
                    this.model.set(res);
                });
            } else {
                this.model.set(result);
            }
        }
    }

    componentWillUnmount() {
        this.onDestroy && this.onDestroy();
        this.model.destroy();
    }

    render() {
        return (
            <div
                ref={this._initRef}
                className="of_h clearfix ps_r"
            ></div>
        );
    }
}

export { BrickBase };