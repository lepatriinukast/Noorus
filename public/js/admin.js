/* jshint esversion: 8 */


// This module exports functions that are used on the admin pages.

// Import dependencies:

import {ajax} from "./ajax.js";


// MESSAGES:


// Export a function for displaying a success message.

export const createSuccessMessage = () => {

  // Make the success message popup visible on the screen using utility classes.

  document.getElementById("successPopup").classList.remove("hide");
  document.getElementById("successPopup").classList.add("show");

  // Focus the "OK" button.

  document.getElementById("successBtn").focus();
};


// Export a function for displaying a failure message.

export const createFailureMessage = () => {

  // Make the failure message popup visible on the screen using utility classes.

  document.getElementById("failurePopup").classList.remove("hide");
  document.getElementById("failurePopup").classList.add("show");

  // Focus the "OK" button.

document.getElementById("failureBtn").focus();
};


//Export a function for displaying the message "Are you sure you want to delete this?"

export const createDeleteMessage = (event) => {

  // Make the popup visible using utility classes.

  document.getElementById("deletePopup").classList.remove("hide");
  document.getElementById("deletePopup").classList.add("show");

  // Focus the "NO" button.

  document.getElementById("deleteNoBtn").focus();

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


// Function for removing popup messages.

export const removeMessage = () => {

  // Remove any displayed popup using utility classes.

  for (var i = 0; i < document.querySelectorAll(".show").length; i++) {
    let popup = document.querySelectorAll(".show")[i];
    popup.classList.remove("show");
    popup.classList.add("hide");
  }
};


// INPUTS AND EDITORS:


// Identify the DOM element that serves as a container for the quill editor that triggered the function.

const getCustomEditor = (event) => {

  return event.target.parentNode.closest(".editor") || event.target.parentNode.querySelector(".editor");
};


// Identify the DOM element that was created by quill and serves as a secondary container for the quill editor that triggered the function.

const getQuillEditor = (event) => event.target.parentNode.closest(".ql-editor") || event.target.parentNode.querySelector(".ql-editor");


// Export a function which updates a corresponding hidden input whenever a change is made to a quill editor.

export const updateInputValue = (event) => {

  // Get the two container elements of the quill editor where the change occured.

  const customEditor = getCustomEditor(event);
  const quillEditor = getQuillEditor(event);

  // Using the id of the primary container element, get the corresponding hidden input.

  const input = document.getElementById(customEditor.id.slice(0, -6));

  // Change the hidden input value to whatever has been written inside the corresponding quill editor.

  input.value = quillEditor.innerHTML;
};


// Export a function for changing the labels and picture samples.

export const changePreview = (event) => {

  // The handler will work only on file inputs.

  if (event.target.type === "file") {

    // Using the id of the input that triggered the function, get the corresponding placeholder and display image from the DOM.

    const placeholder = document.getElementById(event.target.id + "Placeholder");
    const icon = document.getElementById(event.target.id + "Icon");

    // Change the label and preview image if a new file has been selected for upload.

    placeholder.innerHTML = event.target.files[0].name;
    icon.src = URL.createObjectURL(event.target.files[0]);
  }
};


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
