/* jshint esversion: 8 */

// This module exports a function, which is run every time a change occurs on a quill editor on an admin page.


const getCustomEditor = (event) => {

  return event.target.parentNode.closest(".editor") ||
    event.target.parentNode.querySelector(".editor") ||
    event.target.parentNode.closest(".textInput") ||
    event.target.parentNode.querySelector(".textInput");
};

const getQuillEditor = (event) => event.target.parentNode.closest(".ql-editor") || event.target.parentNode.querySelector(".ql-editor");


const updateInputValue = (event) => {

  const customEditor = getCustomEditor(event);
  const quillEditor = getQuillEditor(event);

  const editorId = customEditor.id;
  const inputId = editorId.slice(0, -6);
  const input = document.getElementById(inputId);

  const inner = quillEditor.innerHTML;
  input.value = inner;
};

export {
  updateInputValue
};
