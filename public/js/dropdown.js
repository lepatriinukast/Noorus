/* jshint esversion: 8 */

// JS code for displaying and hiding the dropdown menus on different navigation bars.

// Toggle the dropdown menu. Export the function.

export const toggleDropdownMenu = (menuType) => {
    document.getElementById("dropdownMenu" + menuType).classList.toggle("show");
    document.getElementById("dropdownMenu" + menuType).classList.toggle("hide");
};

// Remove the dropdown menu. Export the function.

export const removeDropdownMenu = (menuType) => {
    document.getElementById("dropdownMenu" + menuType).classList.remove("show");
    document.getElementById("dropdownMenu" + menuType).classList.add("hide");
};
