/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/archive route.

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

const fields = getFields("archive");

// Require the express-session middleware configuration from the config folder.

const session = require("./../config/session");

// Setup the express-session framework as middleware for the router object.

router.use(session);




// Handle the requests to the api/archive/intro route.
// This route represents the intro part of the archive section on the events page.

router.route("/intro")


  // Update the intro part of the archive section.

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

        await apiController.update.text(req.body, "intros", 6);
      });

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  });

// Handle the requests to the routes beginning with api/archive/content and ending with the custom parameter of id.
// These routes represent the events on the archive part of the events page.




router.route("/content/:id")


  // Update the text sections of the archive part of the events page.

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
        // Also provide a number which denotes the position in the name attribute of the image input,
        // where the index number can be found and extracted.
        // The function is asynchronous, so the await keyword has to be used.

        if (req.files) {

          await apiController.update.dynamicImages(req.files, "archive");
        }

        // Multer makes the user-inputted data available in the req.body variable.
        // Pass that into the function that updates the database along with the name of the database table.
        // This route updates the section specified in the custom parameter id.
        // Thos custom parameter also indicates the position in which the relevant section can be found in the database table
        // (deduct 1 from this number, because js is 0-based).
        // The function is asynchronous so use the await keyword.

        await apiController.update.section(req.body, "archive_content", (req.params.id - 1));

      });

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  })


  // Delete an event from the archive part of the events page.

  .delete(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Call the function that deletes the specified entry from the specified database table.
      // The index for locating the entry in the table can be found in the api endpoint.
      // Also make this index 0-based.
      // Call the function twice to delete entries from two different tables.

      await apiController.delete("archive_content", req.params.id - 1);
      await apiController.delete("archive_images", req.params.id - 1);

      // Send a response back to the browser.

      res.send("OK!");

      // If the user is not logged in, send back a "403" status code, denying access.

    } else {

      res.status("403");
      res.send("Access denied");
    }
  })


  // Restore an event to the upcoming events part of the events page.

  .post(async (req, res) => {

    // Only handle the request if the user is logged in.

    if (req.session.loggedIn) {

      // Call the function that restores the specified entry from the specified database table.
      // This means that an entry will be transferred from a table containing archived data
      // to the table where it was originally created.
      // The index for locating the entry in the table can be found in the api endpoint.
      // Also make this index 0-based.
      // Call the function twice to restore entries from two different tables.

      await apiController.restore("events_content", "archive_content", req.params.id - 1);
      await apiController.restore("events_images", "archive_images", req.params.id - 1);

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
