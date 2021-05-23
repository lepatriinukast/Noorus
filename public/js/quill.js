/* jshint esversion: 8 */

// JS code for displaying quill rich text editor instances on the admin pages.

// Get an array of the DOM elements that will serve as containers for the quill editors.

const containers = document.querySelectorAll('.editor');

// Loop through the array of container elements.

for (let i = 0; i < containers.length; i++) {

  // For each item in the container array, create an instance of quill text editor
  // (the code for this has been installed to the project from an outside source).
  // Specify the icons on the toolbar and the appearance theme.

  let quill = new Quill(containers[i], {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'link', {
          'list': 'bullet'
        }]
      ]
    },
    theme: 'snow'
  });

  // For accessibility reasons, disable the tab key functionality from quill editors.

  let keyboard = quill.getModule('keyboard');
  delete keyboard.bindings[9];

  // Make toolbar buttons unfocusable by keyboard.

  const buttons = document.querySelectorAll(".ql-toolbar button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("tabindex", "-1");
  }

  // Make the icons inside those buttons keyboard-focusable instead.

  let icons = document.querySelectorAll(".ql-toolbar svg");

  for (let i = 0; i < icons.length; i++) {
    icons[i].setAttribute("tabindex", "0");
  }
}
