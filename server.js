const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

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

// setup multer storage engine

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/img");
  },
  filename: function(req, file, callback) {
    cb(null, file.fieldname + path.extname(file.originalname));
  }
});

// initialize multer upload

var upload = multer({
  storage: storage
}).single("noorus0");

// ajax calls

// estonian routes

app.get("/", function(req, res) {
  var pageTitle = "Avaleht";
  var currentPage = "en";
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
    con.query("SELECT * FROM avalehtHupikaken", function(err, result) {
      if (err) throw err;
      var avalehtHupikaknaPealkiri = {
        est: result[0].est,
        en: result[0].en
      };
      var avalehtHupikakenData = [avalehtHupikaknaPealkiri];

      function AvalehtHupikaken(nameEst, nameEn, est, en) {
        this.nameEst = nameEst;
        this.nameEn = nameEn;
        this.est = est;
        this.en = en;
      }
      for (var i = 1; i < result.length; i++) {
        var varName = {
          est: "avalehtHupikaken" + i + "Est",
          en: "avalehtHupikaken" + i + "En",
        };
        var newAvalehtHupikaken = new AvalehtHupikaken(varName.est, varName.en, result[i].est, result[i].en);
        avalehtHupikakenData.push(newAvalehtHupikaken);
      }
      res.render("avaleht", {
        pageTitle: pageTitle,
        currentPage: currentPage,
        avalehtTekstidData: avalehtTekstidData,
        avalehtHupikakenData: avalehtHupikakenData
      });
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
    con.query("SELECT * FROM avalehtHupikaken", function(err, result) {
      if (err) throw err;
      var avalehtHupikaknaPealkiri = {
        est: result[0].est,
        en: result[0].en
      };
      var avalehtHupikakenData = [avalehtHupikaknaPealkiri];

      function AvalehtHupikaken(nameEst, nameEn, est, en) {
        this.nameEst = nameEst;
        this.nameEn = nameEn;
        this.est = est;
        this.en = en;
      }
      for (var i = 1; i < result.length; i++) {
        var varName = {
          est: "avalehtHupikaken" + i + "Est",
          en: "avalehtHupikaken" + i + "En",
        };
        var newAvalehtHupikaken = new AvalehtHupikaken(varName.est, varName.en, result[i].est, result[i].en);
        avalehtHupikakenData.push(newAvalehtHupikaken);
      }
      res.render("home", {
        pageTitle: pageTitle,
        currentPage: currentPage,
        avalehtTekstidData: avalehtTekstidData,
        avalehtHupikakenData: avalehtHupikakenData
      });
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
    con.query("SELECT * FROM avalehtHupikaken", function(err, result) {
      if (err) throw err;
      var avalehtHupikaknaPealkiri = {
        est: result[0].est,
        en: result[0].en
      };
      var avalehtHupikakenData = [avalehtHupikaknaPealkiri];

      function AvalehtHupikaken(nameEst, nameEn, est, en) {
        this.nameEst = nameEst;
        this.nameEn = nameEn;
        this.est = est;
        this.en = en;
      }
      for (var i = 1; i < result.length; i++) {
        var varName = {
          est: "avalehtHupikaken" + i + "Est",
          en: "avalehtHupikaken" + i + "En",
        };
        var newAvalehtHupikaken = new AvalehtHupikaken(varName.est, varName.en, result[i].est, result[i].en);
        avalehtHupikakenData.push(newAvalehtHupikaken);
      }
      res.render("admin_avaleht", {
        pageTitle: pageTitle,
        avalehtTekstidData: avalehtTekstidData,
        avalehtHupikakenData: avalehtHupikakenData
      });
    });
  });
});
// post routes

app.post("/admin/avaleht", function(req, res) {
  var formButton = req.body.formButton;

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
});

app.post('/upload', upload.single('avalehtTaustapilt'), function (req, res, next) {
  console.log(req.file);
  console.log(req.body);
});

// start server
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is now running on port 3000");
});
