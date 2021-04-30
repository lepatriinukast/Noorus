/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/events route.

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

const fields = getFields("events");




// Handle the requests to the api/events/intro route.
// This route represents the intro part of the events page.

router.route("/intro")


  // Update the intro part of the events page.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // The third argument is an index that denotes the position of the relevant entry in the database table.
    // The function is asynchronous so use the await keyword.

    await apiController.update.text(req.body, "intros", 5);

    // Send a response back to the browser.

    res.send("OK!");
  });




// Handle the requests to the api/events/content route.
// This route represents all the upcoming events on the events page.

router.route("/content")


  // Post a new event to the events page.

  .post(async (req, res) => {

    // Call the function that creates a new entry to the specified database table.
    // The function is asynchronous, so use the await keyword.
    // In this case the function needs to be called twice,
    // because new entries will be created to two different tables.

    await apiController.create("events_images");
    await apiController.create("events_content");

    // Send a response back to the browser.

    res.send("OK");
  });




// Handle the requests to the routes beginning with api/events/content and ending with the custom parameter of id.
// These routes represent the individual upcoming events on the events page.

router.route("/content/:id")


  // Update the events on the events page.

  .put(upload(fields).multipart, async (req, res) => {

    // Call the function that updates images.
    // Provide the function with the req.files variable where the uploaded files are stored
    // and a selector string, which the function is able to use to locate the correct database table and inputs.
    // The function is asynchronous, so the await keyword has to be used.

    if (req.files) {

      await apiController.update.dynamicImages(req.files, "events");
    }

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // This route updates the section specified in the custom parameter id.
    // Thos custom parameter also indicates the position in which the relevant section can be found in the database table
    // (deduct 1 from this number, because js is 0-based).
    // The function is asynchronous so use the await keyword.

    await apiController.update.section(req.body, "events_content", (req.params.id - 1));

    // Send a response back to the browser.

    res.send("OK!");
  })


  // Archive an event on the events page.

  .delete(async (req, res) => {

    // Call the function that archives the specified entry from the specified database table.
    // This means that the particular entry is transferred to another database table, where archived entries are stored.
    // The index for locating the entry in the table can be found in the api endpoint.
    // Also make this index 0-based.
    // Call the function twice to archive entries from two different tables.

    await apiController.archive("events_content", "archive_content", req.params.id - 1);
    await apiController.archive("events_images", "archive_images", req.params.id - 1);

    // Send a response back to the browser.

    res.send("OK!");
  });

// Export the router to the server file.

module.exports = router;
