import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC, c as changedNameListen, d as deletedNameListen } from './app-2cce98ea.js';

const AppHome = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.headerTitles = ["Prime Category", "Menu Category", "Name", "Option Category", "Price", "Dynamic Price Category", "Tax Category", "External Code", "Description", "Image", GC.thCreated, GC.thModified, GC.thDelete];
        this.headerKeys = ["prime", "menu", "name", "option", "price", "dynamic-price", "tax", "code", "description", "image", "created", "modified"];
        this.pageID = GC.id_home;
        this.pageTitle = "Our Restaurant Menus";
        this.newTDclasses = ["prime", "menu", "name", "option", "price", "dynamic-price", "tax", "code", "description", "image"];
    }
    render() {
        return (h("div", null, h("table-component", { headerTitles: this.headerTitles, headerKeys: this.headerKeys, pageID: this.pageID, pageTitle: this.pageTitle, newTDclasses: this.newTDclasses, serviceData: this.serviceData })));
    }
    /* Component Lifecycle */
    componentWillLoad() {
        this.serviceData = [
            { "prime": "Dinner", "menu": "Tacos", "name": "Fish Tacos", "option": "standard Brunch", "price": "$11.87", "dynamic-price": "None", "tax": "Nevada Local", "code": "TA001", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "image": "https://example.com/assets/example.jpg" },
            { "prime": "Dinner", "menu": "Tacos", "name": "Veggie Tacos", "option": "atandard Brunch", "price": "$14.87", "dynamic-price": "None", "tax": "Internatioal Shippig", "code": "TA002", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "image": "https://example.com/assets/example.jpg" },
            { "prime": "Dinner", "menu": "Tacos", "name": "Beef Tacos", "option": "Standard Brunch", "price": "$12.87", "dynamic-price": "None", "tax": "California Local", "code": "TA003", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "image": "https://example.com/assets/example.jpg" },
            { "prime": "Dinner", "menu": "Tacos", "name": "Pork Tacos", "option": "Standard Brunch", "price": "$13.87", "dynamic-price": "None", "tax": "Nevada Local", "code": "TA004", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "image": "https://example.com/assets/example.jpg" },
            { "prime": "Brunch", "menu": "Pancakes", "name": "2 Pancakes 2 Eggs", "option": "Standard Brunch", "price": "$14.87", "dynamic-price": "None", "tax": "Nevada Local", "code": "TA005", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "image": "https://example.com/assets/example.jpg" },
            { "prime": "Brunch", "menu": "Pancakes", "name": "2 Pancakes 2 Bacon", "option": "Standard Brunch", "price": "$14.87", "dynamic-price": "None", "tax": "Nevada Local", "code": "TA006", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "image": "https://example.com/assets/example.jpg" },
        ];
        // Event Listener for Changed Category Name
        changedNameListen((pageID, oldName, newName) => {
            this.serviceData = this.serviceData.map(data => {
                if (data[pageID] === oldName)
                    data[pageID] = newName;
                return data;
            });
            let isChanged = false;
            for (let i = 0; i < window[pageID].length; i++) {
                if (window[pageID][i] === oldName) {
                    window[pageID][i] = newName;
                    isChanged = true;
                    break;
                }
            }
            // Add new name
            !isChanged && window[pageID].push(newName);
        });
        // Event Listener for Deleted Category Name
        deletedNameListen((pageID, name) => {
            this.serviceData = this.serviceData.filter(data => data[pageID] !== name);
            for (let i = 0; i < window[pageID].length; i++) {
                if (window[pageID][i] === name) {
                    window[pageID].splice(i, 1);
                    break;
                }
            }
        });
    }
};

export { AppHome as app_home };
