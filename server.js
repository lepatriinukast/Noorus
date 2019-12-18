const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require('mysql');

// setup express and body-parser

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// setup ejs

app.set('view engine', 'ejs');
app.use(express.static("public"));

// connect to database

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

// estonian routes

app.get("/", function(req, res) {
  var pageTitle = "Avaleht";
  var currentPage = "en";
  con.query("SELECT * FROM avalehtTekstid", function(err, result) {
    if (err) throw err;
    var avalehtData = {
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
      avalehtData: avalehtData
    });
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
  var currentPage = "";
  con.query("SELECT * FROM avalehtTekstid", function(err, result) {
    if (err) throw err;
    var avalehtData = {
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
      avalehtData: avalehtData
    });
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

// admin routes

app.get("/admin", function(req, res) {
  res.redirect("admin/avaleht");
});

app.get("/admin/avaleht", function(req, res) {
  var pageTitle = "admin/avaleht";
    con.query("SELECT * FROM avalehtTekstid", function(err, result) {
      if (err) throw err;
      var avalehtData = {
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
        avalehtData: avalehtData
      });
    });
});

// post routes

app.post("/admin/avaleht", function(req, res) {
  var formInstance = req.body.formInstance;

  if (formInstance === "avalehtPildid") {
    console.log(formInstance);
  } else if (formInstance === "avalehtTekstid") {
    console.log(formInstance);
  var names = ["suurPealkiri", "jatkuPealkiri", "sektsiooniPealkiri1", "sektsiooniTekst1", "sektsiooniPealkiri2", "sektsiooniTekst2"];
  for (var i = 0; i < names.length; i++) {
    var nameProperty = names[i];
    var estProperty = eval("req.body." + names[i] + "Est");
    var enProperty = eval("req.body." + names[i] + "En");
    var sql = "UPDATE avalehtTekstid SET est = '" + estProperty + "', en = '" + enProperty + "' WHERE name = '" + nameProperty + "'";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Database updated!");
    });
  }
} else if (formInstance === "avalehtHupikaken") {
  console.log(formInstance);
} else {
  console.log(formInstance);
}
  res.redirect("/");
});

// start server

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is now running on port 3000");
});
