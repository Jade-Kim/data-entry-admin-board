import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC } from './app-2cce98ea.js';

const AppOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.headerTitles = ["Name", "Item", GC.thCreated, GC.thModified, GC.thDelete];
        this.headerKeys = ["name", "item", "created", "modified"];
        this.pageID = GC.id_option;
        this.pageTitle = "Option Category";
        this.newTDclasses = ["name", "text"];
    }
    render() {
        return (h("div", null, h("table-component", { headerTitles: this.headerTitles, headerKeys: this.headerKeys, pageID: this.pageID, pageTitle: this.pageTitle, newTDclasses: this.newTDclasses, serviceData: this.serviceData })));
    }
    /* Component Lifecycle */
    componentWillLoad() {
        this.serviceData = [
            { "name": "Burgers", "item": "Ketchup" },
            { "name": "Burgers", "item": "Fried Egg" },
            { "name": "Hot Dogs", "item": "Chilli" },
            { "name": "Hot Dogs", "item": "Mustard" },
            { "name": "Hot Dogs", "item": "Ketchup" },
        ];
    }
    componentDidLoad() {
    }
};

export { AppOption as app_option };
