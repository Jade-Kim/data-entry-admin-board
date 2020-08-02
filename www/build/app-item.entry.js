import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC } from './app-2cce98ea.js';

const AppItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.headerTitles = ["Name", "Options", "Price", "Code", GC.thCreated, GC.thModified, GC.thDelete];
        this.headerKeys = ["name", "options", "price", "code", "created", "modified"];
        this.pageID = GC.id_item;
        this.pageTitle = "Item Category";
        this.newTDclasses = ["name", "text", "text", "text", "text"];
    }
    render() {
        return (h("div", null, h("table-component", { headerTitles: this.headerTitles, headerKeys: this.headerKeys, pageID: this.pageID, pageTitle: this.pageTitle, newTDclasses: this.newTDclasses, serviceData: this.serviceData })));
    }
    /* Component Lifecycle */
    componentWillLoad() {
        this.serviceData = [
            { "name": "Ketchup", "options": "Yes/No", "price": "$0.20", "code": "KZ44LZ" },
            { "name": "Egg", "options": "Over Easy, Over Medium, Over Hard, Fried", "price": "$0.20", "code": "KZ44LZ" },
            { "name": "FiredEgg", "options": "Yes/No", "price": "$0.20", "code": "KZ44LZ" },
            { "name": "Mustard", "options": "Yes/No", "price": "$0.20", "code": "KZ44LZ" },
        ];
    }
    componentDidLoad() {
    }
};

export { AppItem as app_item };
