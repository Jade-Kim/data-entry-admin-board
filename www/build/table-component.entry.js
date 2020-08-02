import { r as registerInstance, h } from './index-6b8c719e.js';
import { G as GC, g as getRelatedData, b as changedNameEventEmit, e as changeDeleteRowColor, f as filterCategory, h as deletedNameEventEmit, r as removeDeleteRowColor, s as sortBy, i as resetFilter, j as setFilterKeys, k as setFilterCategoryEachRow } from './app-2cce98ea.js';

const tableComponentCss = "h5{padding:10px 20px !important}table{white-space:nowrap;width:auto}table input{margin:0 !important;height:1.8rem !important}th,td{border-right:1px dotted silver !important}th{background:antiquewhite}.headerTitles th{text-align:center}.onSort{-moz-box-shadow:inset 0 0 10px orange !important;-webkit-box-shadow:inset 0 0 10px orange !important;box-shadow:inset 0 0 10px orange !important}.td_menu{width:100%}.createdDate,.modifiedDate{background-color:#efebe9}.delete{background-color:#f9c49a}.modal{top:20% !important;width:70% !important;height:78% !important}.addBtns{margin:50px}.relatedTable{display:flex;align-items:center;justify-content:space-between}.blueColor{color:royalblue}";

const TableComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // Table
        this.tableRows = [];
        this.isDelete = false;
        this.isAsc = false;
        this.filterSelect = `${this.pageID}FilterSelect`;
    }
    serviceDataWatchHandler() {
        this.renderTable();
    }
    render() {
        return (h("div", null, h("h5", null, this.pageTitle), h("table", { class: "striped", ref: el => this.table = el }, h("thead", null, h("tr", { class: "headerTitles" }, this.headerTitles.map(t => h("th", { onClick: e => this.sort(e) }, t))), h("tr", null, this.headerKeys.map(key => h("th", null, h("select", { class: `browser-default ${this.filterSelect}`, onChange: e => this.showFilterResult(e) }, h("option", { value: "all", selected: true }, "All"), this.filterData[key].map(option => h("option", { value: option }, option))))), h("th", null))), h("tbody", { ref: el => this.tableBody = el }, this.tableRows && this.tableRows.map(row => row !== undefined && row))), h("arrow-guide", null), h("button-add", { onClick: _ => this.addRow() }), h("div", { class: "modal", ref: el => this.modal = el }, h("div", { class: "modal-content" }, h("h4", null, this.modalTitle), this.modalContent), h("div", { class: "modal-footer" }, h("a", { onClick: _ => this.isDelete ? this.cancelDeleteData() : this.cancelData(), class: "modal-close waves-effect waves-red btn-flat left" }, "CANCEL"), h("a", { onClick: _ => this.isDelete ? this.deleteData() : this.saveData(), class: "modal-close waves-effect waves-green btn-flat" }, " ", this.isDelete ? "DELETE" : "SAVE")))));
    }
    /* MODAL & SAVE DATA & CANCEL */
    openModal(e) {
        this.target = e.target;
        this.modalTitle = this.headerTitles[e.target.cellIndex];
        const c = e.target.className;
        // Home Page View
        if (this.pageID === GC.id_home) {
            if (c.includes("prime") || c.includes("menu") || c.includes("option") || c.includes("tax")) {
                this.modalContent =
                    h("div", null, h("select", { class: "browser-default", ref: el => this.selectEl = el }, h("option", { value: "", disabled: true }, "Choose your option"), window[c] && window[c].length > 0 && window[c].map(option => h("option", { value: option, selected: e.target.innerText === option ? true : false }, option))));
            }
            else if (c.includes("description")) {
                this.modalContent = h("div", null, h("textarea", { value: e.target.innerText, ref: el => this.textarea = el }));
            }
            else {
                this.modalContent = h("div", null, h("input", { type: "text", value: e.target.innerText, ref: el => this.text = el }));
            }
        }
        // Others Page View
        else {
            if (c.includes("name")) {
                // beforeEditingNameEventEmit();
                const t = getRelatedData(e, this.pageID);
                const tds = t[0];
                const tableLength = t[1];
                this.modalContent =
                    h("div", null, h("input", { type: "text", value: e.target.innerText, ref: el => this.text = el }), h("div", null, h("found-title", { length: tableLength, name: e.target.innerText }), tds.map(td => h("div", { class: "relatedTable" }, td.map(d => h("div", null, d)))), h("br", null), tableLength > GC.relatedItems && "And More ..."));
            }
            else if (c.includes("time")) {
                this.modalContent = h("div", null, h("input", { class: "timepicker", ref: el => this.time = el, value: e.target.innerText, onClick: e => this.openTime(e) }));
            }
            else if (c.includes("date")) {
                this.modalContent =
                    h("div", null, this.pageID === GC.id_prime && h("button", { class: "waves-effect waves-light btn", onClick: _ => this.date.value = "All" }, "All"), h("input", { class: "datepicker", ref: el => this.date = el, value: e.target.innerText, onClick: e => this.openDate(e) }));
            }
            else {
                this.modalContent = h("div", null, h("input", { type: "text", value: e.target.innerText, ref: el => this.text = el }));
            }
        }
        M.Modal.getInstance(this.modal).open();
    }
    openTime(e) {
        M.Timepicker.init(e.target, {
            onCloseEnd() {
                this.destroy();
            }
        });
        const instance = M.Timepicker.getInstance(e.target);
        instance.open();
    }
    openDate(e) {
        M.Datepicker.init(e.target, {
            format: this.pageID === GC.id_prime ? 'mmm dd' : 'mmm dd, yyyy',
            onClose() {
                this.destroy();
            }
        });
        const instance = M.Datepicker.getInstance(e.target);
        instance.open();
    }
    saveData() {
        const c = this.target.className;
        // Home Page View
        if (this.pageID === GC.id_home) {
            if (c.includes("prime") || c.includes("menu") || c.includes("option") || c.includes("tax")) {
                this.target.innerHTML = this.selectEl.value;
                this.selectEl.value = '';
            }
            else if (c.includes("description")) {
                this.target.innerHTML = this.textarea.value;
                this.textarea.value = '';
            }
            else {
                this.target.innerHTML = this.text.value;
                this.text.value = '';
            }
        }
        // Others Page View
        else {
            if (c.includes("name")) {
                changedNameEventEmit(this.pageID, this.target.innerHTML, this.text.value);
                this.target.innerHTML = this.text.value;
                this.text.value = '';
            }
            else if (c.includes("time")) {
                this.target.innerHTML = this.time.value;
                this.time.value = '';
            }
            else if (c.includes("date")) {
                this.target.innerHTML = this.date.value;
                this.date.value = '';
            }
            ;
        }
        // Update/Add filter category data
        const keyName = this.headerKeys[this.target.cellIndex];
        const newCategory = this.target.innerHTML;
        if (!this.filterData[keyName].includes(newCategory)) {
            this.filterData[keyName].push(newCategory);
            this.filterData = Object.assign({}, this.filterData);
        }
        // To do: Update data to the service
    }
    cancelData() {
        const c = this.target.className;
        // Home Page View
        if (this.pageID === GC.id_home) {
            if (c.includes("prime") || c.includes("menu") || c.includes("option") || c.includes("tax")) {
                this.selectEl.value = this.target.innerHTML;
            }
            else if (c.includes("description")) {
                this.textarea.value = this.target.innerHTML;
            }
            else {
                this.text.value = this.target.innerHTML;
            }
        }
        // Others Page View
        else {
            if (c.includes("name")) {
                this.text.value = this.target.innerHTML;
            }
            else if (c.includes("time")) {
                this.time.value = this.target.innerHTML;
            }
            else if (c.includes("date")) {
                this.date.value = this.target.innerHTML;
            }
        }
    }
    /* DELETE ROW & DELETE MODAL */
    deleteRow(e) {
        if (this.pageID !== GC.id_home) {
            //beforeEditingNameEventEmit();
            this.showRelatedData(e);
        }
        else {
            this.modalContent = h("div", null);
        }
        this.target = e.target.parentElement;
        this.modalTitle = this.headerTitles[e.target.cellIndex];
        changeDeleteRowColor(e, this.tableBody);
        this.targetName = e.target.parentElement.childNodes[0].innerText;
        this.isDelete = true;
        M.Modal.getInstance(this.modal).open();
    }
    showRelatedData(e) {
        const t = getRelatedData(e, this.pageID, true);
        const tds = t[0];
        const tableLength = t[1];
        this.modalContent =
            h("div", null, h("found-title", { length: tableLength, name: this.targetName }), tds.map(td => h("div", { class: "relatedTable" }, td.map(d => h("div", null, d)))), h("br", null), tableLength > GC.relatedItems && "And More ...");
    }
    deleteData() {
        this.isDelete = false;
        this.serviceData.splice(this.target.rowIndex - 2, 1);
        //this.table.deleteRow(this.target.rowIndex);
        if (this.pageID !== GC.id_home) {
            for (let i = 0; i < filterCategory[this.pageID]["name"].length; i++) {
                if (filterCategory[this.pageID]["name"][i] === this.targetName) {
                    filterCategory[this.pageID]["name"].splice(i, 1);
                    break;
                }
            }
            this.filterData = filterCategory[this.pageID];
            deletedNameEventEmit(this.pageID, this.targetName);
        }
        ;
        this.cancelDeleteData();
        // To do: delete data to the service 
        this.renderTable();
    }
    cancelDeleteData() {
        this.isDelete = false;
        removeDeleteRowColor(this.tableBody, this.target);
    }
    /* ADD ROW */
    addRow() {
        const data = h("tr", null, this.newTDclasses && this.newTDclasses.map((className) => h("td", { onClick: e => this.openModal(e), class: className })), h("td", { class: "createdDate" }), h("td", { class: "modifiedDate" }), h("td", { onClick: e => this.deleteRow(e), class: "delete" }, "Delete"));
        this.tableRows = [...this.tableRows, data];
        // To do: add new data to the service
    }
    /* Sort and Filter */
    sort(e) {
        const result = sortBy(e, this.headerKeys, this.serviceData, this.isAsc);
        this.isAsc = result[0];
        this.serviceData = result[1];
        this.renderTable();
    }
    showFilterResult(e) {
        const targetValue = e.target.value;
        if (targetValue === "all") {
            resetFilter(this.filterSelect);
            this.renderTable();
            return;
        }
        const cellIndex = e.target.parentElement.cellIndex;
        const key = this.headerKeys[cellIndex];
        this.dynamicServiceData = this.dynamicServiceData.filter(element => element[key] === targetValue);
        this.renderTable(this.dynamicServiceData, false);
    }
    renderTable(tableData = this.serviceData, collectFilterData = true) {
        collectFilterData && setFilterKeys(this.pageID, this.headerKeys);
        this.tableRows = [];
        tableData.forEach(row => {
            let data;
            if (this.pageID === GC.id_home) {
                data =
                    h("tr", null, h("td", { onClick: e => this.openModal(e), class: "prime" }, row.prime), h("td", { onClick: e => this.openModal(e), class: "menu" }, row.menu), h("td", { onClick: e => this.openModal(e), class: "name" }, row.name), h("td", { onClick: e => this.openModal(e), class: "option" }, row.option), h("td", { onClick: e => this.openModal(e), class: "price" }, row.price), h("td", { onClick: e => this.openModal(e), class: "dynamic-price" }, row["dynamic-price"]), h("td", { onClick: e => this.openModal(e), class: "tax" }, row.tax), h("td", { onClick: e => this.openModal(e), class: "code" }, row.code), h("td", { onClick: e => this.openModal(e), class: "description" }, row.description), h("td", { onClick: e => this.openModal(e), class: "image" }, row.image), h("td", { class: "createdDate" }, GC.now), h("td", { class: "modifiedDate" }, GC.now), h("td", { onClick: e => this.deleteRow(e), class: "delete" }, "Delete"));
            }
            else if (this.pageID === GC.id_prime) {
                data =
                    h("tr", null, h("td", { onClick: e => this.openModal(e), class: "name" }, row.name), h("td", { onClick: e => this.openModal(e), class: "time" }, row["s-time"]), h("td", { onClick: e => this.openModal(e), class: "time" }, row["e-time"]), h("td", { onClick: e => this.openModal(e), class: "date" }, row["date"]), h("td", { class: "createdDate" }, GC.now), h("td", { class: "modifiedDate" }, GC.now), h("td", { onClick: e => this.deleteRow(e), class: "delete" }, "Delete"));
            }
            else if (this.pageID === GC.id_menu) {
                data =
                    h("tr", null, h("td", { onClick: e => this.openModal(e), class: "name" }, row.name), h("td", { onClick: e => this.openModal(e), class: "text" }, row.description), h("td", { onClick: e => this.openModal(e), class: "text" }, row.image), h("td", { class: "createdDate" }, GC.now), h("td", { class: "modifiedDate" }, GC.now), h("td", { onClick: e => this.deleteRow(e), class: "delete" }, "Delete"));
            }
            else if (this.pageID === GC.id_option) {
                data =
                    h("tr", null, h("td", { onClick: e => this.openModal(e), class: "name" }, row.name), h("td", { onClick: e => this.openModal(e), class: "text" }, row.item), h("td", { class: "createdDate" }, GC.now), h("td", { class: "modifiedDate" }, GC.now), h("td", { onClick: e => this.deleteRow(e), class: "delete" }, "Delete"));
            }
            else if (this.pageID === GC.id_item) {
                data =
                    h("tr", null, h("td", { onClick: e => this.openModal(e), class: "name" }, row.name), h("td", { onClick: e => this.openModal(e), class: "text" }, row.options), h("td", { onClick: e => this.openModal(e), class: "text" }, row.price), h("td", { onClick: e => this.openModal(e), class: "text" }, row.code), h("td", { class: "createdDate" }, GC.now), h("td", { class: "modifiedDate" }, GC.now), h("td", { onClick: e => this.deleteRow(e), class: "delete" }, "Delete"));
            }
            else if (this.pageID === GC.id_tax) {
                data =
                    h("tr", null, h("td", { onClick: e => this.openModal(e), class: "name" }, row.name), h("td", { onClick: e => this.openModal(e), class: "text" }, row.rate), h("td", { onClick: e => this.openModal(e), class: "text" }, row.includeTip), h("td", { onClick: e => this.openModal(e), class: "date" }, row.renewOn), h("td", { class: "createdDate" }, GC.now), h("td", { class: "modifiedDate" }, GC.now), h("td", { onClick: e => this.deleteRow(e), class: "delete" }, "Delete"));
            }
            ;
            this.tableRows.push(data);
            collectFilterData && setFilterCategoryEachRow(this.pageID, row);
            if (this.pageID !== GC.id_home) {
                if (!window[this.pageID].includes(row.name))
                    window[this.pageID].push(row.name);
            }
        });
        if (collectFilterData) {
            this.filterData = filterCategory[this.pageID];
            this.dynamicServiceData = this.serviceData; // reset to original service data
        }
    }
    /* Component Lifecycle */
    componentWillLoad() {
        this.renderTable();
    }
    componentDidLoad() {
        M.Modal.init(this.modal, { preventScrolling: false, dismissible: false });
    }
    static get watchers() { return {
        "serviceData": ["serviceDataWatchHandler"]
    }; }
};
TableComponent.style = tableComponentCss;

export { TableComponent as table_component };
