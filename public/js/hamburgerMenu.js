 /* jshint esversion: 8 */

// JS code for displaying and hiding the dropdown menu when the hamburger button is clicked on smaller screens.

// Get the hidden menu from the DOM.

var hamburgerMenu = document.getElementById("hamburgerMenu");

// Toggle the hamburger menu visibility. Export the function.

export function toggleHamburgerMenu() {
    hamburgerMenu.classList.toggle("show");
    hamburgerMenu.classList.toggle("hide");
}

// Remove the dropdown menu. Export the function.

export function removeHamburgerMenu() {
    hamburgerMenu.classList.remove("show");
    hamburgerMenu.classList.add("hide");
}
