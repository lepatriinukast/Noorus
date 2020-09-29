/* jshint esversion: 8 */


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

  if (successPopup !== null) {
    successPopup.classList.remove("show");
    successPopup.classList.add("hide");
  }

  if (failurePopup !== null) {
    failurePopup.classList.remove("show");
    failurePopup.classList.add("hide");
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


// EXECUTION CODE- Call the above function on click, touch or keypress (not Tab)

document.addEventListener("click", listenEvents);
document.addEventListener("touchend", listenEvents);
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    listenEvents(event);
  }
});
