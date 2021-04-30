/* jshint esversion: 8 */


// This module contains functions that are run on all public pages.


// NAVIGATION:


// Toggle the dropdown menu.

const toggleDropdownMenu = (menuType) => {
    document.getElementById("dropdownMenu" + menuType).classList.toggle("show");
    document.getElementById("dropdownMenu" + menuType).classList.toggle("hide");
};

// Remove the dropdown menu.

const removeDropdownMenu = (menuType) => {
    document.getElementById("dropdownMenu" + menuType).classList.remove("show");
    document.getElementById("dropdownMenu" + menuType).classList.add("hide");
};


// Display the hidden menu, when the hamburger button is clicked on smaller screens.
// Get the hidden menu from the DOM.

const hamburgerMenu = document.getElementById("hamburgerMenu");

// Toggle the hamburger menu visibility.

const toggleHamburgerMenu = () => {
    hamburgerMenu.classList.toggle("show");
    hamburgerMenu.classList.toggle("hide");
};

// Remove the dropdown menu.

const removeHamburgerMenu = () => {
    hamburgerMenu.classList.remove("show");
    hamburgerMenu.classList.add("hide");
};


// Export a handler function, which is run whenever a click, touch or keystroke occurs on a public page.
// Depending on the event target, different callback functions will be evoked.


export const handler = (event) => {

  switch (event.target) {
    case document.getElementById("hamburgerButton"):
      event.preventDefault();
      toggleHamburgerMenu();
      removeDropdownMenu("Header");
      removeDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
      break;
    case document.getElementById("dropdownButtonHeader"):
      event.preventDefault();
      removeHamburgerMenu();
      toggleDropdownMenu("Header");
      removeDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
    case document.getElementById("dropdownIconHeader"):
      event.preventDefault();
      removeHamburgerMenu();
      toggleDropdownMenu("Header");
      removeDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
      break;
    case document.getElementById("dropdownButtonHamburger"):
      event.preventDefault();
      removeDropdownMenu("Header");
      toggleDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
    case document.getElementById("dropdownIconHamburger"):
      event.preventDefault();
      removeDropdownMenu("Header");
      toggleDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
      break;
    case document.getElementById("dropdownButtonFooter"):
      event.preventDefault();
      removeHamburgerMenu();
      removeDropdownMenu("Header");
      removeDropdownMenu("Hamburger");
      toggleDropdownMenu("Footer");
    case document.getElementById("dropdownIconFooter"):
      event.preventDefault();
      removeHamburgerMenu();
      removeDropdownMenu("Header");
      removeDropdownMenu("Hamburger");
      toggleDropdownMenu("Footer");
      break;
    default:
      removeHamburgerMenu();
      removeDropdownMenu("Header");
      removeDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
  }
};
