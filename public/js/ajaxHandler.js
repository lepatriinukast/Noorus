/* jshint esversion: 8 */

// This module exports a function which makes an AJAX call to the server.
// This request is expected to be handled by the multer middleware on the server side.

import {createSuccessMessage, createFailureMessage} from "./adminMessages.js";

export const ajaxHandler = (event) => {

  // Prevent the form submitting in a regular manner.

  event.preventDefault();

  // Instead create a new XMLHttpRequest object for transferring data to the server.

  const xhr = new XMLHttpRequest();

  // Create a new formData object, which will send the relevant form to the server.

  const formData = new FormData(event.target);

  // Open the XMLHttpRequest and specify the method, destination route on the server, and confirm that the call takes place asynchronously.
  // All the required information can be obtained from the form that is the event target.

  xhr.open(event.target.dataset.method, event.target.action, true);

  // Check if the request is ready.

  xhr.onreadystatechange = () => {

    // If everything works, create a success message.

    if (xhr.readyState == 4 && xhr.status == 200) {
      createSuccessMessage();

      // If not, create a failure message.

    } else if (xhr.status !== 200) {
      console.log(xhr.response);
      createFailureMessage();
    }
  };

  // Send the data to the server.

  xhr.send(formData);
};
