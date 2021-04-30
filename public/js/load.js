/* jshint esversion: 8 */

// This module is run whenever the app loads a page.
// The module determines the type of the loaded page by looking at its root element and calls a corresponding function.
// This function will execute all the code specific to the page type on page load.

// Import the dependencies.

import {addEditorListeners, changePreview, createDeleteMessage, removeMessage} from "./admin.js";
import {ajax} from "./ajax.js";
import {calculateSum, changeCount, changePrice, removeGreyout, validateCount} from "./order.js";
import {handler} from "./public.js";
import {checkOverflow, deleteLinkBtn, displayLinkBtn, redirectToCustom, toggleContent} from "./shop.js";

// Export the function.

export const load = (root) => {

  // Call a different function depending on the classlist of the DOM root element.

  if (root.classList.contains("public")) {
    pageTypes.public();
    if (root.classList.contains("shop")) {
      pageTypes.shop();
    } else if (root.classList.contains("order")) {
      pageTypes.order();
    }
  } else if (root.classList.contains("admin")) {
    pageTypes.admin();
  } else if (root.classList.contains("login")) {
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
    window.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        handler(event);
      }
    });

    // Listen to form submits (there is one on the contact page and one on the order page)
     // and respond with making an ajax request to the server.

    window.addEventListener("submit", ajax.submit);
  },

  // Method to be called when an admin page is loaded.

  admin() {

    // Listen to any form submit on the page and react by making an AJAX request.

    window.addEventListener("submit", ajax.put);

    // Listen to clicks, touches and keystrokes on the page and depending on event target call the appropriate function.

    window.addEventListener("click", (event) => {
      removeMessage();
      if (event.target.classList.contains("addBtn")) {
        ajax.post(event);
      } else if (event.target.classList.contains("restoreBtn")) {
        ajax.restore(event);
      } else if (event.target.classList.contains("deleteBtn")) {
        createDeleteMessage(event);
      } else if (event.target === document.getElementById("logoutBtn")) {
        ajax.logout(event);
      }
    });

    window.addEventListener("touchend", (event) => {
      removeMessage();
      if (event.target.classList.contains("addBtn")) {
        ajax.post(event);
      } else if (event.target.classList.contains("restoreBtn")) {
        ajax.restore(event);
      } else if (event.target.classList.contains("deleteBtn")) {
        createDeleteMessage(event);
      } else if (event.target === document.getElementById("logoutBtn")) {
        ajax.logout(event);
      }
    });

    window.addEventListener("keydown", () => {
      if (event.key !== "Tab") {
        removeMessage();
      }
    });

    // Add an event listener that reacts to all changes to the input elements.
    // The callback function will work only on file inputs.

    window.addEventListener("input", changePreview);

    // Call the function that adds event listeners to all quill editors.

    addEditorListeners();
  },


  // Method to be called when a login page is loaded.

  login() {

    // Listen for the submit event on the login form, and initialize the login process.

    document.getElementById("login").addEventListener("submit", ajax.login);
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
      console.log(overflow);
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
      if (event.target.classList.contains("numberBtn") || event.target.parentNode.classList.contains("numberBtn")) {
        event.preventDefault();
        changeCount(event.target);
        calculateSum();
      }
    });

    window.addEventListener("touch", (event) => {
      if (event.target.classList.contains("numberBtn") || event.target.parentNode.classList.contains("numberBtn")) {
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