import { TEMPLATE_TYPES } from "./core/TEMPLATE_TYPES";

import { Images } from "./bricks/Images";
import { Slider } from "./bricks/Slider";

export function createBrickFactory(type) {
    switch (type) {
        case TEMPLATE_TYPES.IMAGE:
            return Images;
        case TEMPLATE_TYPES.SLIDER:
            return Slider;
    }
    return null;
}