import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC } from './app-2cce98ea.js';

const AppMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.headerTitles = ["Name", "Description", "Image", GC.thCreated, GC.thModified, GC.thDelete];
        this.headerKeys = ["name", "description", "image", "created", "modified"];
        this.pageID = GC.id_menu;
        this.pageTitle = "Menu Category";
        this.newTDclasses = ["name", "text", "text"];
    }
    render() {
        return (h("div", null, h("table-component", { headerTitles: this.headerTitles, headerKeys: this.headerKeys, pageID: this.pageID, pageTitle: this.pageTitle, newTDclasses: this.newTDclasses, serviceData: this.serviceData })));
    }
    /* Component Lifecycle */
    componentWillLoad() {
        this.serviceData = [
            { "name": "Tacos", "description": "All tacos are served with refried beans and rice.", "image": "None" },
            { "name": "Pancakes", "description": "All panckaes are served with butter and syrup.", "image": "None" },
            { "name": "Burritos", "description": "All hashes are served with extra salsa.", "image": "None" },
        ];
    }
};

export { AppMenu as app_menu };
