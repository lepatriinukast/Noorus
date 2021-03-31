/* jshint esversion: 8 */

// This module exports a function, which runs whatever code needs to be executed when a public page is loaded.

// Import dependencies.

import {publicHandler} from "./publicHandler.js";

// Export the function.

export const onPublicLoad = () => {

  window.addEventListener("click", publicHandler);
  window.addEventListener("touchend", publicHandler);
  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      publicHandler();
    }
  });
};
