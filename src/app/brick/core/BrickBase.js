import React, { Component } from "react";
import { ViewModel, util } from "snowball";

class BrickBase extends Component {
    constructor(props) {
        super(props);

        const {
            template,
            brick
        } = props;

        const data = brick.data ? JSON.parse(brick.data) : {};
        const brickProps = brick.props ? JSON.parse(brick.props) : {};

        this._prevData = brick.data;

        util.style('brick_' + template.id, template.css);

        this.model = new ViewModel({
            el: template.html,
            attributes: {
                data,
                props: brickProps
            },
            delegate: this
        });
        this.initialize && this.initialize(data);
        this.processData && this.model.set(this.processData(data));
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
            this.processData && this.model.set(this.processData(data));
        }
        return false;
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