/* jshint esversion: 8 */

const express = require('express');
const router = express.Router();

const reqData = require("./../reqData");


// LOGIN ROUTE

router.get("/login", async (req, res) => {
  const data = await reqData("login");
  res.render("login", {
    data: data
  });
});


// MESSAGE PAGE ROUTES

router.get("/kontakt/edu", async (req, res) => {
  const data = await reqData("contact-success", "est");
  res.render("message", {
    data: data
  });
});

router.get("/contact/success", async (req, res) => {
  const data = await reqData("contact-success", "en");
  res.render("message", {
    data: data
  });
});

router.get("/kontakt/torge", async (req, res) => {
  const data = await reqData("contact-failure", "est");
  res.render("message", {
    data: data
  });
});

router.get("/contact/failure", async (req, res) => {
  const data = await reqData("contact-failure", "en");
  res.render("message", {
    data: data
  });
});

router.get("/telli/edu", async (req, res) => {
  const data = await reqData("order-success", "est");
  res.render("message", {
    data: data
  });
});

router.get("/order/success", async (req, res) => {
  const data = await reqData("order-success", "en");
  res.render("message", {
    data: data
  });
});

router.get("/telli/torge", async (req, res) => {
  const data = await reqData("order-failure", "est");
  res.render("message", {
    data: data
  });
});

router.get("/order/failure", async (req, res) => {
  const data = await reqData("order-failure", "en");
  res.render("message", {
    data: data
  });
});


// ERROR PAGE

router.get("*", async (req, res) => {
  const data = await reqData("error");
  res.render("error", {
    data: data
  });
});

module.exports = router;
