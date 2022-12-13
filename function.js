
/* Constants and variables */
/* Data store with initial data */
const data = [
  { name: "Tripadvisor", code: "", expire: "2025-01-01" },
  { name: "Aline", code: "01-GHI-DEF-ABC", expire: "2024-01-01" },
  { name: "Spotify", code: "ABC-DEF-GHI-01", expire: "2023-01-01" }
];
let selectedRowIx;
let prevSelection;
let table;
let status;

/* Functions */
window.onload = function() {
  status = document.getElementById("status");
  table = document.getElementById("data-table");
  loadData();
}
/*
 * Routine to get the data and populate the HTML table, initially.
 */
function loadData() {
data.forEach(e => createTable(e));
status.innerHTML = "Loaded " + data.length + " items.";
if (data.length) {
selectRow();
scrollToSelection();
}
}
/*
 * Create HTML table row for each data element.
 */
function createTable(e) {
  selectedRowIx = table.rows.length;
  const tableRow = table.insertRow(selectedRowIx);
  const cell1 = tableRow.insertCell(0);
  const cell2 = tableRow.insertCell(1);
  const cell3 = tableRow.insertCell(2);
  const cell4 = tableRow.insertCell(3);
  cell1.innerHTML = e.name;
  cell1.className = "t-name";
  cell2.innerHTML = e.code;
  cell2.className = "t-code";
  cell3.innerHTML = e.expire;
  cell3.className = "t-exp";
  cell4.innerHTML = "<input type='radio' name='select' onclick='selectRow(this)' checked>";
  cell4.className = "t-radio";
}
function selectRow(obj) {
  const row = (obj) ? obj.parentElement.parentElement : table.rows[table.rows.length - 1];
  selectedRowIx = row.rowIndex;
  if (obj) {
  status.innerHTML = "Selected row " + selectedRowIx;
  }
  setSelection(row);
}
function setSelection(row) {
  document.getElementById("name").value = row.cells.item(0).innerHTML;
  document.getElementById("code").value = row.cells.item(1).innerHTML;
  row.className = "r-select";
  if (prevSelection && prevSelection !== selectedRowIx) {
  table.rows[prevSelection].className = "r-unselect";
  }
  prevSelection = selectedRowIx
}
function scrollToSelection() {
const ele = document.getElementById("table-wrapper")
const bucketHt = ele.clientHeight
const itemHt = ele.scrollHeight / table.rows.length
const noItemsInBucket = parseInt(bucketHt / itemHt)
const targetBucket = (selectedRowIx + 1) / noItemsInBucket
const scrollPos = (bucketHt * (targetBucket - 1)) + (bucketHt / 2)
ele.scrollTop = Math.round(scrollPos)
}
/*
 * Routine to add a new item data to the HTML table and the data store.
 */
function addData() {
  const name = document.getElementById("name").value;
  const code = document.getElementById("code").value;
  const expire = document.getElementById("expire").value;
  if (!name) {
    alert("Name is required!");
    document.getElementById("name").focus();
    return;
  }
  if (code <= 0) {
    alert("code must be greater than zero!");
    document.getElementById("code").focus();
    return;
  }
  addToTable({ name: name, code: code, expire: expire });
}
function addToTable(item) {
  status.innerHTML = "New item added";
  data.push(item);
  createTable(item);
  selectRow();
  scrollToSelection();
}
/*
 * Routine to update an item code with a new value,
 * for a selected item. Allows only change of code.
 */
function updateData() {
if (!selectedRowIx) {
  alert("Select a row to update!")
}
else {
  const expire = table.rows[selectedRowIx].cells.item(1).innerHTML;
  const code = table.rows[selectedRowIx].cells.item(1).innerHTML;
  const name = table.rows[selectedRowIx].cells.item(0).innerHTML;
  const nameInput = document.getElementById("name").value;
  const codeInput = document.getElementById("code").value;
  if (name !== nameInput) {
  alert("Name cannot be changed!");
  document.getElementById("name").focus();
  return;
  }
  if (codeInput <= 0 || code == codeInput) {
  alert("code is required and it must be a new value!")
  document.getElementById("code").focus();
  return;
  }
  updateTable(name, codeInput)
  }
}
function updateTable(name, code) {
  table.rows[selectedRowIx].cells.item(1).innerHTML = code;
  data.splice(selectedRowIx-1, 1, { name: name, code: parseInt(code) });
  status.innerHTML = "Item code updated.";
  scrollToSelection();
}
/*
 * Routine to delete a selected row from the HTML table and the data store.
 */
function deleteData() {
  if (!selectedRowIx) {
  alert("Select a row to delete!");
  }
  else {
  status.innerHTML = "Item deleted";
  data.splice(selectedRowIx-1, 1);
  table.deleteRow(selectedRowIx);
  initValues();
  }
}
function initValues() {
  selectedRowIx = null;
  prevSelection = null;
  document.getElementById("name").value = "";
  document.getElementById("code").value = "";
  document.getElementById("expire").value = "2022-12-01";
}
/*
 * Routine to clear the selected row in the HTML table as well
 * as the input and status fields.
 */
function clearData() {
  if (selectedRowIx) {
  table.rows[selectedRowIx].cells.item(2).firstChild.checked = false;
  table.rows[selectedRowIx].className = "t-unselect";
  }
  initValues();
  status.innerHTML = "";
}
/*
 * Routine for selecting the first or the last row of the HTML table
 * (depending upon the parameter "n" - the value 1 for selecting the
 * first row, otherwise the last one).
 */
function selectFirstOrLastRow(n) {
  if (table.rows.length < 2) {
  status.innerHTML = "No data in table!";
  return;
  }
  selectedRowIx = (n === 1) ? 1 : (table.rows.length - 1);
  const row = table.rows[selectedRowIx];
  row.cells[2].children[0].checked = true;
  setSelection(row);
  scrollToSelection();
  status.innerHTML = "Selected row " + selectedRowIx;
}
