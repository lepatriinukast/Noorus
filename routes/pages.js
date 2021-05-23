/* jshint esversion: 8 */

// This module exports a router which renders the public pages.


// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();


// Require the reqData custom module which will be used for getting the data displayed on the public pages.

const reqData = require("./../reqData");


// Estonian routes

router.get("/", async (req, res) => {
  const data = await reqData("home", "est");
  res.render("public/home", {
    data: data
  });
});

router.get("/koorist", async (req, res) => {
  const data = await reqData("about", "est");
  res.render("public/about", {
    data: data
  });
});

router.get("/sundmused", async (req, res) => {
  const data = await reqData("events", "est");
  data.eventsContent = data.eventsContent.reverse();
  res.render("public/events", {
    data: data
  });
});

router.get("/kontakt", async (req, res) => {
  const data = await reqData("contact", "est");
  res.render("public/contact", {
    data: data
  });
});

router.get("/pood", async (req, res) => {
  const data = await reqData("shop", "est");
  data.pageInfo.pageType = "public shop";
  res.render("public/shop", {
    data: data
  });
});

router.get("/telli", async (req, res) => {
  const data = await reqData("order", "est");
  data.selected = req.query.selected;
  data.pageInfo.pageType = "public order";
  res.render("public/order", {
    data: data
  });
});


// English routes

router.get("/en", async (req, res) => {
  const data = await reqData("home", "en");
  res.render("public/home", {
    data: data
  });
});

router.get("/en/about", async (req, res) => {
  const data = await reqData("about", "en");
  res.render("public/about", {
    data: data
  });
});

router.get("/en/events", async (req, res) => {
  const data = await reqData("events", "en");
  data.eventsContent = data.eventsContent.reverse();
  res.render("public/events", {
    data: data
  });
});

router.get("/en/contact", async (req, res) => {
  const data = await reqData("contact", "en");
  res.render("public/contact", {
    data: data
  });
});

router.get("/en/shop", async (req, res) => {
  const data = await reqData("shop", "en");
  data.pageInfo.pageType = "public shop";
  res.render("public/shop", {
    data: data
  });
});

router.get("/en/order", async (req, res) => {
  const data = await reqData("order", "en");
  data.selected = req.query.selected;
  data.pageInfo.pageType = "public order";
  res.render("public/order", {
    data: data
  });
});

// Export the router.

module.exports = router;
