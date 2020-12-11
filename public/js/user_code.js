/* jshint esversion: 8 */

//J S   C L I E N T - S I D E   C O D E



// GET THE RELEVANT DOM ELEMENTS


// hamburger button and hidden menu (for smaller screens)

var menuButton = document.getElementById("menu-button");
var hiddenMenu = document.getElementById("hidden-menu");

// dropdown buttons and menus

var dropdownButtonHeader = document.getElementById("dropdown-button-header");
var dropdownButtonHidden = document.getElementById("dropdown-button-hidden");
var dropdownButtonFooter = document.getElementById("dropdown-button-footer");
var dropdownIconHeader = document.getElementById("dropdown-icon-header");
var dropdownIconHidden = document.getElementById("dropdown-icon-hidden");
var dropdownIconFooter = document.getElementById("dropdown-icon-footer");
var dropdownMenuHeader = document.getElementById("dropdown-menu-header");
var dropdownMenuHidden = document.getElementById("dropdown-menu-hidden");
var dropdownMenuFooter = document.getElementById("dropdown-menu-footer");

// popup

var popup = document.getElementById("popup");
var popupForm = document.getElementById("popup-form");
var popupButton = document.getElementById("popup-button");

// arrays of dynamic elements on the "pood" page

var linkBtnArray = document.querySelectorAll(".linkBtn");
var orderBtnArray = document.querySelectorAll(".orderBtn");
var textBoxArray = document.querySelectorAll(".textBox");

// buttons and dynamic elements on the "telli" page

var hiddenCheckbox = document.getElementById("hiddenCheckbox");
var hiddenSum = document.getElementById("hiddenSum");
var itemCountArray = document.querySelectorAll(".itemCount");
var numberBtnMinusArray = document.querySelectorAll(".numberBtnMinus");
var numberBtnPlusArray = document.querySelectorAll(".numberBtnPlus");
var priceArray = document.querySelectorAll(".price");
var sum = document.getElementById("sum");

// client-side forms

var orderForm = document.getElementById("orderForm");
var contactForm = document.getElementById("contactForm");




// TOGGLE DROPDOWN MENUS




// make the dropdown menu visible


function toggleHiddenMenu() {
  if (hiddenMenu !== null) {
    hiddenMenu.classList.toggle("show");
    hiddenMenu.classList.toggle("hide");
  }
}


// remove the dropdown menu


function removeHiddenMenu() {
  if (hiddenMenu !== null) {
    hiddenMenu.classList.remove("show");
    hiddenMenu.classList.add("hide");
  }
}




// PREVENT SCROLLING WHEN POPUP IS VISIBLE




// listen to scroll events


window.addEventListener("scroll", noScroll);


// function that stops the user from scrolling when the popup is on


function noScroll() {
  if (popup !== null) {
    if (popup.classList.contains("show")) {
      window.scrollTo(0, 0);
    }
  }
}




// TOGGLE THE POPUP




// make the popup visible


function addPopup() {
  if (popup !== null) {
    popup.classList.add("show");
    popup.classList.remove("hide");
  }
}


// remove the popup


function removePopup() {
  if (popup !== null) {
    popup.classList.remove("show");
    popup.classList.add("hide");
  }


  // remove the "success" and "failure" popups


  if (successPopup !== null) {
    successPopup.classList.remove("show");
    successPopup.classList.add("hide");
  }

  if (failurePopup !== null) {
    failurePopup.classList.remove("show");
    failurePopup.classList.add("hide");
  }
}




// MAKE THE DROPDOWN MENU VISIBLE



// toggle the dropdown menu


function toggleDropdownMenuHeader() {
  if (dropdownMenuHeader !== null) {
    dropdownMenuHeader.classList.toggle("show");
    dropdownMenuHeader.classList.toggle("hide");
  }
}


// remove the dropdown menu


function removeDropdownMenuHeader() {
  if (dropdownMenuHeader !== null) {
    dropdownMenuHeader.classList.remove("show");
    dropdownMenuHeader.classList.add("hide");
  }
}


// toggle the hidden dropdown menu


function toggleDropdownMenuHidden() {
  if (dropdownMenuHidden !== null) {
    dropdownMenuHidden.classList.toggle("show");
    dropdownMenuHidden.classList.toggle("hide");
    dropdownButtonHidden.classList.toggle("rotate");
  }
}


// remove the hidden dropdown menu


function removeDropdownMenuHidden() {
  if (dropdownMenuHidden !== null) {
    dropdownMenuHidden.classList.remove("show");
    dropdownMenuHidden.classList.add("hide");
    dropdownButtonHidden.classList.remove("rotate");
  }
}

function toggleDropdownMenuFooter() {
  if (dropdownMenuFooter !== null) {
    dropdownMenuFooter.classList.toggle("show");
    dropdownMenuFooter.classList.toggle("hide");
  }
}


// remove the dropdown (dropup?) menu from the footer


function removeDropdownMenuFooter() {
  if (dropdownMenuFooter !== null) {
    dropdownMenuFooter.classList.remove("show");
    dropdownMenuFooter.classList.add("hide");
  }
}




// LISTEN TO CLICK, TOUCH OR KEYPRESS (NOT TAB) TO ACTIVATE DIFFERENT FUNCTIONS




//Call the above function on click, touch or keypress (not Tab)

document.addEventListener("click", listenEvents);
document.addEventListener("touchend", listenEvents);
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    listenEvents(event);
  }
});


// function that activates some of the above functions depending on what was clicked and closes all hidden menus and popups if the click target is not relevant


function listenEvents(event) {

  if (popup !== null && popup.classList.contains("show")) {
    if (event.target.parentNode !== popupForm && event.target !== popupForm || event.target === popupButton) {
      removePopup();
    }
  } else if (successPopup !== null && successPopup.classList.contains("show")) {
    removePopup();
  } else if (failurePopup !== null && failurePopup.classList.contains("show")) {
    removePopup();
  } else if (hiddenMenu !== null) {
    if (event.target === menuButton) {
      event.preventDefault();
      toggleHiddenMenu();
      removeDropdownMenuHeader();
      removeDropdownMenuHidden();
      removeDropdownMenuFooter();
    } else if (event.target === dropdownButtonHeader || event.target === dropdownIconHeader) {
      event.preventDefault();
      removeHiddenMenu();
      toggleDropdownMenuHeader();
      removeDropdownMenuHidden();
      removeDropdownMenuFooter();
    } else if (event.target === dropdownButtonHidden || event.target === dropdownIconHidden) {
      event.preventDefault();
      removeDropdownMenuHeader();
      toggleDropdownMenuHidden();
      removeDropdownMenuFooter();
    } else if (event.target === dropdownButtonFooter || event.target === dropdownIconFooter) {
      event.preventDefault();
      removeHiddenMenu();
      toggleDropdownMenuFooter();
      removeDropdownMenuHidden();
      removeDropdownMenuHeader();
    } else {
      removeHiddenMenu();
      removeDropdownMenuHeader();
      removeDropdownMenuHidden();
      removeDropdownMenuFooter();
    }
  }
}




// JS CODE FOR THE "POOD" AND "TELLI" PAGES




// call the changePrice function on all the price elements when loading the page


for (var i = 0; i < priceArray.length; i++) {

  // get each price element in the array separately

  var priceElement = priceArray[i];

  // use the same iterator and get a corresponding number input from the itemCountArray

  var numberInput = itemCountArray[i];

  // check the value of this number input

  if (numberInput.value != 0) {

    // if it is anything other than 0, call the changePrice function

    changePrice(priceElement, i);
  }
}


//listen to clicks and touches on the "show more" buttons on the "pood" page


for (var i = 0; i < linkBtnArray.length; i++) {
  linkBtnArray[i].addEventListener("click", function(event) {
    showContents(event);
  });
}

for (var i = 0; i < linkBtnArray.length; i++) {
  linkBtnArray[i].addEventListener("touchend", function(event) {
    event.preventDefault();
    showContents(event);
  });
}


// listen to clicks and touches on the "order" buttons on the "pood" page


for (var i = 0; i < orderBtnArray.length; i++) {
  orderBtnArray[i].addEventListener("click", function(event) {
    redirectToCustom(event);
  });
}

for (var i = 0; i < orderBtnArray.length; i++) {
  orderBtnArray[i].addEventListener("touchend", function(event) {
    redirectToCustom(event);
  });
}


// listen to clicks and touches on the number buttons on the "telli" page


for (var i = 0; i < numberBtnPlusArray.length; i++) {
  numberBtnPlusArray[i].addEventListener("click", function(event) {
    event.preventDefault();
    changeItemCount(event, "plus");
  });
}

for (var i = 0; i < numberBtnPlusArray.length; i++) {
  numberBtnPlusArray[i].addEventListener("touchend", function(event) {
    event.preventDefault();
    changeItemCount(event, "plus");
  });
}

for (var i = 0; i < numberBtnMinusArray.length; i++) {
  numberBtnMinusArray[i].addEventListener("click", function(event) {
    event.preventDefault();
    changeItemCount(event, "minus");
  });
}

for (var i = 0; i < numberBtnMinusArray.length; i++) {
  numberBtnMinusArray[i].addEventListener("touchend", function(event) {
    event.preventDefault();
    changeItemCount(event, "minus");
  });
}


// listen to changes on the number inputs on the "telli" page
// (because we pass the iterator into a function, we use the "let" keyword)


for (let i = 0; i < itemCountArray.length; i++) {

  itemCountArray[i].addEventListener("change", function(event) {

    // construct an id number using the iterator
    // (add 1 to it because the id numbers start from 1 not 0 like in javascript)

    var idNumber = i + 1;

    // use this id number to get the corresponding price element

    var priceElement = document.getElementById("price" + idNumber);

    // check if the corresponding number input is valid and not empty

    if (itemCountArray[i].checkValidity() === true && itemCountArray[i].value != "") {

      // of those conditions apply, check that the input value is an integer

      if (itemCountArray[i].value !== parseInt(itemCountArray[i].value)) {

        // if it isn't turn it into one

        itemCountArray[i].value = parseInt(itemCountArray[i].value);
      }

      // pass the price element and the current iterator into the function that will change the price number

      changePrice(priceElement, i);

    } else {

      // if the corresponding number input is invalid just convert it into zero

      itemCountArray[i].value = 0;

      // call the function that will change the price number

      changePrice(priceElement, i);
    }
  });
}


// listen to the "submit" event on the "telli" and "kontakt" pages


if (orderForm !== null) {
  orderForm.addEventListener("submit", function(event) {
    ajaxPostForm(event, "telli/email", createOrderData());
  });
}

if (contactForm !== null) {
  contactForm.addEventListener("submit", function(event) {
    alert("A");
    ajaxPostForm(event, "kontakt/email", createContactData());
  });
}


// when the "pood" page loads, check if any textbox elements are overflown

if (textBoxArray.length !== 0) {
  for (var i = 0; i < textBoxArray.length; i++) {
    checkIfOverflown(textBoxArray[i]);
  }
}


// function that checks whether the element is vertically overflown

function checkIfOverflown(element) {

  // check if the provided element is overflown

  if (element.scrollHeight > element.clientHeight) {

    // if yes, obtain its id attribute

    var id = element.id;

    // get the id number from the end of the id

    var idNumber = id.slice(7);

    // use this id number to get a corresponding link button on the page

    var linkBtn = document.getElementById("linkBtn" + idNumber);

    // display this link button by removing the "delete" class from its classlist

    linkBtn.classList.remove("delete");
  }

}

// function for showing the overflown contents of an item on the "pood" page


function showContents(event) {

  // get the id of the element that triggered the event

  var id = event.target.id;

  // the id has a number at the end

  var idNumber = id.slice(7);

  // get the corresponding text-box element using this obtained number

  var textBox = document.getElementById("textBox" + idNumber);

  // check if this text-box has a class of "low-fixed-height"

  if (textBox.classList.contains("low-fixed-height")) {

    // if yes, remove this class

    textBox.classList.remove("low-fixed-height");

    // add the class "high-fixed-height"

    textBox.classList.add("high-fixed-height");

    // change the innerHTML of the button that triggered the event (so that it says "show less")

    event.target.innerHTML = "Näita vähem...";

    // else check if the text-box element has a class of "high-fixed-height"

  } else if (textBox.classList.contains("high-fixed-height")) {

    // if yes, remove this class

    textBox.classList.remove("high-fixed-height");

    // add the class "low-fixed-height"


    textBox.classList.add("low-fixed-height");
    // change the innerHTML of the button that triggered the event back to what it originally was

    event.target.innerHTML = "Loe edasi...";
  }
}


// function for redirecting to a route with a custom parameter


function redirectToCustom(event) {

  // prevent the default action to be triggered

  event.preventDefault();

  // get the id of the button that triggered the event

  var id = event.target.id;

  // there is a number at the end of this id

  var idNumber = id.slice(8);

  // check if we are currently on the English version of the website

  if (event.target.dataset.language === "en") {

    // redirect to a route with the idNumber as a custom parameter

    window.location.href = "/en/order" + idNumber;

    // elsewise we are on the Estonian website

  } else {

    // redirect to a route with the idNumber as a custom parameter

    window.location.href = "/telli" + idNumber;
  }
}


// function for changing the value of the itemCount inputs on the "telli" page


function changeItemCount(event, sign) {

  // check if the sign is specified as "plus"

  if (sign === "plus") {

    // if yes, get the id attribute of either the event target or its parent element
    // (whichever one has the the class of "link")

    var idPlus = event.target.closest(".link").id;

    // the last letter of this id is a number

    var idNumberPlus = idPlus.slice(13);

    // use this number to get the corresponding number input

    var inputPlus = document.getElementById("itemCount" + idNumberPlus);

    // get the value of this input and convert it to a number

    var currentValuePlus = Number(inputPlus.value);

    // get the corresponding price element using the obtained id number

    var priceInputPlus = document.getElementById("price" + idNumberPlus);

    // for the changePrice function, also construct an iterator, which will be the id number minus 1

    var iteratorPlus = Number(idNumberPlus - 1);

    // check if this value is smaller than 99, but equal to or greater than 0

    if (currentValuePlus < 99 && currentValuePlus >= 0) {

      // if yes, add 1 to this number

      var newValuePlus = currentValuePlus + 1;

      // change the value of the number input (also make sure it is an integer)

      inputPlus.value = parseInt(newValuePlus);

      // check if the value of the number input is smaller than 0

    } else if (currentValuePlus < 0) {

      // if yes, just change it back to 0

      inputPlus.value = 0;

      // check if the value of the number input is greater than 99

    } else if (currentValuePlus > 99) {

      // if yes, just change it back to 0

      inputPlus.value = 99;

    }

    // also change the corresponding price number accordingly

    changePrice(priceInputPlus, iteratorPlus);

    // check if the sign is specified as "minus"

  } else if (sign === "minus") {

    // if yes, get the id attribute of either the event target or its parent element
    // (whichever one has the the class of "link")

    var idMinus = event.target.closest(".link").id;

    // the last letter of this id is a number

    var idNumberMinus = idMinus.slice(14);

    // use this number to get the corresponding number input

    var inputMinus = document.getElementById("itemCount" + idNumberMinus);

    // get the value of this input and convert it to a number

    var currentValueMinus = Number(inputMinus.value);

    // get the corresponding price element using the obtained id number

    var priceInputMinus = document.getElementById("price" + idNumberMinus);

    // for the changePrice function, also construct an iterator, which will be the id number minus 1

    var iteratorMinus = Number(idNumberMinus - 1);

    // check if this value is equal to or smaller than 99, but greater than 0

    if (currentValueMinus <= 99 && currentValueMinus > 0) {

      // if yes, substact 0 from this number

      var newValueMinus = currentValueMinus - 1;

      // change the value of the number input (also make sure it is an integer)

      inputMinus.value = parseInt(newValueMinus);

      // check if the value of the number input is smaller than 0

    } else if (currentValueMinus < 0) {

      // if yes, just change it back to 0

      inputMinus.value = 0;

      // check if the value of the number input is larger than 99

    } else if (currentValueMinus > 99) {

      // if yes, just change it back to 0

      inputMinus.value = 99;
    }

    // also change the corresponding price number accordingly

    changePrice(priceInputMinus, iteratorMinus);
  }
}


// function for changing the price of an item


function changePrice(priceElement, iterator) {

  // use the iterator that was passed into the function
  // to get the corresponding number input from the itemCountArray

  var currentInput = itemCountArray[iterator];

  // check if the input entry is valid

  if (currentInput.checkValidity() === true) {

    // if yes, get the value of that input

    var currentValue = parseInt(currentInput.value);

    // the original price is written in the dataset attribute of the price element,
    // which was passed into the function as an argument

    var originalPrice = Number(priceElement.dataset.price);

    // check if the current value is greater than 0 and equal to or smaller than 99

    if (currentValue > 0 && currentValue <= 99) {

      // if yes, check if the price is currently greyed out

      if (priceElement.classList.contains("paragraph--grey")) {

        // if yes, change the color of the price element to purple

        priceElement.classList.remove("paragraph--grey");
        priceElement.classList.add("paragraph--purple");

      }

      // construct a new price by multipling the original price by the current value

      var newPrice = originalPrice * currentValue;

      // change the innerHTML of the price element to the new price

      priceElement.innerHTML = newPrice + " €";

      // check if the value of the number input is equal to 0

    } else if (currentValue == 0) {

      // if yes, check if the price is written in purple

      if (priceElement.classList.contains("paragraph--purple")) {

        // if yes, change the color of the price element to grey

        priceElement.classList.remove("paragraph--purple");
        priceElement.classList.add("paragraph--grey");
      }

      // set the innerHTML to equal the original price

      priceElement.innerHTML = originalPrice + " €";

    }
  }

  // change the innerHTML of the sum element accordingly

  calculateSum();
}



// function for calculating the sum of the prices of all the items that the client wishes to purchase on the "telli" page


function calculateSum() {

  // create an empty array which will later be populated by the prices of the items that the client wishes to buy

  var relevantPrices = [];

  // loop through all the price elements on the page

  for (let i = 0; i < priceArray.length; i++) {

    // get the current price element

    var currentPriceElement = priceArray[i];

    // check if the current price element is active (it should contain the class "paragraph--purple")

    if (currentPriceElement.classList.contains("paragraph--purple")) {

      // if yes, push the element into the array created above

      relevantPrices.push(currentPriceElement);
    }

  }

  // create another empty array, which will be populated by the actual price numbers

  var priceNumbers = [];

  // now loop through the newly populated array of relevant prices

  for (var a = 0; a < relevantPrices.length; a++) {

    // get the innerHTML of each of these elements

    var currentPriceInnerHTML = relevantPrices[a].innerHTML;

    // for the actual price, we have to eliminate the € sign at the end of the innerHTML
    // and convert the outcome into a javascript number

    var currentPrice = Number(currentPriceInnerHTML.slice(0, -1));

    // push this number into the array created above

    priceNumbers.push(currentPrice);
  }

  // create a starting sum of 0

  var total = 0;

  // loop through the priceNumbers array and add each price number to the total

  for (var b = 0; b < priceNumbers.length; b++) {

    total += priceNumbers[b];
  }

  // check if the innerHTML of the sum should be English

  if (sum.dataset.language === "en") {

    // change the innerHTML of the sum element so that it displays the total

    sum.innerHTML = "Total: " + total + " €";

    // elsewise the innerHTML of the sum is Estonian

  } else {

    // change the innerHTML of the sum element so that it displays the total

    sum.innerHTML = "Kokku: " + total + " €";
  }



  // also change the value of the corresponding hidden input so that it sends the calculated sum into the server

  hiddenSum.value = total;

  // check if the total is 0

  if (total === 0) {

    // if yes, make sure that the hidden checkbox is unchecked (so that the form would not be validated)

    hiddenCheckbox.checked = false;

  } else {

    // if not, check the hidden checkbox, so that the form can be submitted

    hiddenCheckbox.checked = true;
  }
}


// functions for creating data about client-side forms to be sent to the server


function createOrderData() {

  var data = {
    contactInfo: [],
    sum: document.getElementById("sum").innerHTML,
    items: []
  };
  for (var i = 0; i < document.querySelectorAll(".telliField").length; i++) {

    var pair = {
      key: document.querySelectorAll(".telliField")[i].getAttribute("placeholder"),
      field: document.querySelectorAll(".telliField")[i].value,
    };
    data.contactInfo.push(pair);
  }

  for (var a = 0; a < document.querySelectorAll(".itemCount").length; a++) {

    var item = {
      name: document.querySelectorAll(".itemCount")[a].dataset.heading,
      count: document.querySelectorAll(".itemCount")[a].value,
      price: document.querySelectorAll(".itemCount")[a].dataset.price,
      totalPrice: Number(document.querySelectorAll(".itemCount")[a].value) * Number(document.querySelectorAll(".itemCount")[a].dataset.price)
    };

    if (item.count != 0) {
      data.items.push(item);
    }
  }

  var itemStrings = [];

  for (var b = 0; b < data.items.length; b++) {

    var itemString = data.items[b].name + "-  kogus: " + data.items[b].count + ",  toote hind: " + data.items[b].price + " €";

    itemStrings.push(itemString);
  }

  var itemsJoined = itemStrings.join("<br>");

  var contactStrings = [];

  for (var c = 0; c < data.contactInfo.length; c++) {

    var placeholderString = data.contactInfo[c].key;
    var fieldString = data.contactInfo[c].field;

    var contactString = placeholderString + ": " + fieldString;

    contactStrings.push(contactString);
  }

  var contactJoined = contactStrings.join("<br>");

  var eMailText = '<p>Tellitud tooted: <br> <br>' + itemsJoined + '<br> <br>' + data.sum + '<br> <br> Tellija kontaktandmed: <br> <br>' + contactJoined + '</p>';

  return eMailText;
}


function createContactData() {

  var data = {
    contactInfo: [],
  };
  for (var i = 0; i < document.querySelectorAll(".vastuvottField").length; i++) {

    var pair = {
      key: document.querySelectorAll(".vastuvottField")[i].getAttribute("placeholder"),
      field: document.querySelectorAll(".vastuvottField")[i].value,
    };
    data.contactInfo.push(pair);
  }

  var contactStrings = [];

  for (var c = 0; c < data.contactInfo.length; c++) {

    var placeholderString = data.contactInfo[c].key;
    var fieldString = data.contactInfo[c].field;

    var contactString = placeholderString + ": " + fieldString;

    contactStrings.push(contactString);
  }

  var contactJoined = contactStrings.join("<br>");

  var eMailText = '<p>Registreerunu andmed: <br> <br>' + contactJoined + '</p>';

console.log(eMailText);
  return eMailText;
}



// function for posting data from the "telli" page to the server


function ajaxPostForm(event, destination, dataFunction) {

  // prevent the form from submitting

  event.preventDefault();

  // create a new XMLHttpRequest object

  var xhr = new XMLHttpRequest();

  // open an XHTTP post request

  xhr.open("POST", "/upload/" + destination, true);

  // manually set a request header, so that the server knows what type of data to expect

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  // get the data that will be sent to the server by calling a data creation function

  var data = dataFunction;

  // turn the created data into JSON

  var jsonData = JSON.stringify(data);

  console.log(jsonData);

  // check if the request is ready

  xhr.onreadystatechange = function() {

    // if everything works, create a success message

    if (this.readyState == 4 && this.status == 200) {

      window.location.href = "/edastatud";

      // if there is a problem, create a failure message

    } else if (this.status !== 200) {
      window.location.href = "/nurjunud";
    }
  };

  // send the data to the server

  xhr.send("text=" + jsonData);
}
