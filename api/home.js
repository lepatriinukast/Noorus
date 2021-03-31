/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/home route.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../routingFunctions/multerUploads");

// Require the custom functions that handle different requests.

const updateImages = require("./../routingFunctions/updateImages");
const updateSection = require("./../routingFunctions/updateSection");

// Require the fields object containing data about inputs which upload files using the routes in this module.

const fields = require("./../routingFunctions/fields").home;

// Handle the requests to the api/home/images route.
// This route represents the images on the home page.

router.route("/images")

  // Replace an image or several on the homepage by uploading new ones.

  .put(upload(fields).multipart, async (req, res) => {

    // Call the function that updates images.
    // Provide the function with the req.files variable where the uploaded files are stored
    // and the database name which needs to be updated.
    // The function is asynchronous, so the await keyword has to be used.

    await updateImages(req.files, "static_images");

    // Send a response back to the browser.

    res.send("OK!");
  });

// Handle the requests to the api/home/main route.
// This route represents the main (header) part on the home page.

router.route("/main")

  // Update the main (header) part of the home page.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // The function is asynchronous so use the await keyword.

    await updateSection(req.body, "home_text");

    // Send a response back to the browser.

    res.send("OK!");
  });

// Handle the requests to the routes beginning with api/home/sections and ending with the custom parameter of id.
// These routes represent the text sections on the home page.

router.route("/sections/:id")

  // Update the main section of the home page.

  .put(upload().text, async (req, res) => {

    // Multer makes the user-inputted data available in the req.body variable.
    // Pass that into the function that updates the database along with the name of the database table.
    // This route updates the section specified in the custom parameter id.
    // Thos custom parameter also indicates the position in which the relevant section can be found in the database table.
    // The function is asynchronous so use the await keyword.

    await updateSection(req.body, "home_text", req.params.id);

    // Send a response back to the browser.

    res.send("OK!");
  });

// Export the router to the server file.

module.exports = router;
