const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

// estonian routes

app.get("/", function(req, res) {
  var pageTitle = "Avaleht";
  var currentPage = "en";
  res.render("avaleht", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/koorist", function(req, res) {
  var pageTitle = "Koorist";
  var currentPage = "en/about-us";
  res.render("koorist", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/vastuvott", function(req, res) {
  var pageTitle = "Vastuvõtt";
  var currentPage = "en/join-us";
  res.render("vastuvott", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/sundmused", function(req, res) {
  var pageTitle = "Sündmused";
  var currentPage = "en/events";
  res.render("sundmused", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/kontakt", function(req, res) {
  var pageTitle = "Kontakt";
  var currentPage = "en/contact";
  res.render("kontakt", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

// english routes

app.get("/en", function(req, res) {
  var pageTitle = "Home";
  var currentPage = "/";
  res.render("home", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/en/about-us", function(req, res) {
  var pageTitle = "About us";
  var currentPage = "koorist";
  res.render("about-us", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/en/join-us", function(req, res) {
  var pageTitle = "Join us";
  var currentPage = "vastuvott";
  res.render("join-us", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/en/events", function(req, res) {
  var pageTitle = "Events";
  var currentPage = "sundmused";
  res.render("events", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.get("/en/contact", function(req, res) {
  var pageTitle = "Contact";
  var currentPage = "kontakt";
  res.render("contact", {
    pageTitle: pageTitle,
    currentPage: currentPage
  });
});

app.listen(3000, function() {
  console.log("Server is now running on port 3000");
});
