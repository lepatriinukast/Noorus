/* jshint esversion: 8 */


// This module exports functions that are used on the admin pages.

// Import dependencies:

import {
  ajax
} from "./ajax.js";


// MESSAGES:


// Export a function which checks for unsaved changes on the admin page on leaving the page.
// If this is the case, a warning message will be displayed, if not, the intended action will take place.

export const checkSavedStatus = (event) => {

  // Prevent the user from leaving the page.

  event.preventDefault();

  // Check if there are any unsaved data on the page.

  if (document.querySelectorAll(".unsaved").length) {

    // Create a warning message.

    createWarningMessage(event);

    // If there is no unsaved data, the next action depends on the event target.
    // This function can be triggered by either of the two buttons on the top right of the admin page,
    // or the navigation links on the left side of the admin page.

  } else if (event.target === document.getElementById("relocationBtn") || event.target.classList.contains("adminnav__link")) {

    // Redirect to the specified page.

    window.location.href = event.target.href;

  } else if (event.target === document.getElementById("logoutBtn")) {

    // Commence a logout process.

    ajax.logout(event);

  }
};


// Export a function for displaying a failure message.

export const createFailureMessage = () => {

  // Make the failure message popup visible on the screen using utility classes.

  document.getElementById("failurePopup").classList.remove("hide");
  document.getElementById("failurePopup").classList.add("show");

};


// Export a function for displaying the message "Are you sure you want to delete this?"

export const createDeleteMessage = (event) => {

  // Make the popup visible using utility classes.

  document.getElementById("deletePopup").classList.remove("hide");
  document.getElementById("deletePopup").classList.add("show");

  // Redifine the event object for usage in a new event listener.

  const firstEvent = event;

  // Add an event listener to the "Yes" button on the delete popup and pass in the previous event as an argument.

  document.getElementById("deleteYesBtn").addEventListener("click", () => {

      // When the "Yes" button is clicked, make an ajax request to the server to delete an entry from the database.

      ajax.delete(firstEvent);
    },

    // Below is the options object of the event handler, which removes the event listener after it has run once,
    // otherwise the event listeners would just pile up when the containing function is run multiple times.

    {
      once: true
    });
};


// Export a function for displaying a success message.

export const createSuccessMessage = () => {

  // Make the success message popup visible on the screen using utility classes.

  document.getElementById("successPopup").classList.remove("hide");
  document.getElementById("successPopup").classList.add("show");

};

// A function for displaying a warning message.

const createWarningMessage = (event) => {

  // Make the warning message popup visible on the screen using utility classes

  document.getElementById("warningPopup").classList.remove("hide");
  document.getElementById("warningPopup").classList.add("show");

  // Capture the current event into a variable in order to use it inside another event listener.

  const firstEvent = event;

  // Add an event listener to the "Yes" button on the delete popup and pass in the previous event as an argument.

  document.getElementById("warningYesBtn").addEventListener("click", () => {

      // The action on button click depends on which button was clicked.
      // This function can be triggered by either of the buttons on the top right of the admin page.

      if (firstEvent.target === document.getElementById("relocationBtn") || firstEvent.target.classList.contains("adminnav__link")) {

        // When the "Yes" button is clicked, relocate to the chosen page.

        window.location.href = firstEvent.target.href;

      } else if (firstEvent.target === document.getElementById("logoutBtn")) {

        // When the "Yes" button is clicked, commence a logout process.

        ajax.logout(firstEvent);
      }
    },

    // Below is the options object of the event handler, which removes the event listener after it has run once,
    // otherwise the event listeners would just pile up when the containing function is run multiple times.

    {
      once: true
    });
};


// Export a function for removing popup messages.

export const removeMessages = () => {

  // Remove any displayed popup or toggled menu using utility classes.

  for (var i = 0; i < document.querySelectorAll(".show").length; i++) {
    let message = document.querySelectorAll(".show")[i];
    message.classList.remove("show");
    message.classList.add("hide");
  }
};


// ADMIN MENU:


// Export a function that adds the "hide" class to the navigation menu if the viewport is small enough.
// If it is larger than specified in the css media query, make sure that the "hide" class does not exist.

export const adjustAdminMenu = () => {

  if (window.matchMedia('(max-width: 40.625em)').matches) {
    if (!document.getElementById("adminMenu").classList.contains("hide")) {
      document.getElementById("adminMenu").classList.add("hide");
    }
  } else {
    if (document.getElementById("adminMenu").classList.contains("hide")) {
      document.getElementById("adminMenu").classList.remove("hide");
    }
  }
};


// Export a function for toggling the visibility of the navigation menu on smaller screens.

export const toggleAdminMenu = () => {
  document.getElementById("adminMenu").classList.toggle("show");
  document.getElementById("adminMenu").classList.toggle("hide");
};


// INPUTS AND EDITORS:


// Export a function, which adds event listeners to the quill editors if they aren't already in place.
// This function will be called on admin page load and after ajax get requests.

export const addEditorListeners = () => {

  // Loop through an array of quill container elements and start listening for changes in their DOM subtrees.
  // When a change occurs, update the value of the corresponding hidden input.

  for (let i = 0; i < document.querySelectorAll(".editor").length; i++) {

    // Get all the quill containers as an array.

    let editor = document.querySelectorAll(".editor")[i];

    // This function is meant to be reused in the app,
    // so in order to prevent event listeners piling up, check for a specific attribute on the editor,
    // which indicates whether a listener is already in place or not.
    // If not, add the attribute and start listening for changes.

    if (!editor.hasAttribute("data-listener")) {
      editor.setAttribute("data-listener", true);
      document.querySelectorAll(".editor")[i].addEventListener("DOMSubtreeModified", updateInputValue);
    }
  }
};


// Identify the DOM element that serves as a container for the quill editor that triggered the function.

const getCustomEditor = (event) => {

  return event.target.parentNode.closest(".editor") || event.target.parentNode.querySelector(".editor");
};


// Identify the DOM element that was created by quill and serves as a secondary container for the quill editor that triggered the function.

const getQuillEditor = (event) => event.target.parentNode.closest(".ql-editor") || event.target.parentNode.querySelector(".ql-editor");


// Export a function for changing the labels and picture samples.

export const changePreview = (event) => {

  // Using the id of the input that triggered the function, get the corresponding label (it is not the <label> element) and preview image from the DOM.

  const label = document.getElementById(event.target.id + "Label");
  const preview = document.getElementById(event.target.id + "Preview");

  // Change the label and preview image if a new file has been selected for upload.
  // Also add the unsaved outline effect to the preview.

  label.innerHTML = event.target.files[0].name;
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.classList.add("unsaved");
};


// Export a function that removes the outline effect from the editors and inputs that have been updated and saved.

export const removeOutline = (event) => {

  // Get the entire form that has been updated.

  const form = event.target.closest("form");

  // Get all the elements in this form that have the class "unsaved".

  const unsaved = form.querySelectorAll(".unsaved");

  // Loop through these elements and remove the class.

  for (let i = 0; i < unsaved.length; i++) {
    unsaved[i].classList.remove("unsaved");
  }
};


// Export a function which updates a corresponding hidden input whenever a change is made to a quill editor.

export const updateInputValue = (event) => {

  // Get the two container elements of the quill editor where the change occured.

  const customEditor = getCustomEditor(event);
  const quillEditor = getQuillEditor(event);

  // Change the color of all the text elements inside the quill editor
  // indicating that the editor contains unsaved data.

  customEditor.classList.add("unsaved");

  // Using the id of the primary container element, get the corresponding hidden input.

  const input = document.getElementById(customEditor.id.slice(0, -6));

  // Change the hidden input value to whatever has been written inside the corresponding quill editor.

  input.value = quillEditor.innerHTML;
};


// ADD OR DELETE DOM ELEMENTS AFTER SERVER OPERATIONS:


// Some buttons on the admin page trigger certain database operations, such as deleting or adding data.
// After a page reload, the view engine would render the result of those changes automatically.
// However, in order not to reload the page each time a database operation is carried out,
// those adjustments to the DOM must be made manually using Javascript.
// The following functions do just that.

// Export a function which displays a new item on the admin page.

export const addElement = (xhr, event) => {

  // When this function is called, it means that some new data has been inserted to the database,
  // which after a page reload would result in a new DOM element displayed on the page.
  // The page reload can however be avoided by making an AJAX get request to the server.
  // The server response from that get request is available in this function as the xhr variable.

  // The server response contains a string representation of the new version of the page with the added element.
  // In order to display its contents on the actual page, this string has to be parsed into a regular DOM tree.
  // So, setup a string parser.

  const parser = new DOMParser();

  // Use the parser to create a regular DOM tree from the response string.

  const newDoc = parser.parseFromString(xhr.responseText, "text/html");

  // The new element needs to be located in this new DOM tree and displayed on the actual page
  // by appending it to a correct element in the real DOM.
  // The id of this would-be parent element is available in an attribute of the event target.

  const group = document.getElementById(event.target.dataset.for);

  // The same element of course exists in the new DOM as well
  // and they have identical id attributes in both trees.

  const newGroup = newDoc.getElementById(group.id);

  // The only difference between the two DOM-s is the extra element added as a result of a database operation.
  // This extra element is the last child of the identified parent element on the new DOM.
  // Append it to the corresponding parent element on the real DOM.

  group.append(newGroup.children[newGroup.children.length - 1]);

  // The new element is now displayed on the screen, but parts of it will need to be converted into quill editors.
  // Get an array of all the DOM elements that are meant to serve as containers for the quill editors.

  const containers = document.querySelectorAll('.editor');

  // Loop through the array of container elements.

  for (let i = 0; i < containers.length; i++) {

    // Create a new instance of quill for those containers that are not yet quill editors.

    if (!containers[i].querySelector(".ql-editor")) {

      let quill = new Quill(containers[i], {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'link', {
              'list': 'bullet'
            }],
          ]
        },
        theme: 'snow'
      });

      // For accessibility reasons, disable the tab key functionality from quill editors.

      let keyboard = quill.getModule('keyboard');
      delete keyboard.bindings[9];

      // Make toolbar buttons unfocusable by keyboard.

      let buttons = document.querySelectorAll(".ql-toolbar button");

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("tabindex", "-1");
      }

      // Make the icons inside those buttons keyboard-focusable instead.

      let icons = document.querySelectorAll(".ql-toolbar svg");

      for (let i = 0; i < icons.length; i++) {
        icons[i].setAttribute("tabindex", "0");
      }
    }
  }

  // Add event listeners to the editors that don't already have them.

  addEditorListeners();
};


// Export a function that deletes a DOM element from the admin page and updates the attributes of other related elements.

export const deleteElement = (event) => {

  // Some data has been deleted from the database and as a result an element on the page will be removed after page reload.
  // To avoid a page reload, the particular element can to be removed from the page manually using Javascript.

  // This element is a grand-parent of the button that triggered the event and it has a special class.

  const element = event.target.closest(".dataElement");

  // The element also has a container.

  const group = element.parentNode;

  // Delete the element from the page.

  element.remove();

  // Now the offending element has been deleted from the page,
  // but some of its former siblings can have incorrect attribute values if they contain index numbers.
  // These need to be updated as well.

  // Get all descendants of the deleted element's container (its siblings and their descendants).

  const elements = group.querySelectorAll("*");

  // Loop through all the descendants.

  for (let i = 0; i < elements.length; i++) {

    // Check for the existence of some attributes that may need to be changed.
    // If any of those contains a number, replace it using a helper function.
    // The index number of the deleted element needs to be passed into this helper function.
    // This number is stored in an attribute of the button that triggered the event.

    if (elements[i].dataset.action) {
      elements[i].dataset.action = replaceNumber(elements[i].dataset.action, event.target.dataset.index);
    }

    if (elements[i].id) {
      elements[i].id = replaceNumber(elements[i].id, event.target.dataset.index);
    }

    if (elements[i].name) {
      elements[i].name = replaceNumber(elements[i].name, event.target.dataset.index);
    }

    if (elements[i].getAttribute("for")) {
      elements[i].setAttribute("for", replaceNumber(elements[i].getAttribute("for"), event.target.dataset.index));
    }

    if (elements[i].dataset.index) {
      elements[i].dataset.index = replaceNumber(elements[i].dataset.index, event.target.dataset.index);
    }

    if (elements[i].tagName === "H2" || elements[i].tagName === "H3") {
      elements[i].innerHTML = replaceNumber(elements[i].innerHTML, event.target.dataset.index);
    }
  }

  // The action attribute of forms cannot be changed this way,
  // because when developing on localhost, the host part of its value contains numbers that should not be changed.

  // Each such form also has a data-action attribute which will be changed instead.
  // This attribute does not contain the host part of the url.

  // Get all the relevant forms.

  let forms = document.querySelectorAll("form[data-action]");

  // Loop through the forms.

  for (var i = 0; i < forms.length; i++) {

    // Change the action attribute to equal the changed data-action attribute.
    // The unaffected host part will be added to the action attribute automatically.

    forms[i].action = forms[i].dataset.action;
  }
};


// A helper function which finds a number in a string and replaces it with a new one depending on the provided index.
// If no number is found in the string, or the conditions are not met, the string is returned unchanged.

const replaceNumber = (string, index) => {

  // Find out if the string has any numbers in it.

  const numbers = string.match(/\d+/);

  if (numbers) {

    // If the index is specified as 0, add 1 to the number.

    if (index === 0) {

      return string.replace(numbers[0], Number(numbers[0]) + 1);

      // If the index is not 0 and is higher than the provided index, substract 1 from it.

    } else if (numbers[0] > index) {

      // Return the new string.

      return string.replace(numbers[0], numbers[0] - 1);

    } else {

      // Return the original string.

      return string;
    }

  } else {

    // Return the original string.

    return string;
  }
};
