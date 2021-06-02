/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/home route.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../apiFunctions/multerUploads");

// Require the custom functions that handle different requests.

const apiController = require("./../apiFunctions/apiController");

// Require the function that obtains the input fields necessary for file uploading.

const getFields = require("./../apiFunctions/getFields");

// Use the function to get a fitting fields object.

const fields = getFields("home");

// Require the express-session middleware configuration from the config folder.

const session = require("./../config/session");

// Setup the express-session framework as middleware for the router object.

router.use(session);




// Handle the requests to the api/home/images route.
// This route represents the images on the home page.

router.route("/images")


  // Replace an image or several on the homepage by uploading new ones.

  .put(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Upload the form data using multer.

      await upload(fields).multipart(req, res, async (err) => {

        // In case of an error on upload, throw the error.

        if (err) throw err;

        // Call the function that updates images.
        // Provide the function with the req.files variable where the uploaded files are stored
        // and the database name which needs to be updated.
        // The function is asynchronous, so the await keyword has to be used.

        if (req.files) {

          await apiController.update.staticImages(req.files, "static_images");
        }
      });

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  });




// Handle the requests to the api/home/main route.
// This route represents the main (header) part on the home page.

router.route("/main")


  // Update the main (header) part of the home page.

  .put(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Upload the form data using multer.

      await upload().text(req, res, async (err) => {

        // In case of an error on upload, throw the error.

        if (err) throw err;

        // Multer makes the user-inputted data available in the req.body variable.
        // Pass that into the function that updates the database along with the name of the database table.
        // The function is asynchronous so use the await keyword.

        await apiController.update.section(req.body, "static_sections");
      });

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  });




// Handle the requests to the routes beginning with api/home/sections and ending with the custom parameter of id.
// These routes represent the text sections on the home page.

router.route("/sections/:id")


  // Update the main section of the home page.

  .put(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Upload the form data using multer.

      await upload().text(req, res, async (err) => {

        // In case of an error on upload, throw the error.

        if (err) throw err;

        // Multer makes the user-inputted data available in the req.body variable.
        // Pass that into the function that updates the database along with the name of the database table.
        // This route updates the section specified in the custom parameter id.
        // This custom parameter also indicates the position in which the relevant section can be found in the database table.
        // Normally 1 should be deducted from the parameter, because js is 0-based,
        // but in this case the relevant entries actually start from position 1 not 0 in the database.
        // The function is asynchronous so use the await keyword.

        await apiController.update.section(req.body, "static_sections", req.params.id);
      });

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  });

// Export the router to the server file.

module.exports = router;
