/* jshint esversion: 8 */

// This API submodule handles the login and logout processes that are needed to access the admin pages.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the custom upload object which will be used as middleware in routes.

const upload = require("./../apiFunctions/multerUploads");

// Require the bcrypt module for hashing passwords and specify the number of saltrounds (mutations of the hashed password).

const bcrypt = require('bcrypt');
const saltRounds = 12;

// Require the custom query function from the database folder.

const query = require("./../database/query");

// Require the express-session middleware configuration from the config folder.

const session = require("./../config/session");

// Setup the express-session framework as middleware for the router object.

router.use(session);




// Handle the API calls to the session route.

router.route("/")


// Create a login session with a post request.

.post(upload().text, async (req, res) => {


  // Extract the inputted username and password from the data.

  const username = req.body.username;
  const password = req.body.password;

  // Query the database for the username and password hash.

  const result = await query("users");

    // Obtain the username and hash from the database.

    const loadedUsername = result[0].username;
    const hash = result[0].password;

    // Use bcrypt to compare the inputted password with the hash obtained from the database.
    // If they match, the comparison variable will automatically be set to true.

    bcrypt.compare(password, hash, function(err, comparison) {

      // If there is an error in the comparison, throw an error.

      if (err) throw err;

      // Check if the credentials in the database match those posted from the client-side.

      if (result[0].username === username && comparison === true) {

        // If yes, create a session with these credentials.

        req.session.loggedIn = true;

        // Send a server response, that will indicate a logged in status.

        res.send("logged in");

        // If the credentials are wrong, send a response indicating this fact.

      } else {
        res.send("wrong credentials");
      }
    });
})


// Handle the logout from the admin page with a delete request.

.delete((req, res) => {

  // Destroy the login session.

  req.session.destroy(function(err) {
    if (err) throw err;

    // Send a server response.

    res.send("OK!");
  });
});

// Export the router object to the main file of the module.

module.exports = router;
