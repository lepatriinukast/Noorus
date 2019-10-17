const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();



app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("avaleht");
});

app.get("/koorist", function(req, res) {
  res.render("koorist");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
