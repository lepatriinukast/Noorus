/* jshint esversion: 8 */


// This is the entry point of the whole app.
// This file gets run on the server and all the functionality of the app can be traced back to this file.


// Call the config method of the object returned by the dotenv module.
// This will provide access to the usage of environmental variables stored in the .env file.

require('dotenv').config();


// Require the express module, which is the main framework for the back-end of this app.

const express = require("express");

// Require the ejs module which will serve as the view engine for this app.

const ejs = require("ejs");


// Setup the express framework.

const app = express();

// Setup ejs template engine and a "public" folder for static files.

app.set('view engine', 'ejs');
app.use(express.static("public"));


// Require the custom express routers, which are mini-apps that handle HTTPS-requests to different routes.

const api = require("./api");
const admin = require("./routes/admin");
const messages = require("./routes/messages");
const pages = require("./routes/pages");

// Setup those routers as middleware for the express framework.

app.use("/api", api);
app.use("/admin", admin);
app.use("/", pages);
app.use("/", messages);


// Start listening on the port specified in the .env file.
// During development use port 3000 instead.

const port = process.env.PORT||3000;

app.listen(port, () => {
  console.log("Server is now running");
});
