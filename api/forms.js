/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/forms route.
// These routes represent the forms on the public pages of the website.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the nodemailer configuration.

const send = require("./../config/nodemailer");

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../apiFunctions/multerUploads");

// Require the API controller that handles different requests.

const apiController = require("./../apiFunctions/apiController");


// Handle the requests to the api/forms/contact route.
// This route handles the data submitted by the user on the contact page.

router.route("/contact")

  // Post data to the server.

  .post(upload().text, async (req, res) => {

    // Get the keys from the form-data object sent from the client-side.

    const keys = Object.keys(req.body);

    // Create an empty array, which will later be populated by strings.

    const strings = [];

    // Loop through the array of keys.

    for (let i = 0; i < keys.length; i++) {

      // Construct a string from the key-value pair sent from the client side.
      // Add a HTML linebreak to the end.

      let string = keys[i] + " : " + req.body[keys[i]] + "<br>";

      // Push the string to the empty array.

      strings.push(string);
    }

    // Setup the mail options.
    // Join the array of strings to create the body of the email.

    const mailOptions = {
      from: 'joosep_trumm@hotmail.com',
      to: 'joosep_trumm@hotmail.com',
      subject: 'Uus tellimus Nooruse kodulehelt',
      html: strings.join("")
    };

    // Send the email using the specified options.

    send(mailOptions);

    // Send a response to the browser.

    res.send("OK");
  });




  // Handle the requests to the api/forms/order route.
  // This route handles the data submitted by the user on the order page.

  router.route("/order")


    // Post data to the server.

    .post(upload().text, async (req, res) => {

      // Get the keys of the form-data sent by the client-side.

      const keys = Object.keys(req.body);

      // Filter the keys into an array that exludes the key named either "price" or "hind" depending on the language of the page.
      // The remaining keys hold data for the shop items and the contact information of the client.

      const filter = keys.filter(key => key !== "price" && key !== "hind");

      // Depending on the language of the page, find the key called "price" or "hind".
      // This key holds an array of the initial prices of all the shop items.

      const price = keys.find(key => key === "price" || key === "hind");

      // Create an empty array which will be populated by strings forming the future e-mail body.

      const strings = [];

      // Loop through the filtered keys.

    for (let i = 0; i < filter.length; i++) {

      // If a key has a value assigned to it that is equal to zero, ignore it.
      // This means that the shop item represented by this key has not been ordered.

      if (req.body[filter[i]] != 0) {

        // As for other keys, form a string from the key names and values assigned to them.

        let string = filter[i] + ": " + req.body[filter[i]];

        // Check if this key has a corresponding item in the price array
        // (shop items have prices, but contact information does not).


        if (req.body[price][i]) {

          // Add the price and a linebreak to the string.

          string = string + " (" + price + ": " + req.body[price][i] + ") <br>";
        } else {

          // If there is no price, only add a linebreak.

          string = string + " <br>";
        }

        // Push the constructed string to the empty array.

        strings.push(string);
      }
    }

      // Setup the mail options.
      // The e-mail body will be the joined strings array.

      const mailOptions = {
        from: 'joosep_trumm@hotmail.com',
        to: 'joosep_trumm@hotmail.com',
        subject: 'Uus tellimus Nooruse kodulehelt',
        html: strings.join("")
      };

      // Send the email using the specified options.

      // send(mailOptions);

      // Send a response to the browser.

      res.send("OK");
    });

// Export the router object.

module.exports = router;
