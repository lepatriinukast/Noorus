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

  con.query("SELECT * FROM avalehtPildid ORDER BY id", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM avalehtPildid ORDER BY id", function query(err, result) {
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
      con.query("SELECT * FROM avalehtTekstid ORDER BY id", function(err, result) {
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
        con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
          if (err) throw err;
          var pealkirjadData = [];
          for (var i = 0; i < result.length; i++) {
            var pealkiri = {
              est: result[i].est,
              en: result[i].en
            };
            pealkirjadData.push(pealkiri);
          }
          res.render("avaleht", {
            pageTitle: pageTitle,
            currentPage: currentPage,
            paiseikoon: paiseikoon,
            avalehtTekstidData: avalehtTekstidData,
            avalehtPildidData: avalehtPildidData,
            pealkirjadData: pealkirjadData
          });
        });
      });
    });
  });
});

app.get("/koorist", function(req, res) {
  var pageTitle = "Koorist";
  var currentPage = "en/about-us";
  con.query("SELECT * FROM avalehtPildid ORDER BY id", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM sissejuhatusPildid ORDER BY id", function(err, result) {
      if (err) throw err;
      var avapilt = {
        url: result[0].url,
        filename: result[0].url.slice(5)
      };
      con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
        if (err) throw err;
        var pealkirjadData = [];
        for (var i = 0; i < result.length; i++) {
          var pealkiri = {
            est: result[i].est,
            en: result[i].en
          };
          pealkirjadData.push(pealkiri);
        }

        con.query("SELECT * FROM sissejuhatusTekstid ORDER BY id", function(err, result) {
          if (err) throw err;
          var sissejuhatusData = {
            pealkiri: {
              est: result[0].est,
              en: result[0].en
            },
            loigud: []
          };
          for (var i = 1; i < result.length; i++) {
            var loik = {
              est: result[i].est,
              en: result[i].en
            };
            sissejuhatusData.loigud.push(loik);
          }
          con.query("SELECT * FROM liikmed ORDER BY id", function(err, result) {
            if (err) throw err;
            var liikmedData = {
              haaleruhmaNimed: [{
                est: result[0].est,
                en: result[0].en
              }, {
                est: result[1].est,
                en: result[1].en
              }, {
                est: result[2].est,
                en: result[2].en
              }, {
                est: result[3].est,
                en: result[3].en
              }],
              haaleruhmaTutvustused: [{
                est: result[4].est,
                en: result[4].en
              }, {
                est: result[5].est,
                en: result[5].en
              }, {
                est: result[6].est,
                en: result[6].en
              }, {
                est: result[7].est,
                en: result[7].en
              }],
              lauljadPealkiri: {
                est: result[8].est,
                en: result[8].en
              },
              sopranid: result[9].est,
              aldid: result[10].est,
              tenorid: result[11].est,
              bassid: result[12].est,
              vilistlastePealkiri: {
                est: result[13].est,
                en: result[13].en
              },
              vilistlasteNimekiri: {
                est: result[14].est,
                en: result[14].en
              },
              loigud: []
            };
            for (var i = 15; i < result.length; i++) {
              var loik = {
                name: result[i].name,
                est: result[i].est,
                en: result[i].en,
              };
              liikmedData.loigud.push(loik);
            }
            res.render("koorist", {
              pageTitle: pageTitle,
              currentPage: currentPage,
              paiseikoon: paiseikoon,
              avapilt: avapilt,
              pealkirjadData: pealkirjadData,
              sissejuhatusData: sissejuhatusData,
              liikmedData: liikmedData
            });
          });
        });
      });
    });
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
  con.query("SELECT * FROM avalehtPildid ORDER BY id", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM avalehtPildid ORDER BY id", function query(err, result) {
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
      con.query("SELECT * FROM avalehtTekstid ORDER BY id", function(err, result) {
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
        con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
          if (err) throw err;
          var pealkirjadData = [];
          for (var i = 0; i < result.length; i++) {
            var pealkiri = {
              est: result[i].est,
              en: result[i].en
            };
            pealkirjadData.push(pealkiri);
          }
          res.render("home", {
            pageTitle: pageTitle,
            currentPage: currentPage,
            paiseikoon: paiseikoon,
            avalehtTekstidData: avalehtTekstidData,
            avalehtPildidData: avalehtPildidData,
            pealkirjadData: pealkirjadData
          });
        });
      });
    });
  });
});

app.get("/en/about-us", function(req, res) {
  var pageTitle = "About us";
  var currentPage = "koorist";
  con.query("SELECT * FROM avalehtPildid ORDER BY id", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
      if (err) throw err;
      var pealkirjadData = [];
      for (var i = 0; i < result.length; i++) {
        var pealkiri = {
          est: result[i].est,
          en: result[i].en
        };
        pealkirjadData.push(pealkiri);
      }
      con.query("SELECT * FROM sissejuhatusPildid ORDER BY id", function(err, result) {
        if (err) throw err;
        var avapilt = {
          url: result[0].url,
          filename: result[0].url.slice(5)
        };
        con.query("SELECT * FROM sissejuhatusTekstid ORDER BY id", function(err, result) {
          var sissejuhatusData = {
            pealkiri: {
              est: result[0].est,
              en: result[0].en
            },
            loigud: []
          };
          for (var i = 1; i < result.length; i++) {
            var loik = {
              est: result[i].est,
              en: result[i].en
            };
            sissejuhatusData.loigud.push(loik);
          }
          con.query("SELECT * FROM liikmed ORDER BY id", function(err, result) {
            if (err) throw err;
            var liikmedData = {
              haaleruhmaNimed: [{
                est: result[0].est,
                en: result[0].en
              }, {
                est: result[1].est,
                en: result[1].en
              }, {
                est: result[2].est,
                en: result[2].en
              }, {
                est: result[3].est,
                en: result[3].en
              }],
              haaleruhmaTutvustused: [{
                est: result[4].est,
                en: result[4].en
              }, {
                est: result[5].est,
                en: result[5].en
              }, {
                est: result[6].est,
                en: result[6].en
              }, {
                est: result[7].est,
                en: result[7].en
              }],
              lauljadPealkiri: {
                est: result[8].est,
                en: result[8].en
              },
              sopranid: result[9].est,
              aldid: result[10].est,
              tenorid: result[11].est,
              bassid: result[12].est,
              vilistlastePealkiri: {
                est: result[13].est,
                en: result[13].en
              },
              vilistlasteNimekiri: {
                est: result[14].est,
                en: result[14].en
              },
              loigud: []
            };
            for (var i = 15; i < result.length; i++) {
              var loik = {
                name: result[i].name,
                est: result[i].est,
                en: result[i].en,
              };
              liikmedData.loigud.push(loik);
            }
            res.render("about-us", {
              pageTitle: pageTitle,
              currentPage: currentPage,
              paiseikoon: paiseikoon,
              avapilt: avapilt,
              pealkirjadData: pealkirjadData,
              sissejuhatusData: sissejuhatusData,
              liikmedData: liikmedData
            });
          });
        });
      });
    });
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
  var routeName = "/";
  con.query("SELECT * FROM avalehtPildid ORDER BY id", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM avalehtPildid ORDER BY id", function query(err, result) {
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
      con.query("SELECT * FROM avalehtTekstid ORDER BY id", function(err, result) {
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
          routeName: routeName,
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
  var routeName = "/koorist";
  con.query("SELECT * FROM avalehtPildid ORDER BY id", function(err, result) {
    if (err) throw err;
    var paiseikoon = {
      url: result[0].url,
      filename: result[0].url.slice(5)
    };
    con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
      if (err) throw err;
      var pealkirjadData = [];
      for (var i = 0; i < result.length; i++) {
        var pealkiri = {
          est: result[i].est,
          en: result[i].en
        };
        pealkirjadData.push(pealkiri);
      }
      con.query("SELECT * FROM sissejuhatusPildid ORDER BY id", function(err, result) {
        if (err) throw err;
        var avapilt = {
          url: result[0].url,
          filename: result[0].url.slice(5)
        };
        con.query("SELECT * FROM sissejuhatusTekstid ORDER BY id", function(err, result) {
          if (err) throw err;
          var sissejuhatusData = {
            pealkiri: {
              est: result[0].est,
              en: result[0].en
            },
            loigud: []
          };
          for (var i = 1; i < result.length; i++) {
            var loik = {
              name: result[i].name,
              est: result[i].est,
              en: result[i].en
            };
            sissejuhatusData.loigud.push(loik);
          }
          con.query("SELECT * FROM liikmed ORDER BY id", function(err, result) {
            if (err) throw err;
            var liikmedData = {
              haaleruhmaNimed: [{
                est: result[0].est,
                en: result[0].en
              }, {
                est: result[1].est,
                en: result[1].en
              }, {
                est: result[2].est,
                en: result[2].en
              }, {
                est: result[3].est,
                en: result[3].en
              }],
              haaleruhmaTutvustused: [{
                est: result[4].est,
                en: result[4].en
              }, {
                est: result[5].est,
                en: result[5].en
              }, {
                est: result[6].est,
                en: result[6].en
              }, {
                est: result[7].est,
                en: result[7].en
              }],
              lauljadPealkiri: {
                est: result[8].est,
                en: result[8].en
              },
              sopranid: result[9].est,
              aldid: result[10].est,
              tenorid: result[11].est,
              bassid: result[12].est,
              vilistlastePealkiri: {
                est: result[13].est,
                en: result[13].en
              },
              vilistlasteNimekiri: {
                est: result[14].est,
                en: result[14].en
              },
              loigud: []
            };
            for (var i = 15; i < result.length; i++) {
              var loik = {
                name: result[i].name,
                est: result[i].est,
                en: result[i].en,
              };
              liikmedData.loigud.push(loik);
            }

            // return tables from the database that contain the string "dirigendid", but not "pildid",
            // in order to get the dynamically created "dirigendid" tables as an array

            var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'segakoorNoorus' ORDER by table_name";
            con.query(sql, function(err, result) {
              var tableNames = [];
              for (var i = 0; i < result.length; i++) {
                var tableName = (result[i].table_name);
                if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
                  tableNames.push(tableName);
                }
              }

              // the tables have a timestamp in their name- sort the array in ascending order

              var sortedTableNames = tableNames.sort(function(a, b) {
                return a - b;
              });

              var dirigendidData = [];

              for (var a = 0; a < sortedTableNames.length; a++) {
                var nameProperty = sortedTableNames[a];

                con.query("SELECT * FROM " + nameProperty + " ORDER by id", function(err, result) {
                  if (err) throw err;
                  var dirigent = {
                    nimi: result[0].est,
                    loigud: []
                  };
                  for (var b = 1; b < result.length; b++) {
                    var loik = {
                      est: result[b].est,
                      en: result[b].en
                    };
                    dirigent.loigud.push(loik);
                  }
                  dirigendidData.push(dirigent);
                });
              }
              con.query("SELECT * FROM dirigendidPildid ORDER by id", function(err, result) {
                if (err) throw err;
                var portreed = [];
                for (var i = 0; i < result.length; i++) {
                  var portree = {
                    url: result[i].url,
                    filename: result[i].url.slice(5)
                  };
                  portreed.push(portree);
                  console.log(portreed);
                }
                res.render("admin_koorist", {
                  pageTitle: pageTitle,
                  routeName: routeName,
                  paiseikoon: paiseikoon,
                  avapilt: avapilt,
                  pealkirjadData: pealkirjadData,
                  sissejuhatusData: sissejuhatusData,
                  liikmedData: liikmedData,
                  portreed: portreed,
                  dirigendidData: dirigendidData
                });
              });
            });
          });
        });
      });
    });
  });
});

// POST ROUTES FOR HANDLING DATA POSTED FROM THE CLIENT-SIDE


// update the images on the "avaleht" page


app.post("/upload/avaleht/pildid", function(req, res) {

  // setup the upload function using the module "multer, also specifying the storage engine and the names of the file inputs"

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

  // initialize the upload

  upload(req, res, function(err) {
    if (err) throw err;

    // create an array of the values of all the file inputs on the form

    var files = [req.files.paiseikoon, req.files.avalehtLogo, req.files.avalehtTaustapilt];

    // loop through the array

    for (var i = 0; i < files.length; i++) {

      // for each file, check if it is specified and then setup the database update

      if (files[i] !== undefined) {

        // create variables for each file's filename and also for the name by which it will be referred to in the database

        var urlProperty = "/img/" + files[i][0].originalname;
        var nameProperty = files[i][0].fieldname;

        // store the urlProperty in a variable in order to pass it into the sql function

        var value = [urlProperty];

        // create the sql text for updating the database (question mark will be replaced by the "value" variable created above)

        var sql = "UPDATE avalehtPildid SET url = ? WHERE name = '" + nameProperty + "'";

        // update the database using the sql text created above

        con.query(sql, value, function(err, result) {
          if (err) throw err;
        });
      }
    }
  });

  // reload the page

  res.redirect("/admin/avaleht");
});


// update the texts on the "avaleht" page


app.post("/upload/avaleht/tekstid", function(req, res) {

  // convert the JSON data received from the client-side into js objects

  var avalehtTekstidData = JSON.parse(req.body.data);

  // array of entry names that will be updated in the relevant database

  var names = ["suurPealkiri", "jatkuPealkiri", "sektsiooniPealkiri1", "sektsiooniTekst1", "sektsiooniPealkiri2", "sektsiooniTekst2"];

  // the code below will run once for each entry in the array
  //
  for (var i = 0; i < names.length; i++) {

    // create a variable for each entry name in the array

    var nameProperty = names[i];

    // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)

    var estProperty = avalehtTekstidData[names[i]].est;
    var enProperty = avalehtTekstidData[names[i]].en;

    // create a variable for passing the retrieved information to the sql text

    var values = [estProperty, enProperty];

    // create the sql code to update each entry in the database using the data created above (question marks will be replaced by the values in the above variable)

    var sql = "UPDATE avalehtTekstid SET est = ?, en = ? WHERE name = '" + nameProperty + "'";

    // run the sql code

    con.query(sql, values, function(err, result) {
      if (err) throw err;
    });
  }

  // reload the page

  res.redirect("/admin/avaleht");
});


// update the headings on the "koorist" page and on the navigation dropdown menus


app.post("/upload/pealkirjad", function(req, res) {

  // convert the JSON data received from the client-side into js objects

  var pealkirjadData = JSON.parse(req.body.data);

  // array of name properties for the database entries

  var names = ["pealkiri1", "pealkiri2", "pealkiri3", "pealkiri4", "pealkiri5", "pealkiri6"];


  // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)

  for (var i = 0; i < names.length; i++) {

    var estProperty = pealkirjadData[i].est;
    var enProperty = pealkirjadData[i].en;
    var nameProperty = names[i];

    // create a variable for passing the retrieved information to the sql text

    var values = [estProperty, enProperty, nameProperty];

    // create the sql code to update each entry in the database using the data created above
    // (question marks will be replaced by the values in the above variable)

    var sql = "UPDATE pealkirjad SET est = ?, en = ? WHERE name = ?";

    // run the sql code

    con.query(sql, values, function(err, result) {
      if (err) throw err;
    });

  }


  // reload the page

  res.redirect("/admin/koorist");
});


// update the "sissejuhatus" entries on the "koorist" page


app.post("/upload/sissejuhatus", function(req, res) {

  // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files

  var upload = multer({
    storage: storage
  }).single("avapilt");

  // initialize the upload

  upload(req, res, function(err) {
    if (err) throw err;

    // if there is a file to be uploaded, update the database as follows:

    if (req.file !== undefined) {

      // get the original filename of the uploaded file and store it in a variable

      var urlProperty = "/img/" + req.file.originalname;

      // create a variable for passing the retrieved value into the sql function

      var valuePilt = [urlProperty];

      // create the sql text for updating the database, using the value stored in "urlProperty"

      var sqlPilt = "UPDATE sissejuhatusPildid SET url = ? WHERE name = 'avapilt'";

      // update the database using the sql text

      con.query(sqlPilt, valuePilt, function(err, result) {
        if (err) throw err;
      });
    }

    // retrieve the values of the text inputs for "Pealkiri" and store them in variables

    var estPropertySissejuhatusPealkiri = req.body.sissejuhatusPealkiriEst;
    var enPropertySissejuhatusPealkiri = req.body.sissejuhatusPealkiriEn;

    // create a values variable for the sql text

    var valuesSissejuhatusPealkiri = [estPropertySissejuhatusPealkiri, enPropertySissejuhatusPealkiri];

    // create the sql text where question marks will be replaced by values in the above variable

    var sqlSissejuhatusPealkiri = "UPDATE sissejuhatusTekstid SET est = ?, en =  ? WHERE name = 'pealkiri'";

    // update the database using the sql text and passing in the "valuesPealkiri" variable

    con.query(sqlSissejuhatusPealkiri, valuesSissejuhatusPealkiri, function(err, result) {
      if (err) throw err;
    });

    // get the input names from the submitted data as an array (They have been sent to the server as object keys)

    var keys = Object.keys(req.body);

    // Get the index of the last element in the keys array

    var index = keys.length - 1;

    // select the last input name in the array and get its last character (which is a number) and also convert it to number data type

    var idNumber = Number(keys[index].slice(18));

    // create empty arrays that will store the data needed for the sql text

    var nameProperties = [];
    var estPropertyNames = [];
    var enPropertyNames = [];

    // query the database for the "loik" entries

    con.query("SELECT * FROM sissejuhatusTekstid", function(err, result) {

      // the "loik" entries start from result[1]- retrieve all those and push their name properties into the empty array above

      for (var i = 1; i <= idNumber; i++) {
        var nameProperty = result[i].name;
        nameProperties.push(nameProperty);
      }
      // the "est" and "en" properties are stored in the form data object as key-value pairs-
      // first we need to get the number of "loik"-related keys, which is all of them except the first two

      var loikKeysLength = keys.length - 2;

      // There are equal amount of "loikEn" and "loikEst" keys (half the number of total "loik" keys)- let's choose to get the number of "loikEst" keys

      var loikEstKeysLength = loikKeysLength / 2;

      // get the key names for all "loik"-related data (these are always "sissejuhatusLoik" + "En" or "Est" + index number)

      for (var a = 0; a < loikEstKeysLength; a++) {

        // start counting from 1 not 0;

        var indexNumber = a + 1;

        // get the key names

        var estPropertyName = "sissejuhatusLoikEst" + indexNumber;
        var enPropertyName = "sissejuhatusLoikEn" + indexNumber;

        // push those key names into the empty arrays above

        estPropertyNames.push(estPropertyName);
        enPropertyNames.push(enPropertyName);
      }

      // now update all the "loik" entries in the database

      for (var b = 0; b < nameProperties.length; b++) {

        // using the retrieved key names, get the necessary data for each of those keys

        var currentNameValue = nameProperties[b];
        var currentEstValue = req.body[estPropertyNames[b]];
        var currentEnValue = req.body[enPropertyNames[b]];

        // create the sql text

        var sqlSissejuhatusLoik = "UPDATE sissejuhatusTekstid SET est = ?, en =  ? WHERE name = ?";

        // create the values which will replace the question marks in the sql text

        var valuesSissejuhatusLoik = [currentEstValue, currentEnValue, currentNameValue];

        // update the database

        con.query(sqlSissejuhatusLoik, valuesSissejuhatusLoik, function(err, result) {
          if (err) throw err;
        });
      }
    });

    // reload the page

    res.redirect("/admin/koorist");
  });
});


// upload a new "loik" element to the "sissejuhatus" section on the "koorist" page


app.post("/upload/sissejuhatus/new", function(req, res) {

  // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp

  var nameProperty = "loik" + Date.now();
  var estProperty = "";
  var enProperty = "";

  // create the sql text with the variables created above

  var sql = "INSERT INTO sissejuhatusTekstid (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";

  // insert the new entry into the database

  con.query(sql, function(err, result) {
    if (err) throw err;
  });

  // reload the page

  res.redirect("/admin/koorist");
});


// delete a "loik" element from the "sissejuhatus" part of the "koorist" page


app.post("/upload/sissejuhatus/delete", function(req, res) {

  // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element

  var deleteLoikData = JSON.parse(req.body.data);

  // query the database for all the "loik" entries

  con.query("SELECT * FROM sissejuhatusTekstid ORDER by id", function(err, result) {

    // to find the right result, we need to know its index number-
    // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)

    var currentIndex = deleteLoikData.idNumber - 1;

    // the "loik" database entries start from the second result and onwards, thus add 1 to the current index number

    var realIndex = currentIndex + 1;

    // get the database entry of the deleted element

    var currentResult = result[realIndex];

    // get the name property of the database entry

    var nameProperty = currentResult.name;

    // create the sql text

    var sql = "DELETE FROM sissejuhatusTekstid WHERE name = ?";

    // replace the question mark in the sql text by the name property created above

    var value = nameProperty;

    // delete the entry from the database

    con.query(sql, value, function(err, result) {
      if (err) throw err;
    });
  });

  // reload the page

  res.redirect("/admin/koorist");
});


// update the "liikmed" section on the "koorist" page


app.post("/upload/liikmed", function(req, res) {

  // convert the JSON data received from the client-side into js objects

  var liikmedData = JSON.parse(req.body.data);

  // array of name properties for the predetermined database entries called "haaleruhmaNimi"

  var names1 = ["haaleruhmaNimi1", "haaleruhmaNimi2", "haaleruhmaNimi3", "haaleruhmaNimi4"];

  // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)

  for (var i = 0; i < names1.length; i++) {

    var estProperty1 = liikmedData.haaleruhmaNimed[i].est;
    var enProperty1 = liikmedData.haaleruhmaNimed[i].en;
    var nameProperty1 = names1[i];

    // create a variable for passing the retrieved information to the sql text

    var values1 = [estProperty1, enProperty1, nameProperty1];

    // create the sql code to update each entry in the database using the data created above
    // (question marks will be replaced by the values in the above variable)

    var sql1 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";

    // run the sql code

    con.query(sql1, values1, function(err, result) {
      if (err) throw err;
    });
  }

  // array of name properties for the predetermined database entries called "haaleruhmaTutvustus"

  var names2 = ["haaleruhmaTutvustus1", "haaleruhmaTutvustus2", "haaleruhmaTutvustus3", "haaleruhmaTutvustus4"];

  // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)

  for (var a = 0; a < names2.length; a++) {

    var estProperty2 = liikmedData.haaleruhmaTutvustused[a].est;
    var enProperty2 = liikmedData.haaleruhmaTutvustused[a].en;
    var nameProperty2 = names2[a];

    // create a variable for passing the retrieved information to the sql text

    var values2 = [estProperty2, enProperty2, nameProperty2];

    // create the sql code to update each entry in the database using the data created above
    // (question marks will be replaced by the values in the above variable)

    var sql2 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";

    // run the sql code

    con.query(sql2, values2, function(err, result) {
      if (err) throw err;
    });
  }

  // array of name properties for the predetermined database entries that have only "est" values ("en" value is never updated)

  var names3 = ["sopranid", "aldid", "tenorid", "bassid"];

  // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)

  for (var b = 0; b < names3.length; b++) {

    var estProperty3 = liikmedData[names3[b]];
    var nameProperty3 = names3[b];

    // create a variable for passing the retrieved information to the sql text

    var values3 = [estProperty3, nameProperty3];

    // create the sql code to update each entry in the database using the data created above
    // (question marks will be replaced by the values in the above variable)

    var sql3 = "UPDATE liikmed SET est = ? WHERE name = ?";

    // run the sql code

    con.query(sql3, values3, function(err, result) {
      if (err) throw err;
    });
  }

  // array of name properties for the predetermined database entries that have both "est" and "en" values

  var names4 = ["lauljadPealkiri", "vilistlastePealkiri", "vilistlasteNimekiri"];

  // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)

  for (var c = 0; c < names4.length; c++) {

    var estProperty4 = liikmedData[names4[c]].est;
    var enProperty4 = liikmedData[names4[c]].en;
    var nameProperty4 = names4[c];

    // create a variable for passing the retrieved information to the sql text

    var values4 = [estProperty4, enProperty4, nameProperty4];

    // create the sql code to update each entry in the database using the data created above
    // (question marks will be replaced by the values in the above variable)

    var sql4 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";

    // run the sql code

    con.query(sql4, values4, function(err, result) {
      if (err) throw err;
    });
  }

  // query the database for "loik" entries

  con.query("SELECT * FROM liikmed ORDER by id", function(err, result) {

    // for each "loik" member in the "loigud" array, create an "est", "en" and "name" property

    for (var c = 0; c < liikmedData.loigud.length; c++) {

      // "loik" entries in the database start from result 15 onwards

      indexNumber = c + 15;

      // create "est" and "en" properties, alongside with the name property

      var estProperty5 = liikmedData.loigud[c].est;
      var enProperty5 = liikmedData.loigud[c].en;
      var nameProperty5 = result[indexNumber].name;

      // create the sql text

      var sql5 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";

      // create an array, which will contain values that will replace question marks in the sql text

      var values5 = [estProperty5, enProperty5, nameProperty5];

      // update the database

      con.query(sql5, values5, function(err, result) {
        if (err) throw err;
      });
    }
  });

  // reload the page

  res.redirect("/admin/koorist");


});


// add new "loik" elements to the "liikmed" section on the "koorist" page


app.post("/upload/liikmed/new", function(req, res) {

  // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp

  var nameProperty = "loik" + Date.now();
  var estProperty = "";
  var enProperty = "";

  // create the sql text with the variables created above

  var sql = "INSERT INTO liikmed (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";

  // insert the new entry into the database

  con.query(sql, function(err, result) {
    if (err) throw err;
  });

  // reload the page

  res.redirect("/admin/koorist");
});


// delete a "loik" element from the "liikmed" section of the "koorist" page


app.post("/upload/liikmed/delete", function(req, res) {

  // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element

  var deleteLoikData = JSON.parse(req.body.data);

  // query the database for all the "loik" entries

  con.query("SELECT * FROM liikmed ORDER by id", function(err, result) {

    // to find the right result, we need to know its index number-
    // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)

    var currentIndex = deleteLoikData.idNumber - 1;

    // since "loik" entries start from result 15 onwards, add 15 to the retrieved index number

    var realIndex = currentIndex + 15;

    // get the database entry of the deleted element

    var currentResult = result[realIndex];

    // get the name property of the database entry

    var nameProperty = currentResult.name;

    // create the sql text

    var sql = "DELETE FROM liikmed WHERE name = ?";

    // replace the question mark in the sql text by the name property created above

    var value = nameProperty;

    // delete the entry from the database

    con.query(sql, value, function(err, result) {
      if (err) throw err;
    });
  });

  // reload the page

  res.redirect("/admin/koorist");
});


// update the "dirigendid" section on the "koorist" page


app.post("/upload/dirigendid", function(req, res) {


  // create an empty array that will be populated by the field objects, which will contain the name and maxCount attributes of the uploaded images

  var fieldsArray = [];

  // query the database for existing entries for the "portree" images

  con.query("SELECT * FROM dirigendidPildid ORDER by id", function(err, result) {

    // create as many field objects as there are database entries

    for (var i = 0; i < result.length; i++) {
      var field = {
        name: result[i].name,
        maxCount: 1
      };

      // push the field object into the array above

      fieldsArray.push(field);
    }

    // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files

    var upload = multer({
      storage: storage
    }).fields(fieldsArray);

    // initialize the upload

    upload(req, res, function(err) {
      if (err) throw err;

      // obtain the keys of the req.files object (which contains information about uploaded images)

      var keysPildid = Object.keys(req.files);

      // create a name and url property for each key in the req.files object

      for (var i = 0; i < keysPildid.length; i++) {

        // get each key separately

        var currentKeyPildid = keysPildid[i];

        // using the key, get the corresponding image in the req.files object

        var currentImg = req.files[keyPildid];

        // check if a corresponding image exists for each key

        if (currentImg !== undefined) {

          // if yes, construct the url property from the images originalname property

          var urlProperty = "/img/" + currentImg[0].originalname;

          // obtain the last characters of the images fieldname, which is an index number

          var indexNumber = currentImg[0].fieldname.slice(7);

          // since js starts counting from 0 not 1, subtract 1 from the index number

          var realIndex = indexNumber - 1;

          // get the database result that corresponds to the obtained index

          var nameProperty = result[realIndex].name;

          // create the sql text

          var sqlPildid = "UPDATE dirigendidPildid SET url = ? WHERE name = ?";

          // create an array, which will contain values that will replace question marks in the sql text

          var valuesPildid = [urlProperty, nameProperty];

          // update the database

          con.query(sqlPildid, valuesPildid, function(err, result) {
            if (err) throw err;
          });
        }
      }
      var keysTekstid = Object.keys(req.body);
      console.log(keysTekstid);
    });
  });
});


// add a new "dirigent" subform to the "dirigent" section on the "koorist" page


app.post("/upload/dirigendid/new", function(req, res) {

  // create the sql text for creating a new table in the database, called "dirigendid" + current timestamp

  var namePropertyTable = "dirigendid" + Date.now();

  var sqlCreate = "CREATE TABLE "+ namePropertyTable +" (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(3000), en varchar(3000), PRIMARY KEY(id))";

  // create a new table using the sql text

  con.query(sqlCreate, function(err, result) {
    if (err) throw err;
  });

  var namePropertyPilt = "portree" + Date.now();

  var sqlPilt = "INSERT INTO dirigendidPildid (name, url) VALUES ('"+ namePropertyPilt +"', '')";

  con.query(sqlPilt, function(err, result) {
    if (err) throw err;
  });

  var sqlInsert = "INSERT INTO "+ namePropertyTable +" (name, est, en) VALUES ('nimi', '', '')";

  con.query(sqlInsert, function(err, result) {
     if (err) throw err;
  });

  res.redirect("/admin/koorist");
});


// delete a "dirigent" subform from the "dirigent" section on the "koorist" page


app.post("/upload/dirigendid/delete", function(req, res) {

  var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'segakoorNoorus'";
  con.query(sql, function(err, result) {
    var tableNames = [];
    for (var i = 0; i < result.length; i++) {
      var tableName = (result[i].table_name);
      if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
        tableNames.push(tableName);
      }
    }

    // the tables have a timestamp in their name- sort the array in ascending order

    var sortedTableNames = tableNames.sort(function(a, b) {
      return a - b;
    });

    var sql = "DROP TABLE " + nameProperty + "";

    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  });
});



// add a new "loik" element to the "dirigendid" section of the "koorist" page-
// because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part


app.post("/upload/dirigendid" + ":number/new", function(req, res) {

  // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp

  var nameProperty = "loik" + Date.now();
  var estProperty = "";
  var enProperty = "";

  // create the sql text with the variables created above (req.params is used to create a database dynamically, database name will be "dirigendid" + a number)

  // var sql = "INSERT INTO dirigendid" + req.params.number + "(name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
  //
  // // insert the new entry into the database
  //
  // con.query(sql, function(err, result) {
  //   if (err) throw err;
  // });

  // reload the page

  res.redirect("/admin/koorist");
});




// start server

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is now running on port 3000");
});
