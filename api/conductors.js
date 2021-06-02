/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/conductors route.

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

const fields = getFields("conductors");

// Require the express-session middleware configuration from the config folder.

const session = require("./../config/session");

// Setup the express-session framework as middleware for the router object.

router.use(session);




// Handle the requests to the api/conductors/intro route.
// This route represents the intro part of the conductors section on the about page.

router.route("/intro")


  // Update the intro part of the conductors section.

  .put(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Upload the form data using multer.

      await upload().text(req, res, async (err) => {

        // In case of an error on upload, throw the error.

        if (err) throw err;

        // Multer makes the user-inputted data available in the req.body variable.
        // Pass that into the function that updates the database along with the name of the database table.
        // The third argument is an index that denotes the position of the relevant entry in the database table.
        // The function is asynchronous so use the await keyword.

        await apiController.update.text(req.body, "intros", 1);
      });

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  });




// Handle the requests to the api/conductors/sections route.
// This route represents all the dynamic sections of the conductors part on the about page.

router.route("/sections")


  // Post a new section to the conductors part of the about page.

  .post(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Call the function that create a new entry to the specified database table.
      // The function is asynchronous, so use the await keyword.
      // In this case the function needs to be called twice,
      // because new entries will be created to two different tables.

      await apiController.create("conductors_images");
      await apiController.create("conductors_sections");

      // Send a response back to the browser.

      res.send("OK");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  });




// Handle the requests to the routes beginning with api/conductors/sections and ending with the custom parameter of id.
// These routes represent the text sections on the conductors part of the about page.

router.route("/sections/:id")


  // Update the sections of the conductors part of the about page.

  .put(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Upload the form data using multer.

      await upload(fields).multipart(req, res, async (err) => {

        // In case of an error on upload, throw the error.

        if (err) throw err;

        // Call the function that updates images.
        // Provide the function with the req.files variable where the uploaded files are stored
        // and a selector string, which the function is able to use to locate the correct database table and inputs.
        // The function is asynchronous, so the await keyword has to be used.

        if (req.files) {

          await apiController.update.dynamicImages(req.files, "conductors");
        }

        // Multer makes the user-inputted data available in the req.body variable.
        // Pass that into the function that updates the database along with the name of the database table.
        // This route updates the section specified in the custom parameter id.
        // Thos custom parameter also indicates the position in which the relevant section can be found in the database table
        // (deduct 1 from this number, because js is 0-based).
        // The function is asynchronous so use the await keyword.

        await apiController.update.section(req.body, "conductors_sections", (req.params.id - 1));
      });

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  })


  // Delete a section from the conductors part of the about page.

  .delete(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Call the function that deletes the specified entry from the specified database table.
      // The index for locating the entry in the table can be found in the api endpoint.
      // Also make this index 0-based.
      // Call the function twice to delete entries from two different tables.

      await apiController.delete("conductors_sections", req.params.id - 1);
      await apiController.delete("conductors_images", req.params.id - 1);

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
