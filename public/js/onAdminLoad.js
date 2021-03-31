/* jshint esversion: 8 */

// This module exports a function, which runs whatever code needs to be executed when an admin page is loaded.

// Import dependencies.

import {ajaxHandler} from "./ajaxHandler.js";
import {changePreview} from "./changePreview.js";
import {updateInputValue} from "./updateInputValue.js";
import {removeMessage} from "./adminMessages.js";

// Export the function.

export const onAdminLoad = () => {

  // Listen to any form submit on the page and react by making an AJAX request.

  window.addEventListener("submit", ajaxHandler);

  // Listen to clicks, touches and keystrokes on the page and react by getting rid of any displayed popups.

  window.addEventListener("click", removeMessage);
  window.addEventListener("touchend", removeMessage);
  window.addEventListener("keydown", () => {
    if (event.key !== "Tab") {
      removeMessage();
    }
  });

  // Add an event listener that reacts to all changes to the input elements.
  // The callback function will work only on file inputs.

  window.addEventListener("input", changePreview);

  // Loop through an array of quill container elements and start listening for changes in their DOM subtrees.
  // When a change occurs, update the value of the corresponding hidden input.

    for (let i = 0; i < document.querySelectorAll(".editor").length; i++) {
      document.querySelectorAll(".editor")[i].addEventListener("DOMSubtreeModified", updateInputValue);
    }
};
