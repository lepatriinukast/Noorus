const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res) {

  res.render("kontakt");
} );

app.get("/avaleht", function(req, res) {

  var pageTitle = "Avaleht";
  res.render("avaleht", {pageTitle: pageTitle});
} );

app.get("/koorist", function(req, res) {

  var pageTitle = "Koorist";
  res.render("koorist", {pageTitle: pageTitle});
} );

app.get("/vastuvott", function(req, res) {

  var pageTitle = "Vastuvõtt";
  res.render("vastuvott", {pageTitle: pageTitle});
} );

app.get("/sundmused", function(req, res) {

  var pageTitle = "Sündmused";
  res.render("sundmused", {pageTitle: pageTitle});
} );

app.get("/kontakt", function(req, res) {

  var pageTitle = "Kontakt";
  res.render("kontakt", {pageTitle: pageTitle});
} );


app.listen(3000, function() {
  console.log("Server is now running on port 3000");
});
