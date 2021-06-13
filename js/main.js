const form = document.querySelector("form");
const divForNames = document.querySelector("#names");
const amtsField = document.querySelector("#sums");
const myTable = document.querySelector("#myTable");
const tableData = document.getElementById("tabledata");
const productsInput = document.getElementById("products");
const openedInput = document.getElementById("open");
const addedInput = document.getElementById("added");
const totalitemsInput = document.getElementById("totalitems");
const closingInput = document.getElementById("closing");
const priceInput = document.getElementById("price");
let salesInputDiv = document.getElementById("salesDiv");
const ammountInput = document.getElementById("ammount");
const mySum = document.querySelector(".mySum");
let DB;

const spanelement = document.querySelector(".spanelement");

// listen for the window to load
window.onload = () => {
  // create database
  let request = window.indexedDB.open("data", 1);

  // check for error while creating database
  request.onerror = () => {
    console.log("database can not open due to some error");
  };

  // check if database has been created successfully
  request.onsuccess = () => {
    console.log("database opened successfully");
    DB = request.result;

    // call a function to display data to the dom
    displayData();
  };

  // insert data to database
  request.onupgradeneeded = (e) => {
    let DB = e.target.result;
    let objectStore = DB.createObjectStore("counterBook", {
      keyPath: "id",
      autoIncrement: true,
    });

    objectStore.createIndex("products", "products", { unique: false });

    objectStore.createIndex("opened", "opened", { unique: false });

    objectStore.createIndex("added", "added", { unique: false });

    objectStore.createIndex("totalitems", "totalitems", { unique: false });

    objectStore.createIndex("closing", "closing", { unique: false });

    objectStore.createIndex("price", "price", { unique: false });

    objectStore.createIndex("sales", "sales", { unique: false });

    objectStore.createIndex("ammount", "ammount", { unique: false });

    console.log("database setup compleated :)");

    // create a table for bills
    let bills = DB.createObjectStore("currentBills", {
      keyPath: "id",
      autoIncrement: true,
    });

    bills.createIndex("name", "name", { unique: false });
    bills.createIndex("ammount", "ammount", { unique: false });
    console.log("ammount created successfully:)");

    // create a table for expenses
    let expense = DB.createObjectStore("currentExpense", {
      keyPath: "id",
      autoIncrement: true,
    });

    expense.createIndex("name", "name", { unique: false });
    expense.createIndex("ammount", "ammount", { unique: false });
    console.log("Expense created successfully:)");

    // create a table for miscellaneous
    let miscellaneous = DB.createObjectStore("current", {
      keyPath: "id",
      autoIncrement: true,
    });

    miscellaneous.createIndex("name", "name", { unique: false });
    miscellaneous.createIndex("ammount", "ammount", { unique: false });
    console.log("miscellaneous created successfully:)");

    // create a table for payment methods
    let payment = DB.createObjectStore("paymentMethods", {
      keyPath: "id",
      autoIncrement: true,
    });

    payment.createIndex("name", "name", { unique: false });
    payment.createIndex("ammount", "ammount", { unique: false });
    console.log("Payment methods created successfully:)");
  };

  //Display data to the UI
  function displayData() {
    while (tableData.firstChild) {
      tableData.removeChild(tableData.firstChild);
    }

    let objectStore = DB.transaction("counterBook").objectStore("counterBook");

    objectStore.openCursor().onsuccess = (e) => {
      let cursor = e.target.result;
      if (cursor) {
        spanelement.classList.remove("hide");
        const rightpane = document.querySelector(".right-pane");
        const leftpane = document.querySelector(".left-pane");
        const bottompane = document.querySelector(".fixed-bottom");
        rightpane.classList.remove("hide");
        leftpane.classList.remove("hide");
        bottompane.classList.remove("hide");
        /**------------------ make jumbotron to the dom--------------------------**/

        let jumbot = document.createElement("div");
        let cardBodyForJumbotron = (document.createElement("div").className =
          "card-body");
        let cardTitleForJumbotron = (document.createElement("div").className =
          "card-title d-flex justify-content-start text-xl"); //cardTitleForJumbotron.textContent = "balozi"//
        let firstRowForJumbotron = (document.createElement("div").className =
          "row rl");
        let secondRowForJumbotron = (document.createElement("div").className =
          "row rl mb-2");
        let editButtonForJumbotron = (document.createElement("div").className =
          "btn btn-sm btn-outline-success");
        let DeleteButtonForJumbotron = (document.createElement(
          "div"
        ).className = "btn btn-sm btn-outline-warning ml-2");

        //Appending nodes to parents
        tableData.appendChild(jumbot).className =
          "jumbotron container justify-content-center mb-4 tron-boder";
        /**-----------------------------------------------------------------------**/

        let ul = document.createElement("div");
        let ul2 = document.createElement("div");
        let ul3 = document.createElement("div");
        let ul4 = document.createElement("div");
        let ul6 = document.createElement("div");

        let tdOpenName = document.createElement("div");
        let tdAddedName = document.createElement("div");
        let tdTotalitemsName = document.createElement("div");
        let tdClosingName = document.createElement("div");
        let tdSalesName = document.createElement("div");
        let tdAmmountName = document.createElement("div");

        ul.appendChild(tdOpenName).className = "col-2 py-1";
        ul.appendChild(tdAddedName).className = "col-2 py-1";
        ul.appendChild(tdTotalitemsName).className = "col-2 py-1";
        ul.appendChild(tdClosingName).className = "col-2 py-1";
        ul.appendChild(tdSalesName).className = "col-2 py-1";
        ul.appendChild(tdAmmountName).className = "col-2 py-1";

        let tdNumbers = document.createElement("div");
        let tdProducts = document.createElement("div");
        let tdOpen = document.createElement("div");
        let tdAdded = document.createElement("div");
        let tdTotalitems = document.createElement("div");
        let tdClosing = document.createElement("div");
        let tdPrice = document.createElement("div");
        let tdSales = document.createElement("div");
        let tdAmmount = document.createElement("div");

        ul2.appendChild(tdOpen).className = "col-2 py-1";
        ul2.appendChild(tdAdded).className = "col-2 py-1";
        ul2.appendChild(tdTotalitems).className = "col-2 py-1";
        ul2.appendChild(tdClosing).className = "col-2 py-1";
        ul2.appendChild(tdSales).className = "col-2 py-1";
        ul2.appendChild(tdAmmount).className = "amts col-2 py-1";

        let tdProductsName = document.createElement("div");
        let tdPriceName = document.createElement("div");

        ul3.appendChild(tdNumbers).className = "col-1 numm text-muted";
        ul3.appendChild(tdProducts).className = "col-6 name";

        ul3.appendChild(tdPriceName).className = "col-1 ksh";
        ul3.appendChild(tdPrice).className = "col-1 price";

        tableData.appendChild(jumbot);
        jumbot.appendChild(ul3).className = "row py-4"; //number
        const devider = document.createElement("div");
        const boderbotom = document.createElement("div");
        const boderbotom2 = document.createElement("div");
        const buttonfield = document.createElement("div");
        const i = document.createElement("i");
        const i2 = document.createElement("i");
        const deleteBtnSpan = document.createElement("span");
        const editBtnSpan = document.createElement("span");

        buttonfield.appendChild(editBtnSpan).className =
          "btn btn-sm btn-outline-info edit";
        buttonfield.appendChild(deleteBtnSpan).className =
          "btn btn-sm btn-outline-danger ml-2 delete";
        jumbot.appendChild(ul6); //price
        jumbot.appendChild(ul4); //ksh
        jumbot.appendChild(boderbotom).className = "rl";
        jumbot.appendChild(ul).className = "row text-center mt-1";
        jumbot.appendChild(devider).className = "devider";
        jumbot.appendChild(ul2).className = "row text-center";
        jumbot.appendChild(boderbotom2).className = "rl";
        jumbot.appendChild(buttonfield).className = "row ml-4 py-2";
        editBtnSpan.appendChild(i2).className = "fas fa-edit";
        deleteBtnSpan.appendChild(i).className = "fas fa-trash-alt";
        deleteBtnSpan.onclick = deleteItem;

        // products number

        tdNumbers.textContent = `${cursor.value.id}. `;
        tdProducts.textContent = cursor.value.products;
        tdOpen.textContent = cursor.value.opened;
        tdAdded.textContent = cursor.value.added;
        tdTotalitems.textContent = cursor.value.totalitems;
        tdClosing.textContent = cursor.value.closing;
        tdPrice.textContent = cursor.value.price;
        tdSales.textContent = cursor.value.sales;
        tdAmmount.textContent = cursor.value.ammount;

        tdProductsName.textContent = `Name`;
        tdOpenName.textContent = `Open`;
        tdAddedName.textContent = `Add`;
        tdTotalitemsName.textContent = `Stock`;
        tdClosingName.textContent = `Close`;
        tdPriceName.textContent = `Ksh`;
        tdSalesName.textContent = `Sales`;
        tdAmmountName.textContent = `Sub`;

        tableData.setAttribute("data-product-id", cursor.value.id);

        // add all amts
        let amt = document.querySelectorAll(".amts");
        let sumVal = 0;
        for (let i = 0; i < amt.length; i++) {
          sumVal = sumVal + parseInt(amt[i].innerText);
        }

        mySum.textContent = sumVal;
        console.log(sumVal);

        cursor.continue();

        // let deleteBtn = document.createElement("button");
        // ul.appendChild(deleteBtn).style =
        //   "color:white; background:red; border:none; margin-left:5px";
        // deleteBtn.textContent = "Delete";

        // deleteBtn.onclick = deleteItem;

        // If you want to show the delete button make it block
        // cursor.continue();
        // deleteBtn.style = "display:none";
      } else {
        if (!tableData.firstChild) {
          const rightpane = document.querySelector(".right-pane");
          const leftpane = document.querySelector(".left-pane");
          const bottompane = document.querySelector(".fixed-bottom");
          rightpane.classList.add("hide");
          leftpane.classList.add("hide");
          bottompane.classList.add("hide");
          let para = document.createElement("p");
          para.innerHTML = `<div class="nodata"><div class="nodataimage"></div><h4>No data to display!</h4><br> <h6>To create a new file Go to file, new. or click the button below</h6><br> <span class="btn btn-lg btn-success" data-toggle="modal"
                data-target=".staticBackdrop"><i class="far fa-file"></i> Add New File</span> <br> <span class="btn btn-sm btn-outline-info mt-3"><u>Read More...</u></span></div>`;
          tableData.appendChild(para).className =
            "mt-5 container mb-5 text-center text-muted";
        }
        console.log("no data display page fired");
      }
    };
  }

  // Submit data to database
  form.onsubmit = (e) => {
    e.preventDefault();
    let salesInput = document.createElement("input");

    //------------------------------------------------------------------------
    //Add the opened products with the added products to get total items
    const openval = parseInt(openedInput.value);
    const addedval = parseInt(addedInput.value);
    const openandaddedval = parseInt(openval + addedval);

    let mysel = (salesInputDiv.salesInput =
      openandaddedval - parseInt(closingInput.value));

    //Times price with sales(price x sales) to get ammount
    const priceval = parseInt(priceInput.value);
    const salesval = parseInt(mysel);
    const priceandsalesval = parseInt(priceval * salesval);

    //--------------------------------------------------------------------------

    let insertItemsToDatabase = {
      products: productsInput.value,
      opened: openedInput.value,
      added: addedInput.value,
      totalitems: openandaddedval,
      closing: closingInput.value,
      price: priceInput.value,
      sales: mysel,
      ammount: priceandsalesval,
    };

    let transaction = DB.transaction(["counterBook"], "readwrite");

    let objectStore = transaction.objectStore("counterBook");

    const request = objectStore.add(insertItemsToDatabase);

    request.onsuccess = () => {
      productsInput.value = "";
      openedInput.value = "";
      addedInput.value = "";
      totalitemsInput.value = "";
      closingInput.value = "";
      priceInput.value = "";
      salesInput.value = "";
      ammountInput.value = "";
    };

    transaction.oncomplete = () => {
      console.log("Transaction completed: database modification finished.");
      displayData();
    };

    transaction.onerror = () => {
      console.log("Transaction not opened due to error");
    };
  };

  function deleteItem(e) {
    let productId = Number(
      e.target.parentNode.parentNode.parentNode.getAttribute("data-product-id")
    );
    let transaction = DB.transaction(["counterBook"], "readwrite");
    let objectStore = transaction.objectStore("counterBook");
    objectStore.delete(productId);

    transaction.oncomplete = () => {
      e.target.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode
      );
      console.log("product " + productId + " deleted.");

      if (!tableData.firstChild) {
        let para = document.createElement("p");
        para.innerHTML = `<div class="nodata"><h4>No data to display!</h4><br> <h6>To create a new file Go to file, new. or click the button below</h6><br> <span class="btn btn-lg btn-success" data-toggle="modal"
                data-target=".staticBackdrop"><i class="far fa-file "></i> Add New File</span> <br> <span class="btn btn-sm btn-outline-info mt-3"><u>Read More...</u></span></div>`;
        tableData.appendChild(para).className =
          "mt-5 container mb-5 text-center text-muted";
      }
    };
    window.location.reload();
  }
};

// buttonfield.appendChild(deleteBtn).className =
//   "btn btn-sm btn-outline-primary ml-4 delete";
// const i = document.createElement("i");

// // If you want to show the delete button make it block
// deleteBtn.style = "display:block";

function rightAdjust() {
  let resizeRightSide;
  function resize(e) {
    const parent = resizeHand.parentNode;
    const xAxis = resizeRightSide - e.x;
    resizeRightSide = e.x;
    parent.style.width =
      parseInt(getComputedStyle(parent, "").width) + xAxis + "px";
  }

  const resizeHand = document.getElementById("resize");
  resizeHand.addEventListener(
    "mousedown",
    function (e) {
      resizeRightSide = e.x;
      document.addEventListener("mousemove", resize, false);
    },
    false
  );
  document.addEventListener(
    "mouseup",
    function () {
      document.removeEventListener("mousemove", resize, false);
    },
    false
  );
}
rightAdjust();

// function leftAdjust() {
//   let resizeLeftSide;
//   function resize2(e) {
//     const parent2 = resizeHand2.parentNode;
//     const xAxis2 = resizeLeftSide - e.x;
//     resizeLeftSide = e.x;
//     parent2.style.width =
//       parseInt(getComputedStyle(parent2, "").width) - xAxis2 + "px";
//   }

//   const resizeHand2 = document.getElementById("resize2");
//   resizeHand2.addEventListener(
//     "mousedown",
//     function (e) {
//       resizeLeftSide = e.x;
//       document.addEventListener("mousemove", resize2, false);
//     },
//     false
//   );
//   document.addEventListener(
//     "mouseup",
//     function () {
//       document.removeEventListener("mousemove", resize2, false);
//     },
//     false
//   );
// }

// leftAdjust();

// const elem = document.querySelector("#elem");
// elem.oncontextmenu = function (event) {
//   event.preventDefault();
//   alert("Button context menu");
// };
// document.oncontextmenu = function (event) {
//   if (event.defaultPrevented) return;

//   event.preventDefault();
//   alert("Document context menu");
// };

// $(document).ready(function () {
//   $(".myclass").mousedown(function (event) {
//     switch (event.which) {
//       case 1:
//         alert("Left mouse button is pressed");
//         break;
//       case 2:
//         alert("Middle mouse button is pressed");
//         break;
//       case 3:
//         alert("Right mouse button is pressed");
//         break;
//       default:
//         alert("Nothing");
//     }
//   });
// });

window.onclick = hideMenu;
window.onkeydown = listenKeys;
const contextMenu = document.querySelector("#contextMenu");

function showMenu(event) {
  contextMenu.style.display = "block";
  contextMenu.style.left = event.clientX + "px";
  contextMenu.style.top = event.clientY + "px";
  return false;
}

function hideMenu() {
  contextMenu.style.display = "none";
}

function listenKeys(e) {
  const keyCode = event.which || event.keyCode;
  if (keyCode == 27) {
    hideMenu();
  }
}

window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);
