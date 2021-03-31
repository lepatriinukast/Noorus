/* jshint esversion: 8 */

// This module contains a handler function which is run whenever a click, touch or keystroke happens on a public page.
// Depending on the event target, custom callback functions will be called.

// Import the callback functions to the module.

import {toggleHamburgerMenu, removeHamburgerMenu} from "./hamburgerMenu.js";
import {toggleDropdownMenu, removeDropdownMenu} from "./dropdown.js";

// Export the handler function.

export const publicHandler = (event) => {

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
