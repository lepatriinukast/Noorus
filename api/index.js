/* jshint esversion: 8 */

// This module exports all the API endpoints. They are imported here from submodules.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require all the submodules, where the API endpoints are located.

const session = require("./session");

// Attach all those endpoints to the router object.

router.use("/session", session);

// Export the router to the server file.

module.exports = router;
