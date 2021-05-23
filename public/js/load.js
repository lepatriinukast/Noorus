/* jshint esversion: 8 */

// This module is run whenever the app loads a page.
// The module determines the type of the loaded page by looking at its root element and calls a corresponding function.
// This function will execute all the code specific to the page type on page load.

// Import the dependencies.

import {
  addEditorListeners,
  adjustAdminMenu,
  changePreview,
  createDeleteMessage,
  removeMessages,
  toggleAdminMenu
} from "./admin.js";

import {
  ajax
} from "./ajax.js";

import {
  calculateSum,
  changeCount,
  changePrice,
  removeGreyout,
  validateCount
} from "./order.js";

import {
  deleteEmptyContent,
  handler
} from "./public.js";

import {
  checkOverflow,
  deleteLinkBtn,
  displayLinkBtn,
  redirectToCustom,
  toggleContent
} from "./shop.js";

// Export the function.

export const load = (body) => {

  // Call a different function depending on the classlist of the DOM root element.

  if (body.classList.contains("public")) {
    pageTypes.public();
    if (body.classList.contains("shop")) {
      pageTypes.shop();
    } else if (body.classList.contains("order")) {
      pageTypes.order();
    }
  } else if (body.classList.contains("admin")) {
    pageTypes.admin();
  } else if (body.classList.contains("login")) {
    pageTypes.login();
  }
};


// An object containing methods that are called on page load, depending on the type of page.

const pageTypes = {


  // Method to be called when a public page is loaded.

  public() {

    // Listen to clicks, touches and keystrokes, and evoke the handler.

    window.addEventListener("click", handler);
    window.addEventListener("touchend", handler);
    window.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") {
        handler(event);
      }
    });

    // Listen to form submits (there is one on the contact page and one on the order page)
    // and respond with making an ajax request to the server.

    window.addEventListener("submit", ajax.submit);

    // Call the function which removes elements without valid content from the page.

    deleteEmptyContent();
  },

  // Method to be called when an admin page is loaded.

  admin() {

    // Listen to any form submit on the page and react by making an AJAX request.

    window.addEventListener("submit", ajax.put);

    // Listen to clicks, touches and keystrokes on the page and depending on event target call the appropriate function.

    window.addEventListener("click", (event) => {
      removeMessages();
      if (event.target === document.getElementById("hamburgerButton") || event.target === document.getElementById("hamburgerButton").parentNode) {
        toggleAdminMenu();
      } else if (event.target.classList.contains("dataAddBtn")) {
        ajax.post(event);
      } else if (event.target.classList.contains("dataRestoreBtn")) {
        ajax.restore(event);
      } else if (event.target.classList.contains("dataArchiveBtn")) {
        ajax.archive(event);
      } else if (event.target.classList.contains("dataDeleteBtn")) {
        createDeleteMessage(event);
      } else if (event.target === document.getElementById("logoutBtn")) {
        ajax.logout(event);
      }
    });

    window.addEventListener("touchend", (event) => {
      removeMessages();
      if (event.target === document.getElementById("hamburgerButton") || event.target === document.getElementById("hamburgerButton").parentNode) {
        toggleAdminMenu();
      } else if (event.target.classList.contains("dataAddBtn")) {
        ajax.post(event);
      } else if (event.target.classList.contains("dataRestoreBtn")) {
        ajax.restore(event);
      } else if (event.target.classList.contains("dataArchiveBtn")) {
        ajax.archive(event);
      } else if (event.target.classList.contains("dataDeleteBtn")) {
        createDeleteMessage(event);
      } else if (event.target === document.getElementById("logoutBtn")) {
        ajax.logout(event);
      }
    });

    window.addEventListener("keydown", () => {
      if (event.key !== "Tab") {
        removeMessages();
        if (event.target === document.getElementById("hamburgerButton") || event.target === document.getElementById("hamburgerButton").parentNode) {
          toggleAdminMenu();
        }
      }
    });


    // Add an event listener that reacts to all changes to the input elements.
    // The callback depends on the input type.

    window.addEventListener("input", (event) => {

      // For image inputs, change the preview element.

      if (event.target.type === "file") {
        changePreview(event);

        // For text inputs, create an outline indicating unsaved changes.

      } else if (event.target.type !== "hidden" || event.target.type !== "file") {
        if (!event.target.classList.contains("unsaved")) {
          event.target.classList.add("unsaved");
        }
      }
    });

    // Call the function that adds event listeners to all quill editors.

    addEditorListeners();

    // Check if the the viewport size matches the media query in the css code for the navigation menu.
    // Depending on the result, adjust the visibility of the navigation menu.
    // Call the function on page load and every time the viewport changes.

    adjustAdminMenu();

    window.addEventListener("resize", adjustAdminMenu);
  },


  // Method to be called when a login page is loaded.

  login() {

    // Listen for the submit event on the login page, and initialize the login process.

    window.addEventListener("submit", ajax.login);
  },


  // Method to be called when a shop page is loaded.

  shop() {

    // Get the DOM elements necessary for the code to run.

    const textBoxArray = document.querySelectorAll(".textBox");
    const linkBtnArray = document.querySelectorAll(".linkBtn");
    const orderBtnArray = document.querySelectorAll(".orderBtn");

    // When the shop page loads, loop through the array of text box elements to check if any are overflown.

    for (let i = 0; i < textBoxArray.length; i++) {
      let overflow = checkOverflow(textBoxArray[i]);
      if (overflow) {
        displayLinkBtn(textBoxArray[i]);
      } else {
        deleteLinkBtn(textBoxArray[i]);
      }
    }

    // Do the same thing whenever the browser viewport size changes.

    window.addEventListener("resize", (event) => {
      for (let i = 0; i < textBoxArray.length; i++) {
        let overflow = checkOverflow(textBoxArray[i]);
        if (overflow) {
          displayLinkBtn(textBoxArray[i]);
        } else {
          deleteLinkBtn(textBoxArray[i]);
        }
      }
    });

    // Listen to clicks on the page and call the appropriate functions.

    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("linkBtn")) {
        toggleContent(event);
      } else if (event.target.classList.contains("orderBtn")) {
        redirectToCustom(event);
      }
    });
  },


  // Method to be called when an order page is loaded.

  order() {

    // Create an object which provides access to the query string of the current url.
    // The query string has information about which shop item should be selected.

    const params = new URLSearchParams(window.location.search);

    // Validate the query string.

    if (params.has("selected")) {

      // Get the value provided in the query string.

      const selected = params.get("selected");

      // Use this value to get the price element of the item that is selected.

      const price = document.getElementById("price" + selected);

      // Remove the greyout effect from the price display of this item.

      if (price) {
        removeGreyout(price);
      }
    }

    // Calculate and display the total cost of the selected items on page load.

    calculateSum();

    // Listen to clicks and touches on the page.
    // If the click or touch occured on one of the number buttons, change the value of the corresponding item count input.

    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("signBtn") || event.target.parentNode.classList.contains("signBtn")) {
        event.preventDefault();
        changeCount(event.target);
        calculateSum();
      }
    });

    window.addEventListener("touch", (event) => {
      if (event.target.classList.contains("signBtn") || event.target.parentNode.classList.contains("signBtn")) {
        event.preventDefault();
        changeCount(event.target);
        calculateSum();
      }
    });


    // Listen to changes on the item count inputs and call appropriate functions.

    window.addEventListener("input", (event) => {
      if (event.target.classList.contains("itemCount")) {
        validateCount(event.target);
        changePrice(event.target);
        calculateSum();
      }
    });
  }
};
