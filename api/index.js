/* jshint esversion: 8 */

// This module exports all the API endpoints. They are imported here from submodules.

// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require all the submodules, where the API endpoints are located.

const session = require("./session");
const forms = require("./forms");
const home = require("./home");
const about = require("./about");
const members = require("./members");
const conductors = require("./conductors");
const history = require("./history");
const media = require("./media");
const sponsors = require("./sponsors");
const events = require("./events");
const contact = require("./contact");
const shop = require("./shop");
const order = require("./order");
const archive = require("./archive");

// Attach all those endpoints to the router object.

router.use("/session", session);
router.use("/forms", forms);
router.use("/home", home);
router.use("/about", about);
router.use("/members", members);
router.use("/conductors", conductors);
router.use("/history", history);
router.use("/media", media);
router.use("/sponsors", sponsors);
router.use("/events", events);
router.use("/contact", contact);
router.use("/shop", shop);
router.use("/order", order);
router.use("/archive", archive);

// Export the router to the server file.

module.exports = router;
