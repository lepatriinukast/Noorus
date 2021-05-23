/* jshint esversion: 8 */


// This is the master js file of the app which will be loaded by the browser.


// Import dependencies.

import {
  load
} from "./load.js";

import "./quill.js";

// Call the load function, which will run appropriate code depending on the attributes of the loaded page's body element.

load(document.querySelector("body"));
