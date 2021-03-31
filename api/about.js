/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/about route.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../routingFunctions/multerUploads");

// Require the custom functions that handle different requests.

const updateImages = require("./../routingFunctions/updateImages");
const updateText = require("./../routingFunctions/updateText");

// Require the fields object containing data about inputs which upload files using the routes in this module.

const fields = require("./../routingFunctions/fields").about;

// Handle the requests to the api/about route.
// This route represents the intro section on the about page.

router.route("/")

  // Update the intro section on the about page.

  .put(upload(fields).multipart, async (req, res) => {

    // Call the function that updates images.
    // Provide the function with the req.files variable where the uploaded files are stored
    // and the database name which needs to be updated.
    // The index also needs to be passed in to the function-
    // this is used to locate the relevant entry in the database table.
    // The function is asynchronous, so the await keyword has to be used.

    await updateImages(req.files, "static_images", 3);

    // Call the function that updates text.
    // The function is asynchronous, so the await keyword has to be used.

    await updateText(req.body, "intros");

    // Send a response back to the browser.

    res.send("OK!");
  });

  // Export the router to the server file.

  module.exports = router;
