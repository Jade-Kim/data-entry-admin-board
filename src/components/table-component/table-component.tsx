import { Component, ComponentInterface, h, State, Prop, Watch } from '@stencil/core';
import { GC, getRelatedData, changedNameEventEmit, changeDeleteRowColor, deletedNameEventEmit, removeDeleteRowColor, sortBy, setFilterKeys, setFilterCategoryEachRow, filterCategory, resetFilter } from '../../global/app';
declare var M: any;

@Component({
  tag: 'table-component',
  styleUrl: 'table-component.css',
  // shadow: true,
})
export class TableComponent implements ComponentInterface {
  // Props: Unique Page Info
  @Prop() headerTitles: any;
  @Prop() headerKeys: any;
  @Prop() pageTitle: string;
  @Prop() newTDclasses: any;
  @Prop() pageID: string;
  @Prop() serviceData: any;
  @Watch('serviceData')
  serviceDataWatchHandler() {
    this.renderTable();
  }

  // Modal 
  private modal: HTMLDivElement;
  @State() modalContent: HTMLDivElement;
  @State() modalTitle: string;
  @State() text: HTMLInputElement;
  @State() textarea: HTMLTextAreaElement;
  @State() time: HTMLInputElement;
  @State() date: HTMLInputElement;
  @State() target: any;
  private selectEl: HTMLSelectElement;

  // Table
  @State() tableRows = [];
  @State() tableBody: HTMLTableSectionElement;
  @State() isDelete: boolean = false;
  @State() table: HTMLTableElement;

  // Sort & Filter
  @State() filterData: any;
  private isAsc = false;
  private dynamicServiceData: any;
  private targetName: string;
  private filterSelect: string = `${this.pageID}FilterSelect`;


  render() {
    return (
      <div>
        <h5>{this.pageTitle}</h5>

        <table class="striped" ref={el => this.table = el as HTMLTableElement}  >
          <thead>
            {/* Header/Sort Row */}
            <tr class="headerTitles">
              {this.headerTitles.map(t => <th onClick={e => this.sort(e)} >{t}</th>)}
            </tr>
            {/* Filter Row */}
            <tr>
              {this.headerKeys.map(key =>
                <th>
                  <select class={`browser-default ${this.filterSelect}`} onChange={e => this.showFilterResult(e)} >
                    <option value="all" selected>All</option>
                    {
                      this.filterData[key].map(option =>
                        <option value={option}>{option}</option>
                      )}
                  </select>
                </th>
              )}
              <th></th>
            </tr>
          </thead>

          <tbody ref={el => this.tableBody = el as HTMLTableSectionElement} >
            {this.tableRows && this.tableRows.map(row =>
              row !== undefined && row
            )}
          </tbody>
        </table>


        <arrow-guide></arrow-guide>
        <button-add onClick={_ => this.addRow()}></button-add>


        {/* <!-- Modal Structure --> */}
        <div class="modal" ref={el => this.modal = el as HTMLDivElement}>
          <div class="modal-content">
            <h4>{this.modalTitle}</h4>
            {this.modalContent}
          </div>
          <div class="modal-footer">
            <a onClick={_ => this.isDelete ? this.cancelDeleteData() : this.cancelData()} class="modal-close waves-effect waves-red btn-flat left">CANCEL</a>
            <a onClick={_ => this.isDelete ? this.deleteData() : this.saveData()} class="modal-close waves-effect waves-green btn-flat"> {this.isDelete ? "DELETE" : "SAVE"}</a>
          </div>
        </div>

      </div>

    );
  }

  /* MODAL & SAVE DATA & CANCEL */
  openModal(e) {
    this.target = e.target;
    this.modalTitle = this.headerTitles[e.target.cellIndex];

    const c: string = e.target.className;

    // Home Page View
    if (this.pageID === GC.id_home) {
      if (c.includes("prime") || c.includes("menu") || c.includes("option") || c.includes("tax")) {
        this.modalContent =
          <div>
            <select class="browser-default" ref={el => this.selectEl = el as HTMLSelectElement} >
              <option value="" disabled>Choose your option</option>
              {window[c] && window[c].length > 0 && window[c].map(option =>
                <option value={option} selected={e.target.innerText === option ? true : false}>{option}</option>
              )}
            </select>
          </div>;
      } else if (c.includes("description")) {
        this.modalContent = <div><textarea value={e.target.innerText} ref={el => this.textarea = el as HTMLTextAreaElement} ></textarea></div>
      } else {
        this.modalContent = <div><input type="text" value={e.target.innerText} ref={el => this.text = el as HTMLInputElement} /></div>
      }
    }
    // Others Page View
    else {
      if (c.includes("name")) {
        // beforeEditingNameEventEmit();
        const t = getRelatedData(e, this.pageID);
        const tds: any = t[0];
        const tableLength = t[1];

        this.modalContent =
          <div>
            <input type="text" value={e.target.innerText} ref={el => this.text = el as HTMLInputElement} />
            <div>
              <found-title length={tableLength} name={e.target.innerText} ></found-title>
              {tds.map(td =>
                <div class="relatedTable">
                  {td.map(d => <div>{d}</div>)}
                </div>
              )}
              <br />
              {tableLength > GC.relatedItems && "And More ..."}
            </div>
          </div>
      } else if (c.includes("time")) {
        this.modalContent = <div><input class="timepicker" ref={el => this.time = el as HTMLInputElement} value={e.target.innerText} onClick={e => this.openTime(e)} /></div>
      } else if (c.includes("date")) {
        this.modalContent =
          <div>
            {this.pageID === GC.id_prime && <button class="waves-effect waves-light btn" onClick={_ => this.date.value = "All"} >All</button>}
            <input class="datepicker" ref={el => this.date = el as HTMLInputElement} value={e.target.innerText} onClick={e => this.openDate(e)} />
          </div>
      } else {
        this.modalContent = <div><input type="text" value={e.target.innerText} ref={el => this.text = el as HTMLInputElement} /></div>;
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
      } else if (c.includes("description")) {
        this.target.innerHTML = this.textarea.value;
        this.textarea.value = '';
      } else {
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
      } else if (c.includes("time")) {
        this.target.innerHTML = this.time.value;
        this.time.value = '';
      } else if (c.includes("date")) {
        this.target.innerHTML = this.date.value;
        this.date.value = '';
      };
    }

    // Update/Add filter category data
    const keyName = this.headerKeys[this.target.cellIndex];
    const newCategory = this.target.innerHTML;
    if (!this.filterData[keyName].includes(newCategory)) {
      this.filterData[keyName].push(newCategory);
      this.filterData = { ...this.filterData };
    }

    // To do: Update data to the service
  }

  cancelData() {
    const c = this.target.className;

    // Home Page View
    if (this.pageID === GC.id_home) {
      if (c.includes("prime") || c.includes("menu") || c.includes("option") || c.includes("tax")) {
        this.selectEl.value = this.target.innerHTML;
      } else if (c.includes("description")) {
        this.textarea.value = this.target.innerHTML;
      } else {
        this.text.value = this.target.innerHTML;
      }
    }
    // Others Page View
    else {
      if (c.includes("name")) {
        this.text.value = this.target.innerHTML;
      } else if (c.includes("time")) {
        this.time.value = this.target.innerHTML;
      } else if (c.includes("date")) {
        this.date.value = this.target.innerHTML;
      }
    }

  }


  /* DELETE ROW & DELETE MODAL */
  deleteRow(e) {
    if (this.pageID !== GC.id_home) {
      //beforeEditingNameEventEmit();
      this.showRelatedData(e);
    } else {
      this.modalContent = <div></div>;
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
    const tds: any = t[0];
    const tableLength = t[1];
    this.modalContent =
      <div>
        <found-title length={tableLength} name={this.targetName} ></found-title>
        {
          tds.map(td =>
            <div class="relatedTable">
              {td.map(d => <div>{d}</div>)}
            </div>
          )}
        <br />
        {tableLength > GC.relatedItems && "And More ..."}
      </div >;
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
    };

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
    const data =
      <tr>
        {this.newTDclasses && this.newTDclasses.map((className: string) =>
          <td onClick={e => this.openModal(e)} class={className}></td>
        )}

        <td class="createdDate" ></td>
        <td class="modifiedDate" ></td>
        <td onClick={e => this.deleteRow(e)} class="delete" >Delete</td>
      </tr>;

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

    this.dynamicServiceData = this.dynamicServiceData.filter(element =>
      element[key] === targetValue
    );

    this.renderTable(this.dynamicServiceData, false);
  }



  renderTable(tableData: any = this.serviceData, collectFilterData: boolean = true) {
    collectFilterData && setFilterKeys(this.pageID, this.headerKeys);

    this.tableRows = [];
    tableData.forEach(row => {
      let data;
      if (this.pageID === GC.id_home) {
        data =
          <tr>
            <td onClick={e => this.openModal(e)} class="prime" >{row.prime}</td>
            <td onClick={e => this.openModal(e)} class="menu" >{row.menu}</td>
            <td onClick={e => this.openModal(e)} class="name" >{row.name}</td>

            <td onClick={e => this.openModal(e)} class="option" >{row.option}</td>
            <td onClick={e => this.openModal(e)} class="price" >{row.price}</td>
            <td onClick={e => this.openModal(e)} class="dynamic-price" >{row["dynamic-price"]}</td>
            <td onClick={e => this.openModal(e)} class="tax" >{row.tax}</td>
            <td onClick={e => this.openModal(e)} class="code" >{row.code}</td>

            <td onClick={e => this.openModal(e)} class="description" >{row.description}</td>
            <td onClick={e => this.openModal(e)} class="image" >{row.image}</td>

            <td class="createdDate" >{GC.now}</td>
            <td class="modifiedDate" >{GC.now}</td>
            <td onClick={e => this.deleteRow(e)} class="delete" >Delete</td>
          </tr>;
      } else if (this.pageID === GC.id_prime) {
        data =
          <tr>
            <td onClick={e => this.openModal(e)} class="name">{row.name}</td>
            <td onClick={e => this.openModal(e)} class="time">{row["s-time"]}</td>
            <td onClick={e => this.openModal(e)} class="time">{row["e-time"]}</td>
            <td onClick={e => this.openModal(e)} class="date">{row["date"]}</td>

            <td class="createdDate" >{GC.now}</td>
            <td class="modifiedDate" >{GC.now}</td>
            <td onClick={e => this.deleteRow(e)} class="delete" >Delete</td>
          </tr>;
      } else if (this.pageID === GC.id_menu) {
        data =
          <tr>
            <td onClick={e => this.openModal(e)} class="name">{row.name}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.description}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.image}</td>

            <td class="createdDate" >{GC.now}</td>
            <td class="modifiedDate" >{GC.now}</td>
            <td onClick={e => this.deleteRow(e)} class="delete" >Delete</td>
          </tr>;
      } else if (this.pageID === GC.id_option) {
        data =
          <tr>
            <td onClick={e => this.openModal(e)} class="name">{row.name}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.item}</td>

            <td class="createdDate" >{GC.now}</td>
            <td class="modifiedDate" >{GC.now}</td>
            <td onClick={e => this.deleteRow(e)} class="delete" >Delete</td>
          </tr>;
      } else if (this.pageID === GC.id_item) {
        data =
          <tr>
            <td onClick={e => this.openModal(e)} class="name">{row.name}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.options}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.price}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.code}</td>

            <td class="createdDate" >{GC.now}</td>
            <td class="modifiedDate" >{GC.now}</td>
            <td onClick={e => this.deleteRow(e)} class="delete" >Delete</td>
          </tr>;
      } else if (this.pageID === GC.id_tax) {
        data =
          <tr>
            <td onClick={e => this.openModal(e)} class="name">{row.name}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.rate}</td>
            <td onClick={e => this.openModal(e)} class="text">{row.includeTip}</td>
            <td onClick={e => this.openModal(e)} class="date">{row.renewOn}</td>

            <td class="createdDate" >{GC.now}</td>
            <td class="modifiedDate" >{GC.now}</td>
            <td onClick={e => this.deleteRow(e)} class="delete" >Delete</td>
          </tr>;
      };

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



}
