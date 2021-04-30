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

router.get("/edu", async (req, res) => {
  const data = await reqData("success", "est");
  data.page = req.query.page;
  res.render("message", {
    data: data
  });
});

router.get("/torge", async (req, res) => {
  const data = await reqData("failure", "est");
  data.page = req.query.page;
  res.render("message", {
    data: data
  });
});

router.get("/en/success", async (req, res) => {
  const data = await reqData("success", "en");
  data.page = req.query.page;
  res.render("message", {
    data: data
  });
});

router.get("/en/failure", async (req, res) => {
  const data = await reqData("failure", "en");
  data.page = req.query.page;
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
