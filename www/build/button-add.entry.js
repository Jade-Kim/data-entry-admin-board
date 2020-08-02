import { r as registerInstance, h, H as Host } from './index-6b8c719e.js';

const ButtonAdd = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null, h("button", { class: "waves-effect waves-light btn-large orange accent-3 addBtns" }, "ADD ROW"))));
    }
};

export { ButtonAdd as button_add };
