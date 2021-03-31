/* jshint esversion: 8 */

// This module exports functions that create messages on the admin page, when an AJAX request is made.

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


export const createDeleteMessage = (event, destination, subform) => {

  // Make the popup visible using utility classes.

  document.getElementById("deletePopup").classList.remove("hide");
  document.getElementById("deletePopup").classList.add("show");

  // Focus the "NO" button.

  document.getElementById("deleteNoBtn").focus();

  // Get the parent node of the event target.

  var parent = getParent(eventTarget);

  // Add an event listener to the "Yes" button on the delete popup and pass in the parent subform as an argument.

  document.getElementById("deleteYesBtn").addEventListener("click", (event) => {

      // When the button is clicked, call the commenceDelete function (this will start an ajax request).

      commenceDelete(event, parent, destination, subform);
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
