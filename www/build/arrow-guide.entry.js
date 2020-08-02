import { r as registerInstance, h, H as Host } from './index-6b8c719e.js';

const ArrowGuide = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null, h("div", null, h("i", { class: "material-icons" }, "arrow_upward"), " Click each cell to edit", h("br", null)))));
    }
};

export { ArrowGuide as arrow_guide };
