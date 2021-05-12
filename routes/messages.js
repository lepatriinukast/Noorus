/* jshint esversion: 8 */

// This module exports a router which renders the message and login pages.


// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();


// Require the reqData custom module which will be used for getting the data displayed on the message and login pages.

const reqData = require("./../reqData");


// The login route.

router.get("/login", async (req, res) => {
  const data = await reqData("login");
  res.render("public/login", {
    data: data
  });
});


// Custom message page routes in Estonian.

router.get("/edu", async (req, res) => {
  const data = await reqData("success", "est");
  data.page = req.query.page;
  res.render("public/message", {
    data: data
  });
});

router.get("/torge", async (req, res) => {
  const data = await reqData("failure", "est");
  data.page = req.query.page;
  res.render("public/message", {
    data: data
  });
});


// Custom message page routes in English.

router.get("/en/success", async (req, res) => {
  const data = await reqData("success", "en");
  data.page = req.query.page;
  res.render("public/message", {
    data: data
  });
});

router.get("/en/failure", async (req, res) => {
  const data = await reqData("failure", "en");
  data.page = req.query.page;
  res.render("public/message", {
    data: data
  });
});


// Error page.

router.get("*", async (req, res) => {
  const data = await reqData("error");
  res.render("public/error", {
    data: data
  });
});

// Export the router.

module.exports = router;
