/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/contact route.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../apiFunctions/multerUploads");

// Require the API controller that handles different requests.
const apiController = require("./../apiFunctions/apiController");




// Handle the requests to the api/contact/intro route.
// This route represents the intro part of the contact page.

router.route("/intro")


  // Update the intro part of the contact page.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // The third argument is an index that denotes the position of the relevant entry in the database table.
    // The function is asynchronous so use the await keyword.

    await apiController.update.text(req.body, "intros", 7);

    // Send a response back to the browser.

    res.send("OK!");
  });




// Handle the requests to the api/contact/sections route.
// This route represents all the dynamic sections on the contact page.

router.route("/sections")


  // Post a new section to the contact page.

  .post(async (req, res) => {

    // Call the function that creates a new entry to the specified database table.
    // The function is asynchronous, so use the await keyword.

    await apiController.create("contact_sections");

    // Send a response back to the browser.

    res.send("OK");
  });




// Handle the requests to the routes beginning with api/contact/sections and ending with the custom parameter of id.
// These routes represent the text sections on the contact page.

router.route("/sections/:id")


  // Update the text sections of the contact page.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // This route updates the section specified in the custom parameter id.
    // Thos custom parameter also indicates the position in which the relevant section can be found in the database table
    // (deduct 1 from this number, because js is 0-based).
    // The function is asynchronous so use the await keyword.

    await apiController.update.section(req.body, "contact_sections", (req.params.id - 1));

    // Send a response back to the browser.

    res.send("OK!");
  })


  // Delete a section from the contact page.

  .delete(async (req, res) => {

    // Call the function that deletes the specified entry from the specified database table.
    // The index for locating the entry in the table can be found in the api endpoint.
    // Also make this index 0-based.

    await apiController.delete("contact_sections", req.params.id - 1);

    // Send a response back to the browser.

    res.send("OK!");
  });




// Handle the requests to the api/contact/form route.
// This route represents the form on the contact page.

router.route("/form")


  // Update the form of the contact page.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // The function is asynchronous so use the await keyword.

    await apiController.update.form(req.body, "contact_form");

    // Send a response back to the browser.

    res.send("OK!");
  })


  // Post a new form field to the form on the contact page.

  .post(async (req, res) => {

    // Call the function that creates a new entry to the specified database table.
    // The function is asynchronous, so use the await keyword.

    await apiController.create("contact_form");

    // Send a response back to the browser.

    res.send("OK");
  });




// Handle the requests to the routes beginning with api/contact/form and ending with the custom parameter of id.
// These routes represent the form fields of the form on the contact page.

router.route("/form/:id")


  // Delete a form field from the form on the contact page.

  .delete(async (req, res) => {

    // Call the function that deletes the specified entry from the specified database table.
    // The index for locating the entry in the table can be found in the api endpoint.
    // Also make this index 0-based.

    await apiController.delete("contact_form", req.params.id - 1);

    // Send a response back to the browser.

    res.send("OK!");
  });

// Export the router to the server file.

module.exports = router;
