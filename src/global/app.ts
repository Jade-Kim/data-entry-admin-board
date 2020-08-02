export default async () => {
  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */
};

// Global Constants
export class GC {
  /* Page IDs */
  static id_home = "home";
  static id_prime = "prime";
  static id_menu = "menu";
  static id_option = "option";
  static id_item = "item";
  static id_tax = "tax";

  /* Common Table Head Titles */
  //static commonHead = `"Delete Row", "Created At", "Modified At"`;
  static thDelete = "Delete Row";
  static thCreated = "Created At";
  static thModified = "Modified At";

  /* Filter Categories */
  static filter = "filter";
  static fList = "list";

  static relatedItems = 10;

  static get now() {
    return new Date().toISOString();
  }
}


// ** Set Filter Category Data **//
export var filterCategory = {};

// Prepare empty arrays
export function setFilterKeys(pageID, headerKeys) {
  headerKeys.forEach(key => {
    if (!filterCategory[pageID]) filterCategory[pageID] = {};
    filterCategory[pageID][key] = [];
  });
};

// Collect unique set of filter data on each column
export function setFilterCategoryEachRow(pageID, row) {
  for (const key in row) {
    if (Object.prototype.hasOwnProperty.call(row, key)) {
      let filterKey = filterCategory[pageID][key];
      filterKey && !filterKey.includes(row[key]) && filterKey.push(row[key]);
    };
  };
};

export function resetFilter(pageFilter){
  document.querySelectorAll(`.${pageFilter}`).forEach(select => {
    if (select["value"] !== "all") select["value"] = "all";
  });
}


// ** Sort by Object Key ** //
export function sortBy(e: any, headerKeys: any, data: any, isAsc: boolean) {
  let key: string = headerKeys[e["target"]["cellIndex"]];
  let sorted: any;

  let previousColumn = document.querySelector(".onSort");
  if (previousColumn) previousColumn.className = "";
  e["target"]["className"] = "onSort";

  if (isAsc) {
    sorted = data.sort(dynamicSort(key, '', 'desc'));
    isAsc = false;
  } else {
    sorted = sorted = data.sort(dynamicSort(key));
    isAsc = true;
  };

  return [isAsc, sorted];
}

export function dynamicSort(key1: string, key2: string = '', order: string = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key1) || !b.hasOwnProperty(key1)) {
      // property doesn't exist on either object
      return 0;
    }
    // const varA = (typeof a[key1] === 'string')
    //     ? a[key1].toUpperCase() : a[key1][key2].toUpperCase();
    // const varB = (typeof b[key1] === 'string')
    //     ? b[key1].toUpperCase() : b[key1][key2].toUpperCase();

    const varA = (typeof a[key1] === 'string' && a[key1].includes("$"))
      ? Number(a[key1].replace('$', '')) : (typeof a[key1] === 'string') ? a[key1].toUpperCase() : a[key1][key2].toUpperCase();
    const varB = (typeof b[key1] === 'string' && b[key1].includes("$"))
      ? Number(b[key1].replace('$', '')) : (typeof b[key1] === 'string') ? b[key1].toUpperCase() : b[key1][key2].toUpperCase();

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}


// ** Get Related Table Data ** //
export function getRelatedData(e, tab, isDeleteOperation = false) {
  let tableData;
  if (isDeleteOperation) {
    tableData = collectRelatedData(e.target.parentElement.childNodes[0].innerText, tab);
  } else {
    tableData = collectRelatedData(e.target.innerText, tab);
  }

  const tableLength = tableData.length;
  if (tableLength > GC.relatedItems) {
    tableData = tableData.slice(0, 10);
  }

  let tds = [];
  tableData.map(tr => {
    let td1 = [];
    tr.childNodes.forEach(td => {
      td1.length < 7 && td1.push(td.innerText);
    });
    tds.push(td1);
  });

  return [tds, tableLength];
}

function collectRelatedData(name, tab) {
  let relatedData = [];
  document.querySelectorAll(`.${tab}`).forEach(el => {
    if (el.textContent === name) relatedData.push(el.parentElement);
  });
  return relatedData;
}


// ** Handling Delete Row Color ** //
export function changeDeleteRowColor(e, tableBody) {
  if (e.target.className.includes("delete")) {
    const rowIndex = e.target.parentElement.rowIndex;
    const row = tableBody.children[rowIndex - 2];
    row["style"]["background-color"] = "lightcoral";
  }
}

export function removeDeleteRowColor(tableBody, target) {
  const row = tableBody.children[target.rowIndex - 2];
  row.removeAttribute("style");
}


// ** Fire Events ** //
const changedNameNotifier: Array<Function> = [];
export function changedNameListen(f: Function) { changedNameNotifier.push(f); };
export function changedNameEventEmit(tab: string, oldName: string, newName: string) {
  for (let i = 0; i < changedNameNotifier.length; i++) { changedNameNotifier[i](tab, oldName, newName); };
};

const deletedNameNotifier: Array<Function> = [];
export function deletedNameListen(f: Function) { deletedNameNotifier.push(f); };
export function deletedNameEventEmit(tab: string, name: string) {
  for (let i = 0; i < deletedNameNotifier.length; i++) { deletedNameNotifier[i](tab, name); };
};


const beforeEditingNameNotifier: Array<Function> = [];
export function beforeEditingNameListen(f: Function) { beforeEditingNameNotifier.push(f); };
export function beforeEditingNameEventEmit() {
  for (let i = 0; i < beforeEditingNameNotifier.length; i++) { beforeEditingNameNotifier[i](); };
};