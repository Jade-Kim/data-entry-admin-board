import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC } from './app-2cce98ea.js';

const AppTax = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.headerTitles = ["Name", "Rate", "Include Tip", "Renew On", GC.thCreated, GC.thModified, GC.thDelete];
        this.headerKeys = ["name", "rate", "includeTip", "renewOn", "created", "modified"];
        this.pageID = GC.id_tax;
        this.pageTitle = "Tax Category";
        this.newTDclasses = ["name", "text", "text", "date"];
    }
    render() {
        return (h("div", null, h("table-component", { headerTitles: this.headerTitles, headerKeys: this.headerKeys, pageID: this.pageID, pageTitle: this.pageTitle, newTDclasses: this.newTDclasses, serviceData: this.serviceData })));
    }
    /* Component Lifecycle */
    componentWillLoad() {
        this.serviceData = [
            { "name": "Nevada Local", "rate": "18%", "includeTip": "No", "renewOn": "01/01/2022" },
            { "name": "Internatioal Shippig", "rate": "26%", "includeTip": "No", "renewOn": "07/01/2021" },
            { "name": "Colorado Local", "rate": "15%", "includeTip": "No", "renewOn": "06/01/2023" },
            { "name": "California Local", "rate": "20%", "includeTip": "No", "renewOn": "01/01/2022" },
        ];
    }
    componentDidLoad() {
    }
};

export { AppTax as app_tax };
