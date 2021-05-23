/* jshint esversion: 8 */

// This module exports an object with different methods making an AJAX request to the server.
// This request is expected to be handled by the multer middleware on the server side.

// Import the dependencies.

import {
  addEditorListeners,
  addElement,
  createSuccessMessage,
  createFailureMessage,
  deleteElement,
  removeOutline
} from "./admin.js";

// Create the export object.

export const ajax = {


  // Send a get request.

  get(event) {

    // Create a new XMLHttpRequest

    const xhr = new XMLHttpRequest();

    // Open the request and specify its method, the destination of the request and whether the call is asynchronous (true).

    xhr.open('GET', window.location.pathname, true);

    // Check if the request is ready.

    xhr.onreadystatechange = function() {

      // Check if everything works.

      if (this.readyState == 4 && this.status == 200) {

        // Display the new element on the page.

        addElement(this, event);

        // If something is wrong, create a failure message.

      } else if (this.status !== 200) {
        console.log(this.response);
        createFailureMessage();
      }
    };

    // send the ajax get request

    xhr.send("GET");
  },


  // Send a put request.

  put(event) {

    // Prevent the form submitting in a regular manner.

    event.preventDefault();

    // Instead create a new XMLHttpRequest object for transferring data to the server.

    const xhr = new XMLHttpRequest();

    // Create a new formData object, which will send the relevant form to the server.

    const formData = new FormData(event.target);

    // Open the XMLHttpRequest and specify the method, destination route on the server, and confirm that the call takes place asynchronously.
    // The api endpoint can be obtained from the form that is the event target.

    xhr.open("PUT", event.target.action, true);

    // Check if the request is ready.

    xhr.onreadystatechange = () => {

      // If everything works, create a success message.

      if (xhr.readyState == 4 && xhr.status == 200) {
        createSuccessMessage();

        // Remove the outline effect from the elements that were updated and saved.
        removeOutline(event);

        // If not, create a failure message.

      } else if (xhr.status !== 200) {
        console.log(xhr.response);
        createFailureMessage();
      }
    };

    // Send the data to the server.

    xhr.send(formData);
  },


  // Send a post request.

  post(event) {


    // Prevent the default action from happening on the button click.

    event.preventDefault();

    // Instead create a new XMLHttpRequest object for transferring data to the server.

    const xhr = new XMLHttpRequest();

    // Open the XMLHttpRequest and specify the method, destination route on the server, and confirm that the call takes place asynchronously.
    // The api endpoint can be obtained from the button that is the event target.

    xhr.open("POST", event.target.dataset.action, true);

    // Check if the request is ready.

    xhr.onreadystatechange = () => {

      // If everything works, get the new version of the page and display new elements manually.

      if (xhr.readyState == 4 && xhr.status == 200) {
        ajax.get(event);

        // If not, create a failure message.

      } else if (xhr.status !== 200) {
        console.log(xhr.response);
        createFailureMessage();
      }
    };

    // Send the data to the server.

    xhr.send("CREATE");
  },


  // Send a delete request.

  delete(event) {

    // Prevent the default action from happening on the button click.

    event.preventDefault();

    // Instead create a new XMLHttpRequest object for transferring data to the server.

    const xhr = new XMLHttpRequest();

    // Open the XMLHttpRequest and specify the method, destination route on the server, and confirm that the call takes place asynchronously.
    // The api endpoint can be obtained from the button that is the event target.

    xhr.open("DELETE", event.target.dataset.action, true);

    // Check if the request is ready.

    xhr.onreadystatechange = () => {

      // If everything works, delete the specified element manually from the page.

      if (xhr.readyState == 4 && xhr.status == 200) {
        deleteElement(event);

        // If not, create a failure message.

      } else if (xhr.status !== 200) {
        console.log(xhr.response);
        createFailureMessage();
      }
    };

    // Send the data to the server.

    xhr.send("DELETE");
  },


  // Send a post request which actually restores some data.

  restore(event) {

    // Prevent the default action from happening on the button click.

    event.preventDefault();

    // Instead create a new XMLHttpRequest object for transferring data to the server.

    const xhr = new XMLHttpRequest();

    // Open the XMLHttpRequest and specify the method, destination route on the server, and confirm that the call takes place asynchronously.
    // The api endpoint can be obtained from the button that is the event target.

    xhr.open("POST", event.target.dataset.action, true);

    // Check if the request is ready.

    xhr.onreadystatechange = () => {

      // If everything works, delete the specified element manually from the page.

      if (xhr.readyState == 4 && xhr.status == 200) {
        deleteElement(event);

        // If not, create a failure message.

      } else if (xhr.status !== 200) {
        console.log(xhr.response);
        createFailureMessage();
      }
    };

    // Send the data to the server.

    xhr.send("RESTORE");
  },

  // Send a post request which actually archives moves some data by moving it to another database table.

  archive(event) {

    // Prevent the default action from happening on the button click.

    event.preventDefault();

    // Instead create a new XMLHttpRequest object for transferring data to the server.

    const xhr = new XMLHttpRequest();

    // Open the XMLHttpRequest and specify the method, destination route on the server, and confirm that the call takes place asynchronously.
    // The api endpoint can be obtained from the button that is the event target.

    xhr.open("POST", event.target.dataset.action, true);

    // Check if the request is ready.

    xhr.onreadystatechange = () => {

      // If everything works, delete the specified element manually from the page.

      if (xhr.readyState == 4 && xhr.status == 200) {
        deleteElement(event);

        // If not, create a failure message.

      } else if (xhr.status !== 200) {
        console.log(xhr.response);
        createFailureMessage();
      }
    };

    // Send the data to the server.

    xhr.send("ARCHIVE");
  },


  // Send a post request, which creates a login session.

  login(event) {

    // Prevent the form from submitting in a regular manner.

    event.preventDefault();

    // create a new XMLHttpRequest object

    var xhr = new XMLHttpRequest();

    // Open the XMLHttpRequest and specify the method, destination route, and whether the call takes place asynchronously (true).

    xhr.open("POST", "/api/session", true);

    // Create a new form-data object, which will send the relevant form to the server.

    const formData = new FormData(event.target);

    // Check if the request is ready.

    xhr.onreadystatechange = function() {

      // if everything works, check the action type

      if (this.readyState == 4 && this.status == 200) {

        // If the server response is "logged in", allow the user to login.

        if (this.response === "logged in") {

          // Redirect to the admin page.

          window.location.href = "/admin/home";

          // If the server response is "wrong credentials", display an error message.

        } else if (this.response === "wrong credentials") {

          document.getElementById("wrongText").classList.remove("hide");
        }

        // If there is another problem with the login, create a failure message.

      } else if (this.status !== 200) {
        console.log(this.response);
        createFailureMessage();
      }
    };

    // Send the data to the server.

    xhr.send(formData);
  },


  // Send a delete request which destroys the session cookie and logs the user out from the admin page.

  logout(event) {

    // Prevent the default action on the logout button.

    event.preventDefault();

    // Create a new XMLHttpRequest object.

    var xhr = new XMLHttpRequest();

    // Open the XMLHttpRequest and specify the method, destination route on the server, and whether the call takes place asynchronously (true).

    xhr.open("DELETE", "/api/session", true);

    // Check if the request is ready.

    xhr.onreadystatechange = function() {

      // If everything works, redirect to the login route.

      if (this.readyState == 4 && this.status == 200) {

        window.location.href = "/login";

        // if there is a problem, create a failure message.

      } else if (this.status !== 200) {

        console.log(this.response);
        createFailureMessage();
      }
    };

    // Send a request to the server.

    xhr.send("LOGOUT");
  },

  submit(event) {

    // Prevent the default action from happening on the button click.

    event.preventDefault();

    // Instead create a new XMLHttpRequest object for transferring data to the server.

    const xhr = new XMLHttpRequest();

    // Create a new formData object, which will send the relevant form to the server.

    const formData = new FormData(event.target);

    // Open the XMLHttpRequest and specify the method, destination route on the server, and confirm that the call takes place asynchronously.
    // The api endpoint can be obtained from the button that is the event target.

    xhr.open("POST", event.target.action, true);

    // Check if the request is ready.

    xhr.onreadystatechange = () => {

      // If everything works, redirect to the success page.

      if (xhr.readyState == 4 && xhr.status == 200) {

        // The success page url depends on the page where the redirect happened.

        let page;

        switch (window.location.pathname) {
          case "/telli":

            page = "/edu?page=order";

            break;
          case "/kontakt":

            page = "/edu?page=contact";

            break;
          case "/en/order":

            page = "/en/success?page=order";

            break;
          case "/en/contact":

            page = "/en/success?page=contact";

            break;
          default:

        }

        // Redirect to the success page.

        window.location.href = page;


        // If not, redirect to the failure page.

      } else if (xhr.status !== 200) {
        console.log(xhr.response);

        // The failure page url depends on the page where the redirect happened.

        let page;

        switch (window.location.pathname) {
          case "/telli":

            page = "/torge?page=order";

            break;
          case "/kontakt":

            page = "/torge?page=contact";

            break;
          case "/en/order":

            page = "/en/failure?page=order";

            break;
          case "/en/contact":

            page = "/en/failure?page=contact";

            break;
          default:

        }

        // Redirect to the failure page.

        window.location.href = page;
      }
    };

    // Send the data to the server.

    xhr.send(formData);
  }
};
