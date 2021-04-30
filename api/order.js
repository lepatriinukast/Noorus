/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/order route.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../apiFunctions/multerUploads");

// Require the API controller that handles different requests.

const apiController = require("./../apiFunctions/apiController");




// Handle the requests to the api/order/intro route.
// This route represents the intro part of the order page.

router.route("/intro")


  // Update the intro part of the order page.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // The third argument is an index that denotes the position of the relevant entry in the database table.
    // The function is asynchronous so use the await keyword.

    await apiController.update.text(req.body, "intros", 9);

    // Send a response back to the browser.

    res.send("OK!");
  });


  // Handle the requests to the api/order/form route.
  // This route represents the form on the order page.

  router.route("/form")


    // Update the form on the order page.

    .put(upload().text, async (req, res) => {

      // Multer makes the user-inputted data available in the req.body variable.
      // Pass that into the function that updates the database along with the name of the database table.
      // The function is asynchronous so use the await keyword.

      await apiController.update.form(req.body, "order_form");

      // Send a response back to the browser.

      res.send("OK!");
    })


    // Post a new form field to the form on the order page.

    .post(async (req, res) => {

      // Call the function that creates a new entry to the specified database table.
      // The function is asynchronous, so use the await keyword.

      await apiController.create("order_form");

      // Send a response back to the browser.

      res.send("OK");
    });




  // Handle the requests to the routes beginning with api/order/form and ending with the custom parameter of id.
  // These routes represent the form fields of the form on the order page.

  router.route("/form/:id")


    // Delete a form field from the form on the order page.

    .delete(async (req, res) => {

      // Call the function that deletes the specified entry from the specified database table.
      // The index for locating the entry in the table can be found in the api endpoint.
      // Also make this index 0-based.

      await apiController.delete("order_form", req.params.id - 1);

      // Send a response back to the browser.

      res.send("OK!");
    });




    // Handle the requests to the api/order/postscript route.
    // This route represents the intro part of the order page.

    router.route("/postscript")


      // Update the postscript part of the order page.

      .put(upload().text, async (req, res) => {

        // Multer makes the user-inputted data available in the req.body variable.
        // Pass that into the function that updates the database along with the name of the database table.
        // The third argument is an index that denotes the position of the relevant entry in the database table.
        // The function is asynchronous so use the await keyword.

        await apiController.update.text(req.body, "miscellaneous", 2);

        // Send a response back to the browser.

        res.send("OK!");
      });


// Export the router to the server file.

module.exports = router;
