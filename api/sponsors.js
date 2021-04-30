/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/sponsors route.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../apiFunctions/multerUploads");

// Require the API controller that handles different requests.

const apiController = require("./../apiFunctions/apiController");

// Require the function that obtains the input fields necessary for file uploading.

const getFields = require("./../apiFunctions/getFields");

// Use the function to get a fitting fields object.

const fields = getFields("sponsors");




// Handle the requests to the api/sponsors/intro route.
// This route represents the intro part of the sponsors section on the about page.

router.route("/intro")


  // Update the intro part of the sponsors section.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // The third argument is an index that denotes the position of the relevant entry in the database table.
    // The function is asynchronous so use the await keyword.

    await apiController.update.text(req.body, "intros", 4);

    // Send a response back to the browser.

    res.send("OK!");
  });




// Handle the requests to the api/sponsors/logos route.
// This route represents the logos on the sponsors section of the about page.

router.route("/logos")


  // Replace a logo or several on the sponsors section by uploading new ones
  // and update the url and link properties in the provided database table.

  .put(upload(fields).multipart, async (req, res) => {

    // Call the function that updates images with an additional link property.
    // Provide the function with the req.files variable where the uploaded files are stored,
    // the req.body variable, where all the text-based form-data is captured,
    // and a selector string, which the function is able to use to locate the correct database table and inputs.
    // The function is asynchronous, so the await keyword has to be used.

    await apiController.update.imageLinks(req.files, req.body, "sponsors", "sponsors_logos");

    // Send a response back to the browser.

    res.send("OK!");
  })


  // Post a new logo to the sponsors part of the about page.

  .post(async (req, res) => {

    // Call the function that creates a new entry to the specified database table.
    // The function is asynchronous, so use the await keyword.

    await apiController.create("sponsors_logos");

    // Send a response back to the browser.

    res.send("OK");
  });




// Handle the requests to the routes beginning with api/sponsors/logos and ending with the custom parameter of id.
// These routes represent the individual logos on the sponsors part of the about page.

router.route("/logos/:id")


  // Delete a logo from the sponsors part of the about page.

  .delete(async (req, res) => {

    // Call the function that deletes the specified entry from the specified database table.
    // The index for locating the entry in the table can be found in the api endpoint.
    // Also make this index 0-based.

    await apiController.delete("sponsors_logos", req.params.id - 1);

    // Send a response back to the browser.

    res.send("OK!");
  });


// Export the router to the server file.

module.exports = router;
