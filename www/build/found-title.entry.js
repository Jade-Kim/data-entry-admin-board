import { r as registerInstance, h, H as Host } from './index-6b8c719e.js';

const FoundTitle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null, h("h5", null, "Found ", h("span", { class: "blueColor" }, this.length, " ", this.name), " items"))));
    }
};

export { FoundTitle as found_title };
