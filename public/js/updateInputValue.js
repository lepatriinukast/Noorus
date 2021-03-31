/* jshint esversion: 8 */

// This module exports a function, which is run every time a change occurs on a quill editor on an admin page.

// The export function will need to know the container element of the quill editor.
// The following function will identify that element.

const getCustomEditor = (event) => {

  return event.target.parentNode.closest(".editor") || event.target.parentNode.querySelector(".editor");
};

// There is another element, which the export function needs access to,
 // and this is another container element that quill itself has created.
// The following function will identify that element.

const getQuillEditor = (event) => event.target.parentNode.closest(".ql-editor") || event.target.parentNode.querySelector(".ql-editor");

// Export a function which updates a corresponding hidden input, whenever a change is made to a quill editor.

export const updateInputValue = (event) => {

  // Get the two container elements.

  const customEditor = getCustomEditor(event);
  const quillEditor = getQuillEditor(event);

  // Get the id of the corresponding hidden input using the id of the container element.

  const inputId = customEditor.id.slice(0, -6);

  // Get the hidden input.

  const input = document.getElementById(inputId);

  // Change the hidden input value to whatever is written inside the corresponding quill editor.

  input.value = quillEditor.innerHTML;
};
