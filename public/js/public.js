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
    case document.getElementById("dropdownButtonHeader").parentNode:
      event.preventDefault();
      removeHamburgerMenu();
      toggleDropdownMenu("Header");
      removeDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
      break;
    case document.getElementById("dropdownButtonHamburger"):
    case document.getElementById("dropdownButtonHamburger").parentNode:
      event.preventDefault();
      removeDropdownMenu("Header");
      toggleDropdownMenu("Hamburger");
      removeDropdownMenu("Footer");
      break;
    case document.getElementById("dropdownButtonFooter"):
    case document.getElementById("dropdownButtonFooter").parentNode:
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

// Export a function that removes specific text elements from the page if they have no content, so that they won't take up any space.
// These elements have to exist because the admin of the webapp can decide to add some content at a later point.
// But until these elements are empty, this function will stop the browser from displaying them on page load.

export const deleteEmptyContent = () => {

  // Get arrays of the relevant DOM elements.

  const content = document.querySelectorAll(".content");
  const heading = document.querySelectorAll(".heading");
  const paragraph = document.querySelectorAll("p");

  // Loop through the arrays, check if each element has any content,
  // and if not, add the delete class to it.

  for (let i = 0; i < content.length; i++) {
    if (content[i].innerHTML.trim() === "<p><br></p>" || "") {
      content[i].classList.add("delete");
    }
  }

  for (let i = 0; i < heading.length; i++) {
    if (!heading[i].innerHTML) {
      heading[i].classList.add("delete");
    }
  }

  for (let i = 0; i < paragraph.length; i++) {
    if (!paragraph[i].innerHTML) {
      paragraph[i].classList.add("delete");
    }
  }
};
