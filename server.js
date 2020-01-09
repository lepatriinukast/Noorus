// require node modules

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

// setup express and body-parser for creating routes and getting data from the client-side

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// setup ejs template engine and a "public" folder for static files

app.set('view engine', 'ejs');
app.use(express.static("public"));

// connect to mySQL database

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "segakoorNoorus"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// setup multer storage engine for picture uploads

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// ESTONIAN ROUTES

app.get("/", function(req, res) {

  var pageTitle = "Avaleht";
  var currentPage = "en";

  con.query("SELECT * FROM avalehtPildid", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM avalehtPildid", function query(err, result) {
      if (err) throw err;
      var avalehtPildidData = {
        avalehtLogo: {
          url: result[1].url,
          filename: result[1].url.slice(5)
        },
        avalehtTaustapilt: {
          url: result[2].url,
          filename: result[2].url.slice(5)
        }
      };
      con.query("SELECT * FROM avalehtTekstid", function(err, result) {
        if (err) throw err;
        var avalehtTekstidData = {
          suurPealkiri: {
            est: result[0].est,
            en: result[0].en
          },
          jatkuPealkiri: {
            est: result[1].est,
            en: result[1].en
          },
          sektsiooniPealkiri1: {
            est: result[2].est,
            en: result[2].en
          },
          sektsiooniTekst1: {
            est: result[3].est,
            en: result[3].en
          },
          sektsiooniPealkiri2: {
            est: result[4].est,
            en: result[4].en
          },
          sektsiooniTekst2: {
            est: result[5].est,
            en: result[5].en
          }
        };
        res.render("avaleht", {
          pageTitle: pageTitle,
          currentPage: currentPage,
          paiseikoon: paiseikoon,
          avalehtTekstidData: avalehtTekstidData,
          avalehtPildidData: avalehtPildidData
        });
      });
    });
  });
});

app.get("/koorist", function(req, res) {
  var pageTitle = "Koorist";
  var currentPage = "en/about-us";
  res.render("koorist", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

app.get("/vastuvott", function(req, res) {
  var pageTitle = "Vastuvõtt";
  var currentPage = "en/join-us";
  res.render("vastuvott", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

app.get("/sundmused", function(req, res) {
  var pageTitle = "Sündmused";
  var currentPage = "en/events";
  res.render("sundmused", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

app.get("/kontakt", function(req, res) {
  var pageTitle = "Kontakt";
  var currentPage = "en/contact";
  res.render("kontakt", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

// ENGLISH ROUTES

app.get("/en", function(req, res) {
  var pageTitle = "Home";
  var currentPage = "";
  con.query("SELECT * FROM avalehtPildid", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM avalehtPildid", function query(err, result) {
      if (err) throw err;
      var avalehtPildidData = {
        avalehtLogo: {
          url: result[1].url,
          filename: result[1].url.slice(5)
        },
        avalehtTaustapilt: {
          url: result[2].url,
          filename: result[2].url.slice(5)
        }
      };
      con.query("SELECT * FROM avalehtTekstid", function(err, result) {
        if (err) throw err;
        var avalehtTekstidData = {
          suurPealkiri: {
            est: result[0].est,
            en: result[0].en
          },
          jatkuPealkiri: {
            est: result[1].est,
            en: result[1].en
          },
          sektsiooniPealkiri1: {
            est: result[2].est,
            en: result[2].en
          },
          sektsiooniTekst1: {
            est: result[3].est,
            en: result[3].en
          },
          sektsiooniPealkiri2: {
            est: result[4].est,
            en: result[4].en
          },
          sektsiooniTekst2: {
            est: result[5].est,
            en: result[5].en
          }
        };
        res.render("home", {
          pageTitle: pageTitle,
          currentPage: currentPage,
          paiseikoon: paiseikoon,
          avalehtTekstidData: avalehtTekstidData,
          avalehtPildidData: avalehtPildidData
        });
      });
    });
  });
});

app.get("/en/about-us", function(req, res) {
  var pageTitle = "About us";
  var currentPage = "koorist";
  res.render("about-us", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

app.get("/en/join-us", function(req, res) {
  var pageTitle = "Join us";
  var currentPage = "vastuvott";
  res.render("join-us", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

app.get("/en/events", function(req, res) {
  var pageTitle = "Events";
  var currentPage = "sundmused";
  res.render("events", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

app.get("/en/contact", function(req, res) {
  var pageTitle = "Contact";
  var currentPage = "kontakt";
  res.render("contact", {
    pageTitle: pageTitle,
    currentPage: currentPage,
    paiseikoon: paiseikoon
  });
});

// admin routes

app.get("/admin", function(req, res) {
  res.redirect("admin/avaleht");
});

app.get("/admin/avaleht", function(req, res) {
  var pageTitle = "admin/avaleht";
  con.query("SELECT * FROM avalehtPildid", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM avalehtPildid", function query(err, result) {
      if (err) throw err;
      var avalehtPildidData = {
        avalehtLogo: {
          url: result[1].url,
          filename: result[1].url.slice(5)
        },
        avalehtTaustapilt: {
          url: result[2].url,
          filename: result[2].url.slice(5)
        }
      };
      con.query("SELECT * FROM avalehtTekstid", function(err, result) {
        if (err) throw err;
        var avalehtTekstidData = {
          suurPealkiri: {
            est: result[0].est,
            en: result[0].en
          },
          jatkuPealkiri: {
            est: result[1].est,
            en: result[1].en
          },
          sektsiooniPealkiri1: {
            est: result[2].est,
            en: result[2].en
          },
          sektsiooniTekst1: {
            est: result[3].est,
            en: result[3].en
          },
          sektsiooniPealkiri2: {
            est: result[4].est,
            en: result[4].en
          },
          sektsiooniTekst2: {
            est: result[5].est,
            en: result[5].en
          }
        };
        res.render("admin_avaleht", {
          pageTitle: pageTitle,
          paiseikoon: paiseikoon,
          avalehtTekstidData: avalehtTekstidData,
          avalehtPildidData: avalehtPildidData
        });
      });
    });
  });
});

app.get("/admin/koorist", function(req, res) {
  var pageTitle = "admin/koorist";
  con.query("SELECT * FROM avalehtPildid", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    res.render("admin_koorist", {
      pageTitle: pageTitle,
      paiseikoon: paiseikoon
    });
  });
});


// POST ROUTES FOR HANDLING DATA POSTED FROM THE CLIENT-SIDE

// handle the data that is posted to /admin/avaleht

app.post("/admin/avaleht", function(req, res) {

  // convert the JSON data received from the client-side into js objects

  var avalehtTekstidData = JSON.parse(req.body.data);

  // array of entry names that will be updated in the relevant database

  var names = ["suurPealkiri", "jatkuPealkiri", "sektsiooniPealkiri1", "sektsiooniTekst1", "sektsiooniPealkiri2", "sektsiooniTekst2"];

  // the code below will run once for each entry in the array
  //
  for (var i = 0; i < names.length; i++) {

    // create a variable for each entry name in the array

    var nameProperty = names[i];

    // for each name in the array create an "estString" and "enString", which are strings that will contain the code needed for the next step

    var estString = "avalehtTekstidData." + names[i] + ".est";
    var enString = "avalehtTekstidData." + names[i] + ".en";

    // run those two strings as js code which gets the necessary data from the client-side
    // for updating the values of "est" and "en" for each entry in the database and

    var estProperty = eval(estString);
    var enProperty = eval(enString);

    // create the sql code to update each entry in the database using the data created above

    var sql = "UPDATE avalehtTekstid SET est = '" + estProperty + "', en = '" + enProperty + "' WHERE name = '" + nameProperty + "'";

    // run the sql code with node.js

    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  }

  // reload the page

  res.redirect("/admin/avaleht");
});

app.post("/upload/avaleht", function(req, res) {
  var names = ["paiseikoon", "avalehtLogo", "avalehtTaustapilt"];
  var upload = multer({
    storage: storage
  }).fields([{
      name: "paiseikoon",
      maxCount: 1
    },
    {
      name: "avalehtLogo",
      maxCount: 1
    },
    {
      name: "avalehtTaustapilt",
      maxCount: 1
    }
  ]);
  upload(req, res, function(err) {
    if (err) throw err;
    var files = [req.files.paiseikoon, req.files.avalehtLogo, req.files.avalehtTaustapilt];
    for (var i = 0; i < files.length; i++) {
      if (files[i] !== undefined) {
        var urlProperty = "/img/" + files[i][0].originalname;
        var nameProperty = files[i][0].fieldname;
        var sql = "UPDATE avalehtPildid SET url = '" + urlProperty + "' WHERE name = '" + nameProperty + "'";
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("DB updated!");
        });
      }
    }
  });
  res.redirect("/admin/avaleht");
});

app.post("/upload/koorist", function(req, res) {
  var array = [];
  var avapilt = {
    name: "avapilt",
    maxCount: 1
  }
  array.push(avapilt);

  var upload = multer({
    storage: storage
  }).fields(array);
  upload(req, res, function(err) {
    if (err) throw err;
        var sql = "UPDATE kooristPildid SET url = '" + urlProperty + "' WHERE name = '"+nameProperty""'";
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("DB updated!");
        });
      }
    }
  });
  res.redirect("/admin/avaleht");
});








// start server

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is now running on port 3000");
});
