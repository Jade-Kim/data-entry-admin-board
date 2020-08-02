import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC } from './app-2cce98ea.js';

const appRootCss = "header{background:white;height:56px;display:flex !important;align-items:center;justify-content:space-evenly;box-shadow:0 2px 5px 0 rgba(0, 0, 0, 0.26);position:fixed;top:0;left:0;width:100vw}main{margin-top:60px}";

const AppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", null, h("header", null, h("a", { class: "btn-floating btn waves-effect waves-light brown darken-2", onClick: _ => this.currentView = GC.id_home }, h("i", { class: "material-icons" }, "restaurant")), h("button", { class: "waves-effect waves-light btn", onClick: _ => this.currentView = GC.id_prime }, "Prime Category"), h("button", { class: "waves-effect waves-light btn", onClick: _ => this.currentView = GC.id_menu }, "Menu Category"), h("button", { class: "waves-effect waves-light btn", onClick: _ => this.currentView = GC.id_option }, "Options Category"), h("button", { class: "waves-effect waves-light btn", onClick: _ => this.currentView = GC.id_item }, "Option Items"), h("button", { class: "waves-effect waves-light btn", onClick: _ => this.currentView = GC.id_tax }, "Tax Category")), h("main", null, h("view-stack", { view: this.currentView }, h("app-home", { id: GC.id_home }), h("app-prime", { id: GC.id_prime }), h("app-menu", { id: GC.id_menu }), h("app-option", { id: GC.id_option }), h("app-item", { id: GC.id_item }), h("app-tax", { id: GC.id_tax })))));
    }
    componentWillLoad() {
        window[GC.id_prime] = [];
        window[GC.id_menu] = [];
        window[GC.id_option] = [];
        window[GC.id_item] = [];
        window[GC.id_tax] = [];
    }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
