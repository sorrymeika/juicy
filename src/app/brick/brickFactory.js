import React from "react";
import { TEMPLATE_TYPES } from "./constants/TEMPLATE_TYPES";
import Images from "./components/Images";
import Slider from "./components/Slider";
import NavBall from "./components/NavBall";
import Products from "./components/Products";

function createBrickFactory(type) {
    switch (type) {
        case TEMPLATE_TYPES.IMAGE:
            return Images;
        case TEMPLATE_TYPES.SLIDER:
            return Slider;
        case TEMPLATE_TYPES.NAV_BALL:
            return NavBall;
        case TEMPLATE_TYPES.PRODUCTS:
            return Products;
    }
}

export default function brickFactory(props) {
    const { template } = props;
    const Brick = createBrickFactory(template.type);
    return Brick ? React.createElement(Brick, props) : null;
}