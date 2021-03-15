/* jshint esversion: 8 */

import {updateInputValue} from "./updateInputValue.js";

const editorArray = document.querySelectorAll(".editor");

const listenEvents = () => {

  // for (let i = 0; i < editorArray.length; i++) {
  //   editorArray[i].addEventListener("input", updateInputValue);
  // }

  for (let i = 0; i < editorArray.length; i++) {
    editorArray[i].addEventListener("DOMSubtreeModified", updateInputValue);
  }

  // for (let i = 0; i < textInputArray.length; i++) {
  //   textInputArray[i].addEventListener("input", updateInputValue);
  // }
};

export {listenEvents};
