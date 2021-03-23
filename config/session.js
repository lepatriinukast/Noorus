/* jshint esversion: 8 */

// Require the express session module.

const expressSession = require("express-session");

// Setup the express-session framework as middleware for the router object.
// The middleware will create a cookie whose lifespan lasts for a day.
// It also needs a secret variable (a password) to work properly and this is stored in the .env file.

const session = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
});

module.exports = session;
