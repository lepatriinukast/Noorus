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
        res.render("koorist", {
          pageTitle: pageTitle,
          currentPage: currentPage,
          paiseikoon: paiseikoon,
          avapilt: avapilt,
          sissejuhatusData: sissejuhatusData
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
        res.render("about-us", {
          pageTitle: pageTitle,
          currentPage: currentPage,
          paiseikoon: paiseikoon,
          avapilt: avapilt,
          sissejuhatusData: sissejuhatusData
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
        res.render("admin_koorist", {
          pageTitle: pageTitle,
          paiseikoon: paiseikoon,
          avapilt: avapilt,
          sissejuhatusData: sissejuhatusData
        });
      });
    });
  });
});


// POST ROUTES FOR HANDLING DATA POSTED FROM THE CLIENT-SIDE

app.post("/upload/avaleht-pildid", function(req, res) {

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
app.post("/upload/avaleht-tekstid", function(req, res) {

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

    var estPropertyPealkiri = req.body.pealkiriEst;
    var enPropertyPealkiri = req.body.pealkiriEn;

    // create a values variable for the sql text

    var valuesPealkiri = [estPropertyPealkiri, enPropertyPealkiri];

    // create the sql text where question marks will be replaced by values in the above variable

    var sqlPealkiri = "UPDATE sissejuhatusTekstid SET est = ?, en =  ? WHERE name = 'pealkiri'";

    // update the database using the sql text and passing in the "valuesPealkiri" variable

    con.query(sqlPealkiri, valuesPealkiri, function(err, result) {
      if (err) throw err;
    });

    // get the input names from the submitted data as an array (They have been sent to the server as object keys)

    var keys = Object.keys(req.body);

    // Get the index of the last element in the keys array

    var index = keys.length - 1;

    // select the last input name in the array and get its last character (which is a number) and also convert it to number data type

    var number = Number(keys[index].slice(6));

con.query("SELECT * FROM sissejuhatusTekstid", function(err, result) {

console.log(result);
});

// reload the page

res.redirect("/admin/koorist");
});
});

app.post("/upload/uus-loik", function(req, res) {

    var nameProperty = "loik" + Date.now();
    var estProperty = "";
    var enProperty = "";

    var sql = "INSERT INTO sissejuhatusTekstid (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
    });

  res.redirect("/admin/koorist");
});

app.post("/upload/kustuta", function(req, res) {

  var deleteLoikData = JSON.parse(req.body.data);

  con.query("SELECT * FROM sissejuhatusTekstid ORDER by id", function(err, result) {

    var currentIndex = deleteLoikData.idNumber - 1;
    var realIndex = currentIndex + 1;

    var currentResult = result[realIndex];

    var nameProperty = currentResult.name;
    console.log(nameProperty);
    var sql = "DELETE FROM sissejuhatusTekstid WHERE name = ?";
    var value = nameProperty;

    con.query(sql, value, function(err, result) {
      if (err) throw err;
    });
  });

  res.redirect("/admin/koorist");
});





// start server

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is now running on port 3000");
});
