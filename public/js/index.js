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

// EXECUTION CODE- Call the above function on click or touch

document.addEventListener("click", listenEvents);
document.addEventListener("touchend", listenEvents);

// A V A L E H T   A D M I N   C O D E

// VARIABLES for the forms that upload pictures on the admin page

var avalehtPildid = document.getElementById("avalehtPildid");
var avalehtTekstid = document.getElementById("avalehtTekstid");

// VARIABLES for the success/failure message elements to be displayed under submit buttons

var avalehtPildidMessage = document.getElementById("avalehtPildidMessage");

//VARIABLE for the text inputs as an array

var inputArray = document.querySelectorAll(".input");

// VARIABLES for image upload inputs

var paiseikoon = document.getElementById("paiseikoon");
var avalehtLogo = document.getElementById("avalehtLogo");
var avalehtTaustapilt = document.getElementById("avalehtTaustapilt");

// FUNCTIONS for displaying a message for a limited period of time when an update is made

function createSuccessMessage(location) {
  location.innerHTML = ("Muudatused salvestatud!");
  setTimeout(function() {
    location.innerHTML = ("");
  }, 2000);
}

function createFailureMessage(location) {
  location.innerHTML = ("Sassi läks! Midagi on pahasti!");
  setTimeout(function() {
    location.innerHTML = ("");
  }, 2000);
}

// FUNCTION for changing the labels and preview images under upload buttons

function changePreview(input) {
  var currentPlaceholder = document.getElementById(input.id + "Placeholder");
  var currentImg = document.getElementById(input.id + "Img");
  currentPlaceholder.innerHTML = input.files[0].name;
  currentImg.src = URL.createObjectURL(input.files[0]);
}

// FUNCTION that updates the value property of the text inputs that have been changed by the admin

function updateInputValue(event) {
  var changedInputValue = event.target.value;
  this.setAttribute("value", changedInputValue);
}

// FUNCTIONS that create javascript objects from text input values

function createAvalehtTekstidData() {
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
      est: document.getElementById("sektsiooniPealkiri1Est").value,
      en: document.getElementById("sektsiooniPealkiri1En").value
    },
    sektsiooniTekst1: {
      est: document.getElementById("sektsiooniTekst1Est").value,
      en: document.getElementById("sektsiooniTekst1En").value
    },
    sektsiooniPealkiri2: {
      est: document.getElementById("sektsiooniPealkiri2Est").value,
      en: document.getElementById("sektsiooniPealkiri2En").value
    },
    sektsiooniTekst2: {
      est: document.getElementById("sektsiooniTekst2Est").value,
      en: document.getElementById("sektsiooniTekst2En").value
    },
  };
  return avalehtTekstidData;
}

// FUNCTION for the ajax call for picture uploads on the admin_avaleht page

function avalehtPildidResponse(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var formData = new FormData(avalehtPildid);
  xhr.open('POST', '/upload/avaleht', true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      createSuccessMessage(avalehtPildidMessage);
    } else if (this.status !== 200) {
      createFailureMessage(avalehtPildidMessage);
    }
  };
  xhr.send(formData);
}

// FUNCTION for the ajax calls that update text(create js objects, turn them into JSON and send to server)

function avalehtTekstidResponse(event) {
  avalehtTekstidData = createAvalehtTekstidData();
  var avalehtTekstidJsonData = JSON.stringify(avalehtTekstidData);
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/avaleht", true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      createSuccessMessage(avalehtTekstidMessage);
    } else if (this.status !== 200) {
      createSuccessMessage(avalehtTekstidMessage);
    }
  };
  xhr.send("data=" + avalehtTekstidJsonData);
}

// EXECUTION CODE- listen for changes to each input in the array and react by calling the above function

if (inputArray !== null) {
  for (var i = 0; i < inputArray.length; i++) {
    inputArray[i].addEventListener("input", updateInputValue);
  }
}

// EXECUTION CODE for changing the labels and preview images under upload buttons

if (paiseikoon !== null) {
  paiseikoon.addEventListener("input", function(event) {
    changePreview(paiseikoon);
  });
}
if (avalehtLogo !== null) {
  avalehtLogo.addEventListener("input", function(event) {
    changePreview(avalehtLogo);
  });
}
if (avalehtTaustapilt !== null) {
  avalehtTaustapilt.addEventListener("input", function(event) {
    changePreview(avalehtTaustapilt);
  });
}

// EXECUTION CODE- calls the relevant functions when the submit button is clicked

if (avalehtPildid !== null) {
  avalehtPildid.addEventListener("submit", avalehtPildidResponse);
}

if (avalehtTekstid !== null) {
  avalehtTekstid.addEventListener("submit", avalehtTekstidResponse);
}
