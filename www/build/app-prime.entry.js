import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC } from './app-2cce98ea.js';

const AppPrime = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.headerTitles = ["Name", "Start Time", "End Time", "Date", GC.thCreated, GC.thModified, GC.thDelete];
        this.headerKeys = ["name", "s-time", "e-time", "date", "created", "modified"];
        this.pageID = GC.id_prime;
        this.pageTitle = "Prime Category";
        this.newTDclasses = ["name", "time", "time", "date"];
    }
    render() {
        return (h("div", null, h("table-component", { headerTitles: this.headerTitles, headerKeys: this.headerKeys, pageID: this.pageID, pageTitle: this.pageTitle, newTDclasses: this.newTDclasses, serviceData: this.serviceData })));
    }
    /* Component Lifecycle */
    componentWillLoad() {
        this.serviceData = [
            { "name": "Brunch", "s-time": "11:00 am", "e-time": "1:00 pm", "date": "All" },
            { "name": "Snack", "s-time": "11:00 am", "e-time": "5:00 pm", "date": "All" },
            { "name": "Dinner", "s-time": "5:00 pm", "e-time": "9:00 pm", "date": "All" },
            { "name": "4th of July", "s-time": "11:00 am", "e-time": "9:00 pm", "date": "Jul 04" },
        ];
    }
    componentDidLoad() {
    }
};

export { AppPrime as app_prime };
