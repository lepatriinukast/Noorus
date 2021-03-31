/* jshint esversion: 8 */

// This module is run whenever the app loads a page.
// The module determines the type of the loaded page by looking at its root element and calls a corresponding function.
// This function will execute all the code specific to the page type on page load.

// Import the dependencies.

import {onPublicLoad} from "./onPublicLoad.js";
import {onAdminLoad} from "./onAdminLoad.js";
import {onShopLoad} from "./onShopLoad.js";
import {onOrderLoad} from "./onOrderLoad.js";

// Export the function.

export const onPageLoad = (root) => {

  // Call a different function depending on the classlist of the DOM root element.

  if (root.classList.contains("public")) {
    onPublicLoad();
    if (root.classList.contains("shop")) {
      onShopLoad();
    } else if (root.classList.contains("order")) {
      onOrderLoad();
    }
  } else if (root.classList.contains("admin")) {
    onAdminLoad();
  }
};
