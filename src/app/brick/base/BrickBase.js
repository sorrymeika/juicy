import React, { Component } from "react";
import { template as createTemplate, util, Model } from "snowball";
import { PageContext } from "snowball/app";

const DEFAULT_DATA = Object.freeze({});

class BrickBase extends Component {
    static contextType = PageContext;

    constructor(props, context) {
        super(props, context);

        const {
            pageData,
            template,
            data = DEFAULT_DATA,
            props: brickProps = DEFAULT_DATA
        } = props;

        this._prevData = data;

        template.css && util.style('brick_' + template.id, template.css);

        const connect = createTemplate(template.html);
        this.model = new Model({
            env: this.context.app.env,
            pageData,
            data,
            props: brickProps
        });
        this.component = connect(this.model, this);
        this.initialize && this.initialize(data);
        this._processData(data);
        this.model.nextTick(() => {
            this.onLoad && this.onLoad(data);
        });
    }

    _initRef = (ref) => {
        if (ref && !this.container) {
            this.component.appendTo(ref);
            this.component.render();
        }
        this.container = ref;
    }

    shouldComponentUpdate(nextProps) {
        if (this._prevData !== nextProps.data) {
            const data = nextProps.data || DEFAULT_DATA;
            this._prevData = nextProps.data;
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