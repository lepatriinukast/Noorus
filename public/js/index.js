// U S E R   C O D E

// VARIABLES for the hamburger button and hidden menu (for smaller screens)

var menuButton = document.getElementById("menu-button");
var hiddenMenu = document.getElementById("hidden-menu");

// FUNCTION that makes hidden menu visible

function toggleHiddenMenu() {
  if (hiddenMenu !== null) {
    hiddenMenu.classList.toggle("show");
    hiddenMenu.classList.toggle("hide");
  }
}

function removeHiddenMenu() {
  if (hiddenMenu !== null) {
    hiddenMenu.classList.remove("show");
    hiddenMenu.classList.add("hide");
  }
}

// VARIABLES for the popup

var popup = document.getElementById("popup");
var popupForm = document.getElementById("popup-form");
var popupButton = document.getElementById("popup-button");

// FUNCTION to prevent scrolling on popup

function noScroll() {
  if (popup !== null) {
    if (popup.classList.contains("show")) {
      window.scrollTo(0, 0);
    }
  }
}

// FUNCTIONS for toggling the popup

function addPopup() {
  if (popup !== null) {
    popup.classList.add("show");
    popup.classList.remove("hide");
  }
}

function removePopup() {
  if (popup !== null) {
    popup.classList.remove("show");
    popup.classList.add("hide");
  }
}

// VARIABLES for the dropdown buttons and menus

var dropdownButtonHeader = document.getElementById("dropdown-button-header");
var dropdownButtonHidden = document.getElementById("dropdown-button-hidden");
var dropdownButtonFooter = document.getElementById("dropdown-button-footer");
var dropdownIconHeader = document.getElementById("dropdown-icon-header");
var dropdownIconHidden = document.getElementById("dropdown-icon-hidden");
var dropdownIconFooter = document.getElementById("dropdown-icon-footer");
var dropdownMenuHeader = document.getElementById("dropdown-menu-header");
var dropdownMenuHidden = document.getElementById("dropdown-menu-hidden");
var dropdownMenuFooter = document.getElementById("dropdown-menu-footer");

// FUNCTIONS that make dropdown menus visible

function toggleDropdownMenuHeader() {
  if (dropdownMenuHeader !== null) {
    dropdownMenuHeader.classList.toggle("show");
    dropdownMenuHeader.classList.toggle("hide");
  }
}

function removeDropdownMenuHeader() {
  if (dropdownMenuHeader !== null) {
    dropdownMenuHeader.classList.remove("show");
    dropdownMenuHeader.classList.add("hide");
  }
}

function toggleDropdownMenuHidden() {
  if (dropdownMenuHidden !== null) {
    dropdownMenuHidden.classList.toggle("show");
    dropdownMenuHidden.classList.toggle("hide");
    dropdownButtonHidden.classList.toggle("rotate");
  }
}

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

function removeDropdownMenuFooter() {
  if (dropdownMenuFooter !== null) {
    dropdownMenuFooter.classList.remove("show");
    dropdownMenuFooter.classList.add("hide");
  }
}

// EXECUTION CODE- Prevents scrolling on popup

window.addEventListener("scroll", noScroll);

// FUNCTION that activates some of the above functions depending on what was clicked and closes all hidden menus and popups if the click target is not relevant

function listenEvents(event) {

  if (hiddenMenu !== null) {

    if (popup !== null && popup.classList.contains("show")) {
      if (event.target.parentNode !== popupForm && event.target !== popupForm || event.target === popupButton) {
        removePopup();
      }
    } else {
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
}

// EXECUTION CODE- Call the above function on click, touch or keypress (not Tab)

document.addEventListener("click", listenEvents);
document.addEventListener("touchend", listenEvents);
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    listenEvents(event);
  }
});

// A D M I N   C O D E

// GET ALL THE RELEVANT DOM ELEMENTS

// forms

var avalehtPildid = document.getElementById("avalehtPildid");
var avalehtTekstid = document.getElementById("avalehtTekstid");
var kooristSissejuhatus = document.getElementById("kooristSissejuhatus");
var kooristLiikmed = document.getElementById("kooristLiikmed");
var kooristDirigendid = document.getElementById("kooristDirigendid");

// subforms

var dirigendidSubformArray = Array.from(document.querySelectorAll(".dirigendid-subform"));

// image upload inputs

var paiseikoon = document.getElementById("paiseikoon");
var avalehtLogo = document.getElementById("avalehtLogo");
var avalehtTaustapilt = document.getElementById("avalehtTaustapilt");
var avapilt = document.getElementById("avapilt");

// arrays of image upload inputs

var portreeArray = Array.from(document.querySelectorAll(".portree"));

// message popups on the admin pages

var deletePopup = document.getElementById("deletePopup");
var successPopup = document.getElementById("successPopup");
var failurePopup = document.getElementById("failurePopup");

// buttons on the popups

var deleteYesBtn = document.getElementById("deleteYesBtn");
var deleteNoBtn = document.getElementById("deleteNoBtn");
var successBtn = document.getElementById("successBtn");
var failureBtn = document.getElementById("failureBtn");

// add "loik" buttons

var sissejuhatusLoikAddBtn = document.getElementById("sissejuhatusLoikAddBtn");
var liikmedLoikAddBtn = document.getElementById("liikmedLoikAddBtn");

// arrays of add buttons

var dirigendidLoikAddBtnArray = Array.from(document.querySelectorAll(".dirigendidLoik-add-btn"));

// add subform buttons

var dirigendidAddBtn = document.getElementById("dirigendidAddBtn");

// get delete "loik" buttons as an array

var sissejuhatusLoikDeleteBtnArray = Array.from(document.querySelectorAll(".sissejuhatusLoik-delete-btn"));
var liikmedLoikDeleteBtnArray = Array.from(document.querySelectorAll(".liikmedLoik-delete-btn"));

// get delete "loik" button arrays as an array

var dirigendidLoikDeleteBtnArrays = [];

for (var i = 0; i < dirigendidSubformArray.length; i++) {
  var indexNumber = i + 1;
  var dirigendidLoikDeleteBtnArray = Array.from(document.querySelectorAll("dirigendid" + indexNumber + "LoikDeleteBtn"));
  dirigendidLoikDeleteBtnArrays.push(dirigendidLoikDeleteBtnArray);
}

// get delete subform buttons as an array

var dirigendidDeleteBtnArray = Array.from(document.querySelectorAll(".dirigendid-delete-btn"));



// UTILITY FUNCTIONS




// function for getting the last element of an array

function getLastElement(array) {
  var lastElement = array[array.length - 1];
  return lastElement;
}





// DISPLAY A MESSAGE WHEN AN UPDATE IS SUBMITTED ON AN ADMIN PAGE



// success

function createSuccessMessage() {
  successPopup.classList.remove("hide");
  successPopup.classList.add("show");
  successBtn.focus();
}


// failure

function createFailureMessage() {
  failurePopup.classList.remove("hide");
  failurePopup.classList.add("show");
  failureBtn.focus();
}


// are you sure you want to delete this?

function createDeleteMessage(previousEvent, destination) {
  deletePopup.classList.remove("hide");
  deletePopup.classList.add("show");
  deleteNoBtn.focus();

  // register the parent subform of the event target

  var parent = getParent(previousEvent);

  // add an event listener to the "Yes" button on the delete popup and pass in the parent subform as an argument

  deleteYesBtn.addEventListener("click", function(event) {
    commenceDelete(event, parent, destination);
  });
}

function getParent(event) {
  var parent = event.target.parentNode;
  return parent;
}

// function for removing a popup message

function removeMessage(popupType) {
  popupType.classList.remove("show");
  popupType.classList.add("hide");
}



// listen for clicks and keypresses and display or remove messages accordingly

if (successBtn !== null) {
  successBtn.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      removeMessage(successPopup);
    }
  });
  successBtn.addEventListener("click", function(event) {
    removeMessage(successPopup);
  });
}

if (failureBtn !== null) {
  failureBtn.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      removeMessage(failurePopup);
    }
  });
  failureBtn.addEventListener("click", function(event) {
    removeMessage(failurePopup);
  });
}

if (deleteNoBtn !== null) {
  deleteNoBtn.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      removeMessage(deletePopup);
    }
  });
  deleteNoBtn.addEventListener("click", function(event) {
    removeMessage(deletePopup);
  });
}




// CHANGE THE LABELS AND PREVIEWS UNDER PICTURE UPLOAD BUTTONS




// create an array of single image inputs on all the admin pages

var images = [paiseikoon, avalehtLogo, avalehtTaustapilt, avapilt];

// change the labels and picture samples

function changePreview(imgInput) {

  // check if the relevant image upload input exists on the page

  if (imgInput !== null) {

    // listen for clicks on the choose file button

    imgInput.addEventListener("input", function() {

      // get the current label

      var currentPlaceholder = document.getElementById(imgInput.id + "Placeholder");

      // get the current preview image

      var currentImg = document.getElementById(imgInput.id + "Img");

      // change the label and preview image if a new file has been selected for upload

      currentPlaceholder.innerHTML = imgInput.files[0].name;
      currentImg.src = URL.createObjectURL(imgInput.files[0]);
    });
  }
}

// loop through the array and call the changePreview function once for each input in the array

for (var i = 0; i < images.length; i++) {
  changePreview(images[i]);
}

// for images in an array, call the function in separate for loops

for (var i = 0; i < portreeArray.length; i++) {
  changePreview(portreeArray[i]);
}




// REGISTER TEXT UPDATES ON ALL THE ADMIN PAGES




//get all the relevant text inputs on the page as an array

var inputArray = document.querySelectorAll(".input");

// check if there are any relevant inputs on the page

if (inputArray !== null) {

  // loop through all the inputs and have them listen to value updates

  for (var i = 0; i < inputArray.length; i++) {
    inputArray[i].addEventListener("input", updateInputValue);
  }
}

// manually update the value property of the text inputs that have been changed by the admin

function updateInputValue(event) {
  var changedInputValue = event.target.value;
  this.setAttribute("value", changedInputValue);
}




// FUNCTIONS FOR GETTING NECESSARY DATA FOR DELETING ELEMENTS FROM THE PAGE ASYNCHRONOUSLY




// function for getting relevant DOM element arrays using the name of the subform

function getArrays(elementName) {

  // construct an object out of the arrays

  var arrays = {
    array: Array.from(document.querySelectorAll("." + elementName)),
    arrayEst: Array.from(document.querySelectorAll("." + elementName + "-input-est")),
    arrayEn: Array.from(document.querySelectorAll("." + elementName + "-input-en")),
    arrayHeading: Array.from(document.querySelectorAll("." + elementName + "-heading")),
    arrayDeleteBtn: Array.from(document.querySelectorAll("." + elementName + "-delete-btn")),
  };

  // return the arrays object

  return arrays;
}

// function for getting the relevant DOM arrays specifically for the "dirigendid" subforms

function getDirigendidSubform() {

  // construct an object out of the elements on the "dirigendid" subform

  var arraysDirigendidSubform = {
    array: Array.from(document.querySelectorAll(".dirigendid-subform")),
    arrayPortree: Array.from(document.querySelectorAll(".portree")),
    arrayNimi: Array.from(document.querySelectorAll(".dirigendidNimi")),
    arrayLoikForm: Array.from(document.querySelectorAll(".dirigendidLoik-form")),
  };

  // return the object

  return arraysDirigendidSubform;
}


// function for getting the names of the relevant DOM element arrays

function getArrayNames(elementName) {

  // construct an object out of the retrieved array names

  var arrayNames = {
    arrayName: elementName,
    arrayNameEst: elementName + "Est",
    arrayNameEn: elementName + "En",
    arrayNameHeading: elementName + "Heading",
    arrayNameDeleteBtn: elementName + "DeleteBtn"
  };

  // return the arrayNames object

  return arrayNames;
}



// function for getting the index of the deleted element in the array

function getArrayIndex(element, elementName) {

  // get the arrays object

  var arrays = getArrays(elementName);

  // get the index of the deleted element in its array

  var arrayIndex = arrays.array.indexOf(element);

  // return the retrieved index

  return arrayIndex;
}




// FUNCTIONS FOR GETTING NECESSARY DATA FOR ADDING ELEMENTS TO THE PAGE ASYNCHRONOUSLY




// function for getting the relevant arrays from the ajax response text using the selector name

function getDocArrays(doc, selectorName) {

  // construct an object from the retrieved arrays

  var docArrays = {
    docArray: doc.querySelectorAll("." + selectorName),
    docEstArray: doc.querySelectorAll("." + selectorName + "-input-est"),
    docEnArray: doc.querySelectorAll("." + selectorName + "-input-en"),
    docHeadingArray: doc.querySelectorAll("." + selectorName + "-heading"),
    docDeleteBtnArray: doc.querySelectorAll("." + selectorName + "-delete-btn")
  };

  // return the docArrays object

  return docArrays;
}

// function for getting the relevant arrays from the ajax response text for specifically the "dirigendid" subforms

function getDocDirigendidSubform() {

  // construct an object of the retrieved arrays

  var docDirigendidSubform = {
    docArray: document.querySelectorAll(".dirigendid-subform"),
    docPortreeArray: document.querySelectorAll(".portree"),
    docNimiArray: document.querySelectorAll(".dirigendidNimi"),
    docLoikFormArray: document.querySelectorAll(".dirigendidLoik-form")
  };

  // return the object

  return docDirigendidSubform;
}



// function for getting elements from each array which will be added to the page

function getDocElements(doc, selectorName) {

  // retrieve the arrays from the ajax response text

  var docArrays = getDocArrays(doc, selectorName);

  // get the last elements from each of these arrays, which will be the ones added to the page, and construct an object out of them

  var docElements = {
    docElement: getLastElement(docArrays.docArray),
    docEstElement: getLastElement(docArrays.docEstArray),
    docEnElement: getLastElement(docArrays.docEnArray),
    docHeadingElement: getLastElement(docArrays.docHeadingArray),
    docDeleteBtnElement: getLastElement(docArrays.docDeleteBtnArray)
  };

  // return the docElements object

  return docElements;
}


// get the last elements from each of the arrays related to the "dirigendid" subform (the ones, which will be added to the page)

function getDocDirigendidSubformElements() {

  var docDirigendidSubform = getDocDirigendidSubform();

  var docDirigendidSubformElements = {
    docElement: getLastElement(docDirigendidSubform.docArray),
    docPortreeElement: getLastElement(docDirigendidSubform.docPortreeArray),
    docNimiElement: getLastElement(docDirigendidSubform.docNimiArray),
    docLoikFormElement: getLastElement(docDirigendidSubform.docLoikFormArray)
  };

  return docDirigendidSubformElements;
}



// FUNCTIONS FOR ADDING AND DELETING DOM ELEMENTS ASYNCHRONOUSLY




// function for deleting elements from the page and database

function commenceDelete(event, target, destination) {

  // remove the popup from the screen

  removeMessage(deletePopup);

  // get the attributes of the element about to be deleted

  var elementData = getElementData(target);

  // delete the element from the page

  deleteElement(target, elementData);

  // call an ajax request to delete relevant data from the database

  ajaxBodyParser(event, new BodyParserParam(function() {
    return createDeleteData(target);
  }, destination + "/delete", "delete"));
}


// delete a dom element from the page

function deleteElement(element, elementData) {
  element.parentNode.removeChild(element);

  // update the node lists, which are affected by the element deletion

  updateArrays(element, elementData);
}



// function for updating the arrays affected by the deletion of an element

function updateArrays(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.arrays.array.splice(elementData.arrayIndex, 1);
  elementData.arrays.arrayEst.splice(elementData.arrayIndex, 1);
  elementData.arrays.arrayEn.splice(elementData.arrayIndex, 1);
  elementData.arrays.arrayHeading.splice(elementData.arrayIndex, 1);
  elementData.arrays.arrayDeleteBtn.splice(elementData.arrayIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updateProperties(elementData);
}


// function for updating the properties of the DOM elements inside altered node lists

function updateProperties(elementData) {

  for (var i = 0; i < elementData.arrays.array.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    elementData.arrays.array[i].setAttribute("id", elementData.arrayNames.arrayName + idNumber);
    elementData.arrays.arrayEst[i].setAttribute("id", elementData.arrayNames.arrayNameEst + idNumber);
    elementData.arrays.arrayEn[i].setAttribute("id", elementData.arrayNames.arrayNameEn + idNumber);
    elementData.arrays.arrayDeleteBtn[i].setAttribute("id", elementData.arrayNames.arrayNameDeleteBtn + idNumber);
    elementData.arrays.array[i].setAttribute("name", elementData.arrayNames.arrayName + idNumber);
    elementData.arrays.arrayEst[i].setAttribute("name", elementData.arrayNames.arrayNameEst + idNumber);
    elementData.arrays.arrayEn[i].setAttribute("name", elementData.arrayNames.arrayNameEn + idNumber);
    elementData.arrays.arrayDeleteBtn[i].setAttribute("name", elementData.arrayNames.arrayNameDeleteBtn + idNumber);
    elementData.arrays.arrayHeading[i].innerHTML = elementData.headingName + " " + idNumber;
  }
}



// function for dynamically retrieving all the node lists that are affected by element deletion

function getElementData(element) {

  // get the classlist of the provided element

  var classList = element.classList;

  // the last selector in the classlist is also the name of the relevant subform

  var selectorName = getLastElement(classList);

  // using the selector and data retrieving functions, construct an elementData object that contains all the infomation about relevant arrays

  var elementData = {
    arrays: getArrays(selectorName),
    arrayNames: getArrayNames(selectorName),
    arrayIndex: getArrayIndex(element, selectorName),
    headingName: element.dataset.heading
  };

  // return the elementData Object

  return elementData;

}



// add an element

function addElement(event, doc, destination, subform) {

  if (subform === "dirigendid") {

    var dirigendidSubform = getDirigendidSubform();

    var docDirigendidSubform = getDocDirigendidSubform();

    var docDirigendidSubformElements = getDocDirigendidSubformElements();

    pushDirigendidSubform(dirigendidSubform, docDirigendidSubformElements);


    var form = document.getElementById("dirigendid-form");

    appendElement(form, docDirigendidSubformElements);

  } else {

    // use the event target id to get the selector name that will be used to retrieve necessary element arrays

    var selectorName = event.target.id.slice(0, -6);

    // get the relevant DOM arrays from the actual page, using the retrieved selector

    var arrays = getArrays(selectorName);

    // get the same arrays from the ajax text response

    var docArrays = getDocArrays(doc, selectorName);

    // get the last element of each of those arrays retrieved from the ajax text response (which will be the ones added to the actual page)

    var docElements = getDocElements(doc, selectorName);

    // push the new elements to the the arrays on the actual page

    var newArrays = pushArrays(arrays, docElements);

    // get the container form from its selector name

    var form = document.getElementById(selectorName + "-form");

    // display the new subform with all the new elements on the page

    appendElement(form, docElements);

    // add event listeners to all of the delete buttons, including those, that were just added

    addNewListeners(newArrays, destination);
  }
}


// add event listeners to the newly created delete buttons


function addNewListeners(arrays, destination) {
  if (arrays.arrayDeleteBtn.length !== 0) {
    for (var i = 0; i < arrays.arrayDeleteBtn.length; i++) {
      arrays.arrayDeleteBtn[i].addEventListener("click", function(event) {
        createDeleteMessage(event, destination);
      });
    }
  }
}


// function for pushing the asynchronously added elements to the arrays on the actual page

function pushArrays(arrays, elements) {

  arrays.array.push(elements.docElement);
  arrays.arrayEst.push(elements.docEstElement);
  arrays.arrayEn.push(elements.docEnElement);
  arrays.arrayHeading.push(elements.docHeadingElement);
  arrays.arrayDeleteBtn.push(elements.docDeleteBtnElement);

  return arrays;
}

// function for pushing the asynchronously added arrays on the "dirigendid" subform to the arrays on the actual page

function pushDirigendidSubform(arrays, elements) {

  arrays.array.push(elements.docElement);
  arrays.arrayPortree.push(elements.docPortreeArray);
  arrays.arrayNimi.push(elements.docNimiArray);
  arrays.arrayLoikForm.push(elements.docLoikFormArray);

  return arrays;
}


// function for appending the added element to the actual page

function appendElement(form, docElements) {

  // append the new element to the form

  form.append(docElements.docElement);
}




// DATA CREATION FUNCTIONS FOR AJAX POST CALLS THAT ARE HANDLED BY BODY-PARSER




function createAvalehtTekstidData(event) {
  if (avalehtTekstid !== null) {
    var avalehtTekstidData = {
      suurPealkiri: {
        est: document.getElementById("suurPealkiriEst").value,
        en: document.getElementById("suurPealkiriEn").value
      },
      jatkuPealkiri: {
        est: document.getElementById("jatkuPealkiriEst").value,
        en: document.getElementById("jatkuPealkiriEn").value
      },
      sektsiooniPealkiri1: {
        est: document.getElementById("sektsiooniPealkiriEst1").value,
        en: document.getElementById("sektsiooniPealkiriEn1").value
      },
      sektsiooniTekst1: {
        est: document.getElementById("sektsiooniTekstEst1").value,
        en: document.getElementById("sektsiooniTekstEn1").value
      },
      sektsiooniPealkiri2: {
        est: document.getElementById("sektsiooniPealkiriEst2").value,
        en: document.getElementById("sektsiooniPealkiriEn2").value
      },
      sektsiooniTekst2: {
        est: document.getElementById("sektsiooniTekstEst2").value,
        en: document.getElementById("sektsiooniTekstEn2").value
      },
    };
    return avalehtTekstidData;
  }
}

function createKooristPealkirjadData(event) {
  if (kooristPealkirjad !== null) {
    var pealkirjadData = [];
    for (var i = 0; i < 6; i++) {
      indexNumber = i + 1;
      var pealkiri = {
        est: document.getElementById("pealkiriEst" + indexNumber).value,
        en: document.getElementById("pealkiriEn" + indexNumber).value,
      };
      pealkirjadData.push(pealkiri);
    }
    return pealkirjadData;
  }
}

function createKooristLiikmedData(event) {
  if (kooristLiikmed !== null) {
    var liikmedData = {
      haaleruhmaNimed: [],
      haaleruhmaTutvustused: [],
      lauljadPealkiri: {
        est: document.getElementById("lauljadPealkiriEst").value,
        en: document.getElementById("lauljadPealkiriEn").value
      },
      sopranid: document.getElementById("sopranid").value,
      aldid: document.getElementById("aldid").value,
      tenorid: document.getElementById("tenorid").value,
      bassid: document.getElementById("bassid").value,
      vilistlastePealkiri: {
        est: document.getElementById("vilistlastePealkiriEst").value,
        en: document.getElementById("vilistlastePealkiriEn").value
      },
      vilistlasteNimekiri: {
        est: document.getElementById("vilistlasteNimekiriEst").value,
        en: document.getElementById("vilistlasteNimekiriEn").value
      },
      loigud: []
    };

    for (var i = 1; i < 5; i++) {
      var haaleruhmaNimi = {
        est: document.getElementById("haaleruhmaNimiEst" + i).value,
        en: document.getElementById("haaleruhmaNimiEn" + i).value
      };
      var haaleruhmaTutvustus = {
        est: document.getElementById("haaleruhmaTutvustusEst" + i).value,
        en: document.getElementById("haaleruhmaTutvustusEn" + i).value
      };
      liikmedData.haaleruhmaNimed.push(haaleruhmaNimi);
      liikmedData.haaleruhmaTutvustused.push(haaleruhmaTutvustus);
    }

    for (var a = 0; a < document.querySelectorAll(".liikmedLoik").length; a++) {
      var loik = {
        est: document.querySelectorAll(".liikmedLoik-input-est")[a].value,
        en: document.querySelectorAll(".liikmedLoik-input-en")[a].value,
      };
      liikmedData.loigud.push(loik);
    }
    return liikmedData;
  }
}


// function that creates nothing relevant (used for ajax post requests that have no data to send)

function createNonData() {
  return "Not data";
}

// function that creates the data necessary for deleting elements

function createDeleteData(target) {

  // get the classlist of the deleted element

  var classList = target.classList;

  // get the last name in the classlist, which is also the name of the subform

  var lastElement = getLastElement(classList);

  // get the length of the subform's name in characters

  var nameLength = lastElement.length;

  // create the "deleteData" object for sending to the server,
  // where the formName propery comes from the elements classlist and the idNumber is the number retrieved from the end of the element's id

  var deleteData = {
    formName: lastElement,
    idNumber: target.id.slice(nameLength)
  };
  return deleteData;
}





// ADD EVENT LISTENERS TO RELEVANT DOM ELEMENTS, WHICH WILL CALL AJAX REQUESTS




// on forms

if (avalehtPildid !== null) {
  avalehtPildid.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(avalehtPildid, "avaleht/pildid"));
  });
}

if (avalehtTekstid !== null) {
  avalehtTekstid.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createAvalehtTekstidData, "avaleht/tekstid", "update"));
  });
}

if (kooristPealkirjad !== null) {
  kooristPealkirjad.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createKooristPealkirjadData, "pealkirjad", "update"));
  });
}

if (kooristSissejuhatus !== null) {
  kooristSissejuhatus.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(kooristSissejuhatus, "sissejuhatus"));
  });
}

if (kooristLiikmed !== null) {
  kooristLiikmed.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createKooristLiikmedData, "liikmed", "update"));
  });
}

if (kooristDirigendid !== null) {
  kooristDirigendid.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(kooristDirigendid, "dirigendid"));
  });
}



// on add "loik" buttons

if (sissejuhatusLoikAddBtn !== null) {
  sissejuhatusLoikAddBtn.addEventListener("click", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "sissejuhatus/new", "create", "koorist"));
  });
}

if (liikmedLoikAddBtn !== null) {
  liikmedLoikAddBtn.addEventListener("click", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "liikmed/new", "create", "koorist"));
  });
}

// on add "loik" buttons that are inside arrays

if (dirigendidLoikAddBtnArray.length !== 0) {
  for (var i = 0; i < dirigendidLoikAddBtnArray.length; i++) {
    dirigendidLoikAddBtnArray[i].addEventListener("click", function(event) {
      var idNumber = event.target.id.slice(10, -10);
      ajaxBodyParser(event, new BodyParserParam(createNonData, "dirigendid" + idNumber + "/new", "create", "koorist"));
    });
  }
}

// on add subform buttons

if (dirigendidAddBtn !== null) {
  dirigendidAddBtn.addEventListener("click", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "dirigendid/new", "create", "koorist", "dirigendid"));
  });
}



// function for looping through all the delete buttons and summoning a popup if any of these are clicked

function addDeleteBtnListeners() {

  // delete a "loik" element

  if (sissejuhatusLoikDeleteBtnArray.length !== 0) {
    for (var i = 0; i < sissejuhatusLoikDeleteBtnArray.length; i++) {
      sissejuhatusLoikDeleteBtnArray[i].addEventListener("click", function(event) {
        createDeleteMessage(event, "sissejuhatus");
      });
    }
    if (liikmedLoikDeleteBtnArray.length !== 0) {
      for (var a = 0; a < liikmedLoikDeleteBtnArray.length; a++) {
        liikmedLoikDeleteBtnArray[a].addEventListener("click", function(event) {
          createDeleteMessage(event, "liikmed");
        });
      }
    }

    // delete a "loik" element from a dynamically created subform

    if (dirigendidLoikDeleteBtnArrays.length !== 0) {
      for (var b = 0; b < dirigendidLoikDeleteBtnArrays.length; b++) {
        var indexNumber = b + 1;
        for (var z = 0; z < dirigendidLoikDeleteBtnArrays[b].length; z++) {
          dirigendidLoikDeleteBtnArrays[b][z].addEventListener("click", function(event) {
            createDeleteMessage(event, "dirigendid" + indexNumber);
          });
        }
      }
    }
  }

  // delete a subform

  if (dirigendidDeleteBtnArray.length !== 0) {
    for (var c = 0; c < dirigendidDeleteBtnArray.length; c++) {
      dirigendidDeleteBtnArray[c].addEventListener("click", function(event) {
        createDeleteMessage(event, "dirigendid");
      });
    }
  }
}


// call the above function on page load


addDeleteBtnListeners();



// CREATE AJAX CALL PARAMETERS WITH A CONSTRUCTOR FUNCTION



// for multer

function MulterParam(formName, destination) {
  this.formName = formName;
  this.destination = destination;
}

// for body-parser

function BodyParserParam(functionName, postDestination, type, getDestination, subform) {
  this.functionName = functionName;
  this.postDestination = postDestination;
  this.type = type;
  this.getDestination = getDestination;
  this.subform = subform;
}




// AJAX GET REQUESTS




function ajaxGetNew(event, location, destination, subform) {

  // create a new XMLHttpRequest

  var xhr = new XMLHttpRequest();

  // open the request and specify its method (GET), the destination of the request and whether the call is asynchronous (true)

  xhr.open('GET', location, true);

  // check if the request is ready

  xhr.onreadystatechange = function() {

    // check if everything works

    if (this.readyState == 4 && this.status == 200) {

      // if yes, store the response string (that contains the request destination HTML) into a variable

      var responseText = this.responseText;

      // setup a string parser

      var parser = new DOMParser();

      // use the parser to create a DOM tree from the response string

      var doc = parser.parseFromString(responseText, "text/html");

      // call a function that takes the response text as an argument, identifies the added element and displays it on the page

      addElement(event, doc, destination, subform);

      // if something is wrong, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the ajax get request

  xhr.send();
}




// AJAX POST CALLS HANDLED BY MULTER




// create an ajax request for uploading pictures and text with multer (function takes an object with two params as an input)

function ajaxMulter(event, params) {

  // prevent default action (form submitting in a regular manner)

  event.preventDefault();

  // instead create a new XMLHttpRequest object for transferring data to the server

  var xhr = new XMLHttpRequest();

  // create a new formData object, which will send the relevant form to the server

  var formData = new FormData(params.formName);

  // open the XMLHttpRequest and specify the method (POST), destination route on the server, and whether the call takes place asynchronously (true);

  xhr.open('POST', '/upload/' + params.destination, true);

  // check if the request is ready

  xhr.onreadystatechange = function() {

    // if everything works, create a success message
    if (this.readyState == 4 && this.status == 200) {
      createSuccessMessage();

      // if not, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the data to the server

  xhr.send(formData);
}




// AJAX POST CALLS HANDLED BY BODY-PARSER




// create an ajax request for updating, adding and deleting text, which will be handled by body-parser, (function takes the event and an object with three params as an input)

function ajaxBodyParser(event, params) {

  // prevent the regular event from happening

  event.preventDefault();

  // instead create a new XMLHttpRequest

  var xhr = new XMLHttpRequest();

  // specify a function that creates the data to be sent to the server

  var data = params.functionName(event);

  // turn the created data into JSON

  var jsonData = JSON.stringify(data);

  // open the XMLHttpRequest and specify the method (POST), destination route on the server ("/upload/" + postDestination), and whether the call takes place asynchronously (true);

  xhr.open("POST", "/upload/" + params.postDestination, true);

  // manually set a request header, so that the server knows what type of data to expect

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  // check if the request is ready

  xhr.onreadystatechange = function() {


    // if everything works, check the action type

    if (this.readyState == 4 && this.status == 200) {

      // if the action type is "create", initialize an ajax get request to add a new DOM element to the page

      if (params.type === "create") {

        // specify the location of the get request (will be "/admin/" + a specified parameter)

        var getDestination = "/admin/" + params.getDestination;

        // specify the location of the potential future post requests that can be made by the currently added element

        var postDestination = params.postDestination.slice(0, -4);

        // specify if the created element is a subform or not

        var subform = params.subform;

        // make the get request

        ajaxGetNew(event, getDestination, postDestination, subform);

        // if the action type is "update", create a success message

      } else if (params.type === "update") {
        createSuccessMessage();

        // if there is something wrong with the action type, create a failure message, if the action type is "delete", do nothing

      } else if (params.type !== "delete") {
        createFailureMessage();
      }

      // if there is another problem, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the data to the server

  xhr.send("data=" + jsonData);
}
