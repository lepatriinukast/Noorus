/* jshint esversion: 8 */

// This API submodule handles all the requests to the api/about route.

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

const fields = getFields("about");

// Require the express-session middleware configuration from the config folder.

const session = require("./../config/session");

// Setup the express-session framework as middleware for the router object.

router.use(session);




// Handle the requests to the api/about route.
// This route represents the intro section on the about page.

router.route("/")


  // Update the intro section on the about page.

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
        // The index also needs to be passed in to the function-
        // this is used to locate the relevant entry in the database table.
        // The function is asynchronous, so the await keyword has to be used.

        if (req.files) {

          await apiController.update.staticImages(req.files, "static_images", 3);
        }

        // Multer makes the user-inputted data available in the req.body variable.
        // Pass that into the function that updates the database along with the name of the database table.
        // Also add an index number to locate the correct entry in the database.
        // The function is asynchronous so use the await keyword.

        await apiController.update.section(req.body, "static_sections", 3);
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
