/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/forms route.
// These routes represent the forms on the public pages of the website.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the function that sends an email with mailgun.

const send = require("./../config/mailgun");

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../apiFunctions/multerUploads");


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

    const mail = strings.join("");

   // Create the data object for sending the email.

    const data = {
      from: "Nooruse koduleht <liitumine@noorus.ee>",
      to: "segakoornoorus@gmail.com",
      subject: "Liitumine Segakoor Noorusega",
      html: mail
    };

    // Send the e-mail.

    send(data);

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

    // Filter the keys into an array that only contain client contact information.
    // These are the only keys that have dynamic names.

    const contactKeys = keys.filter(key => key !== "count" && key !== "language" && key !== "name" && key !== "price" && key !== "total");

    // Create an empty array which will later be populated by strings containing user contact information.

    const contactInfo = [];

    // Loop through the filtered keys and if a key contains any information, convert the data into a coherent string and push it to the above array.

    for (let i = 0; i < contactKeys.length; i++) {
      if (req.body[contactKeys[i]]) {
        let string = contactKeys[i] + ": " + req.body[contactKeys[i]] + "<br>";
        contactInfo.push(string);
      }
    }

    // Create an empty array which will be populated by data about ordered items.

    const items = [];

    // A helper function which returns a string containing the total price of an item in the order list in the right language.
    // In some cases no string is needed and thus the function returns an empty string.

    const getTotal = (language, count, price) => {

      if (count > 1) {
        if (language === "est") {
          return `, (kokku ${count * price} €)`;
        } else if (language === "en") {
          return `, (total ${count * price} €)`;
        }
      } else {
        return "";
      }
    };

    // Loop through the array where the amount of each ordered item is stored.
    // If the amount is zero, ignore it, but otherwise construct a string, using the data sent from the client as well as the helper function above.
    // Push all the strings into the empty array created above.

    for (let i = 0; i < req.body.count.length; i++) {
      if (req.body.count[i] != 0) {
        let string = `${req.body.count[i]} ${req.body.name[i]} (${req.body.price[i]} €)${getTotal(req.body.language, Number(req.body.count[i]), Number(req.body.price[i]))}<br>`;
        items.push(string);
      }
    }

    // As the last element in the array, add a string denoting the total price of the order.
    // The exact string depends on the language of the page where the order was made from.

    if (req.body.language === "est") {
      items.push("Koguhind: " + req.body.total + " €<br><br>");
    } else if (req.body.language === "en") {
      items.push("Total price: " + req.body.total + " €<br><br>");
    }

    // For the full e-mail body, join the two created arrays into one long string.

    const mail = items.concat(contactInfo).join("");

    // Create the data object for sending the email.

    const data = {
      from: "Nooruse koduleht <tellimus@noorus.ee>",
      to: "segakoornoorus@gmail.com",
      subject: "Uus tellimus Nooruse kodulehelt",
      html: mail
    };

    // Send the e-mail.

    send(data);

    // Send a response to the browser.

    res.send("OK");
  });

// Export the router object.

module.exports = router;
