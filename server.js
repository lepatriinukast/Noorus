/* jshint esversion: 8 */


// require node modules

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const multer = require("multer");
const nodemailer = require("nodemailer");
const session = require("express-session");
const bcrypt = require('bcrypt');
const saltRounds = 12;


// require the custom modules

const con = require("./requestData/databaseConnection");
const mod = require("./requestData/modelConstructors");
const query = require("./requestData/queryDatabase");
const getData = require("./requestData/dataCompiler");

// setup express back-end framework

const app = express();

//configure a session

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
  }
}));

// setup body-parser for creating routes and getting data from the client-side

app.use(bodyParser.urlencoded({
  extended: true
}));

// setup ejs template engine and a "public" folder for static files

app.set('view engine', 'ejs');
app.use(express.static("public"));

// setup an email transporter

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

// setup multer storage engine for picture uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// an asynchronous function for updating the database

const updateDatabase = async (sql, values) => {
  con.query(sql, values, (err, result) => {
    if (err) throw err;
  });
};








// ESTONIAN ROUTES

app.get("/", async (req, res) => {
  const data = await getData("home", "est");
  res.render("home", {
    data: data
  });
});

app.get("/koorist", async (req, res) => {
  const data = await getData("about", "est");
  res.render("about", {
    data: data
  });
});




// app.route("/koorist")
//
//   .get((req, res) => {
//     const pageTitle = "Koorist";
//     const currentPage = "en/about-us";
//     con.query("SELECT * FROM avalehtpildid ORDER BY id", (err, result) => {
//       if (err) throw err;
//       const paiseikoon = {
//         url: result[0].url,
//         filename: result[0].url.slice(5)
//       };
//       con.query("SELECT * FROM sissejuhatuspildid ORDER BY id", (err, result) => {
//         if (err) throw err;
//         const avapilt = {
//           url: result[0].url,
//           filename: result[0].url.slice(5)
//         };
//         con.query("SELECT * FROM pealkirjad ORDER BY id", (err, result) => {
//           if (err) throw err;
//           var pealkirjadData = [];
//           for (var i = 0; i < result.length; i++) {
//             var pealkiri = {
//               est: result[i].est,
//               en: result[i].en
//             };
//             pealkirjadData.push(pealkiri);
//           }
//
//           con.query("SELECT * FROM sissejuhatustekstid ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var sissejuhatusData = {
//               pealkiri: {
//                 est: result[0].est,
//                 en: result[0].en
//               },
//               loigud: []
//             };
//             for (var i = 1; i < result.length; i++) {
//               var loik = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               sissejuhatusData.loigud.push(loik);
//             }
//             con.query("SELECT * FROM liikmed ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var liikmedData = {
//                 haaleruhmaNimed: [{
//                   est: result[0].est,
//                   en: result[0].en
//                 }, {
//                   est: result[1].est,
//                   en: result[1].en
//                 }, {
//                   est: result[2].est,
//                   en: result[2].en
//                 }, {
//                   est: result[3].est,
//                   en: result[3].en
//                 }],
//                 haaleruhmaTutvustused: [{
//                   est: result[4].est,
//                   en: result[4].en
//                 }, {
//                   est: result[5].est,
//                   en: result[5].en
//                 }, {
//                   est: result[6].est,
//                   en: result[6].en
//                 }, {
//                   est: result[7].est,
//                   en: result[7].en
//                 }],
//                 lauljadPealkiri: {
//                   est: result[8].est,
//                   en: result[8].en
//                 },
//                 sopranid: result[9].est,
//                 aldid: result[10].est,
//                 tenorid: result[11].est,
//                 bassid: result[12].est,
//                 vilistlastePealkiri: {
//                   est: result[13].est,
//                   en: result[13].en
//                 },
//                 vilistlasteNimekiri: {
//                   est: result[14].est,
//                   en: result[14].en
//                 },
//                 loigud: []
//               };
//               for (var i = 15; i < result.length; i++) {
//                 var loik = {
//                   name: result[i].name,
//                   est: result[i].est,
//                   en: result[i].en,
//                 };
//                 liikmedData.loigud.push(loik);
//               }
//
//               // find the dynamic tables from the database ("dirigendid" and "ajalugu") and sort them into groups accordingly
//
//               var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//               con.query(sql, async function(err, result) {
//                 if (err) throw err;
//
//                 var dirigendidTableNames = [];
//                 var ajaluguTableNames = [];
//
//                 for (var i = 0; i < result.length; i++) {
//
//                   var tableName = (result[i].table_name);
//
//                   if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
//
//                     dirigendidTableNames.push(tableName);
//
//                   } else if (tableName.indexOf("ajalugu") !== -1 && tableName.indexOf("sissekanded") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//                     ajaluguTableNames.push(tableName);
//
//                   }
//                 }
//
//                 var sortedDirigendidTableNames = dirigendidTableNames.sort(function(a, b) {
//                   return a - b;
//                 });
//
//                 var sortedAjaluguTableNames = ajaluguTableNames.sort(function(a, b) {
//                   return a - b;
//                 });
//
//                 // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//                 // this is necessary, because we often need to wait for database queries,
//                 // but because we need to have loops in our code, we cannot use callbacks like we normally do
//                 // (for this advanced js code, we also use new arrow functions)
//
//
//                 // a function, which returns a promise that will be resolved to a "dirigent" object once the database query has completed,
//                 // takes an argument, which is the relevant database table name
//
//                 const constructDirigendidPromise = tableName => {
//
//                   return new Promise((resolve, reject) => {
//
//                     con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                       if (err) throw err;
//
//                       var dirigent = {
//                         nimi: result[0].est,
//                         loigud: []
//                       };
//                       for (let b = 1; b < result.length; b++) {
//                         var loik = {
//                           est: result[b].est,
//                           en: result[b].en
//                         };
//                         dirigent.loigud.push(loik);
//                       }
//                       if (err) {
//                         reject(err);
//                       } else {
//                         resolve(dirigent);
//                       }
//                     });
//                   });
//                 };
//
//
//                 // a function, which returns a promise that will be resolved to a "ajaluguSektsioon" object once the database query has completed,
//                 // takes an argument, which is the relevant database table name
//
//                 const constructAjaluguPromise = tableName => {
//
//                   return new Promise((resolve, reject) => {
//
//                     con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                       if (err) throw err;
//
//                       var ajaluguSektsioon = {
//                         pealkiri: {
//                           est: result[0].est,
//                           en: result[0].en
//                         },
//                         loigud: []
//                       };
//                       for (let b = 1; b < result.length; b++) {
//                         var loik = {
//                           est: result[b].est,
//                           en: result[b].en
//                         };
//                         ajaluguSektsioon.loigud.push(loik);
//                       }
//                       if (err) {
//                         reject(err);
//                       } else {
//                         resolve(ajaluguSektsioon);
//                       }
//                     });
//                   });
//                 };
//
//                 // create an array of the "dirigent" promises constructed above, using the map method
//
//                 const dirigendidDataPromise = sortedDirigendidTableNames.map(async tableName => {
//
//                   const dirigent = await constructDirigendidPromise(tableName);
//
//                   return dirigent;
//                 });
//
//                 // wait for all the promises to be resolved into an array of "dirigent" objects
//
//                 var dirigendidData = await Promise.all(dirigendidDataPromise);
//
//
//                 // create an array of the "ajaluguSektsioon" promises constructed above, using the map method
//
//                 const ajaluguDataPromise = sortedAjaluguTableNames.map(async tableName => {
//
//                   const ajaluguSektsioon = await constructAjaluguPromise(tableName);
//
//                   return ajaluguSektsioon;
//                 });
//
//                 // wait for all the promises to be resolved into an array of "dirigent" objects
//
//                 var ajaluguSektsioonidData = await Promise.all(ajaluguDataPromise);
//
//                 con.query("SELECT * FROM dirigendidpildid ORDER by id", function(err, result) {
//                   if (err) throw err;
//                   var portreed = [];
//                   for (var i = 0; i < result.length; i++) {
//                     var portree = {
//                       url: result[i].url,
//                       filename: result[i].url.slice(5)
//                     };
//                     portreed.push(portree);
//                   }
//                   con.query("SELECT * FROM ajalugusissejuhatus ORDER BY id", function(err, result) {
//                     if (err) throw err;
//                     var ajaluguSissejuhatusData = {
//                       pealkiri: {
//                         est: result[0].est,
//                         en: result[0].en
//                       },
//                       loigud: []
//                     };
//                     for (var i = 1; i < result.length; i++) {
//                       var loik = {
//                         est: result[i].est,
//                         en: result[i].en
//                       };
//                       ajaluguSissejuhatusData.loigud.push(loik);
//                     }
//                     con.query("SELECT * FROM ajalugusissekanded ORDER by id", function(err, result) {
//                       if (err) throw err;
//                       var ajaluguSissekandedData = {
//                         pealkiri: {
//                           est: result[0].est,
//                           en: result[0].en
//                         },
//                         sissekanded: []
//                       };
//
//                       for (var i = 1; i < result.length; i++) {
//
//                         var sissekanne = {
//                           aasta: result[i].year,
//                           est: result[i].est,
//                           en: result[i].en
//                         };
//                         ajaluguSissekandedData.sissekanded.push(sissekanne);
//                       }
//                       con.query("SELECT * FROM meedia ORDER BY id", function(err, result) {
//                         if (err) throw err;
//                         var meediaSissejuhatusData = {
//                           pealkiri: {
//                             est: result[0].est,
//                             en: result[0].en,
//                           },
//                           loigud: []
//                         };
//                         for (var i = 1; i < result.length; i++) {
//                           var loik = {
//                             est: result[i].est,
//                             en: result[i].en
//                           };
//                           meediaSissejuhatusData.loigud.push(loik);
//                         }
//                         con.query("SELECT * FROM meediavideod ORDER BY id", function(err, result) {
//                           if (err) throw err;
//                           var meediaVideodData = {
//                             pealkiri: {
//                               est: result[0].est,
//                               en: result[0].en,
//                             },
//                             manustamislingid: []
//                           };
//                           for (var i = 1; i < result.length; i++) {
//                             var manustamislink = result[i].link;
//                             meediaVideodData.manustamislingid.push(manustamislink);
//                           }
//                           con.query("SELECT * FROM meedialingid ORDER BY id", function(err, result) {
//                             if (err) throw err;
//                             var meediaLingidData = {
//                               pealkiri: {
//                                 est: result[0].est,
//                                 en: result[0].en,
//                               },
//                               lingid: []
//                             };
//                             for (var i = 1; i < result.length; i++) {
//                               var link = {
//                                 est: result[i].est,
//                                 en: result[i].en,
//                                 link: result[i].link
//                               };
//                               meediaLingidData.lingid.push(link);
//                             }
//                             con.query("SELECT * FROM toetajad ORDER BY id", function(err, result) {
//                               if (err) throw err;
//                               var toetajadData = [];
//                               for (var i = 0; i < result.length; i++) {
//                                 var logo = {
//                                   link: result[i].link,
//                                   filename: result[i].url.slice(5),
//                                   url: result[i].url
//                                 };
//                                 toetajadData.push(logo);
//                               }
//                               res.render("koorist", {
//                                 pageTitle: pageTitle,
//                                 currentPage: currentPage,
//                                 paiseikoon: paiseikoon,
//                                 avapilt: avapilt,
//                                 pealkirjadData: pealkirjadData,
//                                 sissejuhatusData: sissejuhatusData,
//                                 liikmedData: liikmedData,
//                                 portreed: portreed,
//                                 dirigendidData: dirigendidData,
//                                 ajaluguSissejuhatusData: ajaluguSissejuhatusData,
//                                 ajaluguSissekandedData: ajaluguSissekandedData,
//                                 ajaluguSektsioonidData: ajaluguSektsioonidData,
//                                 meediaSissejuhatusData: meediaSissejuhatusData,
//                                 meediaVideodData: meediaVideodData,
//                                 meediaLingidData: meediaLingidData,
//                                 toetajadData: toetajadData
//                               });
//                             });
//                           });
//                         });
//                       });
//                     });
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
//
//
// app.get("/pood", function(req, res) {
//   var pageTitle = "Pood";
//   var currentPage = "en/shop";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM poodsissejuhatus ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var poodSissejuhatusData = {
//         loigud: []
//       };
//       for (var i = 0; i < result.length; i++) {
//         var loik = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         poodSissejuhatusData.loigud.push(loik);
//       }
//       // find the dynamic "pood" tables from the database and sort them into an array
//
//       var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//       con.query(sql, async function(err, result) {
//         if (err) throw err;
//
//         var poodTableNames = [];
//         var nimistuTableNames = [];
//
//         for (var i = 0; i < result.length; i++) {
//
//           var tableName = (result[i].table_name);
//
//           if (tableName.indexOf("pood") !== -1 && tableName.indexOf("pildid") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//             poodTableNames.push(tableName);
//
//           } else if (tableName.indexOf("nimistu") !== -1) {
//
//             nimistuTableNames.push(tableName);
//           }
//         }
//
//         var sortedPoodTableNames = poodTableNames.sort(function(a, b) {
//           return a - b;
//         });
//
//         var sortedNimistuTableNames = nimistuTableNames.sort(function(a, b) {
//           return a - b;
//         });
//
//
//         // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//         // this is necessary, because we often need to wait for database queries,
//         // but because we need to have loops in our code, we cannot use callbacks like we normally do
//         // (for this advanced js code, we also use new arrow functions)
//
//
//         // a function, which returns a promise that will be resolved to a "pood" object once the database query has completed,
//         // takes an argument, which is the relevant database table name
//
//
//         const constructPoodPromise = tableName => {
//
//           return new Promise((resolve, reject) => {
//
//             con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//               if (err) throw err;
//
//               var pood = {
//                 toode: {
//                   est: result[0].est,
//                   en: result[0].en,
//                   price: result[0].price
//                 },
//                 loigud: [],
//               };
//               for (let b = 1; b < result.length; b++) {
//                 var loik = {
//                   est: result[b].est,
//                   en: result[b].en,
//                 };
//                 pood.loigud.push(loik);
//               }
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(pood);
//               }
//             });
//           });
//         };
//
//         // a function, which returns a promise that will be resolved to a "nimistu" object once the database query has completed,
//         // takes an argument, which is the relevant database table name
//
//         const constructNimistuPromise = tableName => {
//
//           return new Promise((resolve, reject) => {
//
//             con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//               if (err) throw err;
//
//               var nimistu = {
//                 read: []
//               };
//
//               for (let b = 0; b < result.length; b++) {
//                 var rida = {
//                   est: result[b].est,
//                   en: result[b].en,
//                 };
//                 nimistu.read.push(rida);
//               }
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(nimistu);
//               }
//             });
//           });
//         };
//
//         // create an array of the "pood" promises constructed above, using the map method
//
//         const poodDataPromise = sortedPoodTableNames.map(async tableName => {
//
//           const pood = await constructPoodPromise(tableName);
//
//           return pood;
//         });
//
//         // create an array of the "nimistu" promises constructed above, using the map method
//
//         const nimistuDataPromise = sortedNimistuTableNames.map(async tableName => {
//
//           const nimistu = await constructNimistuPromise(tableName);
//
//           return nimistu;
//         });
//
//         // wait for all the promises to be resolved into an array of "pood" and "nimistu" objects
//
//         var poodData = await Promise.all(poodDataPromise);
//         var nimistuData = await Promise.all(nimistuDataPromise);
//         con.query("SELECT * FROM poodpildid ORDER by id", function(err, result) {
//           if (err) throw err;
//           var pildid = [];
//           for (var i = 0; i < result.length; i++) {
//             var pilt = {
//               url: result[i].url,
//               filename: result[i].url.slice(5)
//             };
//             pildid.push(pilt);
//           }
//           con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var pealkirjadData = [];
//             for (var i = 0; i < result.length; i++) {
//               var pealkiri = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               pealkirjadData.push(pealkiri);
//             }
//             res.render("pood", {
//               pageTitle: pageTitle,
//               currentPage: currentPage,
//               paiseikoon: paiseikoon,
//               pealkirjadData: pealkirjadData,
//               poodSissejuhatusData: poodSissejuhatusData,
//               poodData: poodData,
//               nimistuData: nimistuData,
//               pildid: pildid,
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// app.get("/sundmused", function(req, res) {
//   var pageTitle = "Sündmused";
//   var currentPage = "en/events";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM sundmusedpildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var plakatid = [];
//       for (var i = 0; i < result.length; i++) {
//         var plakat = {
//           url: result[i].url,
//           filename: result[i].url.slice(5)
//         };
//         plakatid.push(plakat);
//       }
//       con.query("SELECT * FROM moodunudpildid ORDER BY id DESC", function(err, result) {
//         if (err) throw err;
//         var moodunudPlakatid = [];
//         for (var i = 0; i < result.length; i++) {
//           var plakat = {
//             url: result[i].url,
//             filename: result[i].url.slice(5)
//           };
//           moodunudPlakatid.push(plakat);
//         }
//         con.query("SELECT * FROM sundmusedsissejuhatus ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var sundmusedSissejuhatusData = [];
//           for (var i = 0; i < result.length; i++) {
//             var loik = {
//               est: result[i].est,
//               en: result[i].en
//             };
//             sundmusedSissejuhatusData.push(loik);
//           }
//
//           // find the dynamic tables from the database ("sundmused", "sundmusedkoht", "moodunud", "moodunudkoht") and sort them into groups accordingly
//
//           var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//           con.query(sql, async function(err, result) {
//             if (err) throw err;
//
//             var tableNamesSundmused = [];
//             var tableNamesSundmusedKoht = [];
//             var tableNamesMoodunud = [];
//             var tableNamesMoodunudKoht = [];
//
//             for (var i = 0; i < result.length; i++) {
//
//               var tableName = (result[i].table_name);
//
//               if (tableName.indexOf("sundmused") !== -1 &&
//                 tableName.indexOf("pildid") === -1 &&
//                 tableName.indexOf("sissejuhatus") === -1 &&
//                 tableName.indexOf("koht") === -1) {
//
//                 tableNamesSundmused.push(tableName);
//
//               } else if (tableName.indexOf("sundmusedkoht") !== -1) {
//                 tableNamesSundmusedKoht.push(tableName);
//
//               } else if (tableName.indexOf("moodunud") !== -1 &&
//                 tableName.indexOf("pildid") === -1 &&
//                 tableName.indexOf("koht") === -1) {
//
//                 tableNamesMoodunud.push(tableName);
//
//               } else if (tableName.indexOf("moodunudkoht") !== -1) {
//                 tableNamesMoodunudKoht.push(tableName);
//               }
//             }
//
//             var sortedTableNamesSundmused = tableNamesSundmused.sort(function(a, b) {
//               return a - b;
//             });
//
//             var sortedTableNamesSundmusedKoht = tableNamesSundmusedKoht.sort(function(a, b) {
//               return a - b;
//             });
//
//             var sortedTableNamesMoodunud = tableNamesMoodunud.reverse();
//
//             var sortedTableNamesMoodunudKoht = tableNamesMoodunudKoht.reverse();
//
//             // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//             // this is necessary, because we often need to wait for database queries,
//             // but because we need to have loops in our code, we cannot use callbacks like we normally do
//             // (for this advanced js code, we also use new arrow functions)
//
//
//             // functions (one for each database table associated with a dynamic "sundmused", "sundmusedkoht", "moodunud" or "moodunudkoht" subform),
//             // which will each return a promise that will be resolved to an array once the database query has completed,
//             // these functions take an argument, which is the relevant database table name
//
//             const constructSundmusedPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmus = {
//                     pealkiri: {
//                       est: result[0].est,
//                       en: result[0].en
//                     },
//                     loigud: []
//                   };
//                   for (let b = 1; b < result.length; b++) {
//                     var loik = {
//                       est: result[b].est,
//                       en: result[b].en
//                     };
//                     sundmus.loigud.push(loik);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmus);
//                   }
//                 });
//               });
//             };
//
//             const constructSundmusedKohtPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmusKoht = {
//                     kohad: []
//                   };
//                   for (let b = 0; b < result.length; b++) {
//                     var koht = {
//                       est: result[b].est,
//                       en: result[b].en,
//                       link: result[b].link
//                     };
//                     sundmusKoht.kohad.push(koht);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmusKoht);
//                   }
//                 });
//               });
//             };
//
//             const constructMoodunudPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmus = {
//                     pealkiri: {
//                       est: result[0].est,
//                       en: result[0].en
//                     },
//                     loigud: []
//                   };
//                   for (let b = 1; b < result.length; b++) {
//                     var loik = {
//                       est: result[b].est,
//                       en: result[b].en
//                     };
//                     sundmus.loigud.push(loik);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmus);
//                   }
//                 });
//               });
//             };
//
//             const constructMoodunudKohtPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmusKoht = {
//                     kohad: []
//                   };
//                   for (let b = 0; b < result.length; b++) {
//                     var koht = {
//                       est: result[b].est,
//                       en: result[b].en,
//                       link: result[b].link
//                     };
//                     sundmusKoht.kohad.push(koht);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmusKoht);
//                   }
//                 });
//               });
//             };
//
//
//
//             // create arrays of the promises constructed above, using the map method
//
//             const sundmusedDataPromise = sortedTableNamesSundmused.map(async tableNameSundmused => {
//
//               const sundmused = await constructSundmusedPromise(tableNameSundmused);
//
//               return sundmused;
//             });
//
//
//             const sundmusedKohtDataPromise = sortedTableNamesSundmusedKoht.map(async tableNameSundmusedKoht => {
//
//               const sundmusedKoht = await constructSundmusedKohtPromise(tableNameSundmusedKoht);
//
//               return sundmusedKoht;
//             });
//
//             const moodunudDataPromise = sortedTableNamesMoodunud.map(async tableNameMoodunud => {
//
//               const moodunud = await constructMoodunudPromise(tableNameMoodunud);
//
//               return moodunud;
//             });
//
//
//             const moodunudKohtDataPromise = sortedTableNamesMoodunudKoht.map(async tableNameMoodunudKoht => {
//
//               const moodunudKoht = await constructMoodunudKohtPromise(tableNameMoodunudKoht);
//
//               return moodunudKoht;
//             });
//
//
//             // wait for all the promises to be resolved into four arrays
//
//             var sundmusedData = await Promise.all(sundmusedDataPromise);
//             var sundmusedKohtData = await Promise.all(sundmusedKohtDataPromise);
//             var moodunudData = await Promise.all(moodunudDataPromise);
//             var moodunudKohtData = await Promise.all(moodunudKohtDataPromise);
//
//             con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var pealkirjadData = [];
//               for (var i = 0; i < result.length; i++) {
//                 var pealkiri = {
//                   est: result[i].est,
//                   en: result[i].en
//                 };
//                 pealkirjadData.push(pealkiri);
//               }
//               res.render("sundmused", {
//                 pageTitle: pageTitle,
//                 currentPage: currentPage,
//                 paiseikoon: paiseikoon,
//                 pealkirjadData: pealkirjadData,
//                 plakatid: plakatid,
//                 sundmusedSissejuhatusData: sundmusedSissejuhatusData,
//                 sundmusedData: sundmusedData,
//                 sundmusedKohtData: sundmusedKohtData,
//                 moodunudPlakatid: moodunudPlakatid,
//                 moodunudData: moodunudData,
//                 moodunudKohtData: moodunudKohtData
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// // create an object that returns a new CreateQuery instance
// // CreateQuery.init is the real constructor, while CreateQuery itself
// // is only a wrapper that we use in order not to write the new keyword each time
//
// const CreateQuery = (tableName, model) => new CreateQuery.init(tableName, model);
//
// // create a constructor function that takes two parametres - a sql tablename that we want to query
// // and a model object that defines what we do with the results of that query
//
// CreateQuery.init = function(tableName, model) {
//
//   this.query = async () => {
//
//     const newPromise = new Promise((resolve, reject) => {
//
//       con.query(`SELECT * FROM ${tableName} ORDER BY id`, (err, result) => {
//         if (err) {
//           resolve(err);
//         } else {
//           const newModel = eval(model);
//           resolve(newModel);
//         }
//       });
//     });
//
//     return await newPromise;
//   };
// };
//
//
//
//
//
//
//
//
//
// const kontaktSissejuhatusData = new Promise((resolve, reject) => {
//   con.query("SELECT * FROM kontaktsissejuhatus ORDER BY id", (err, result) => {
//     if (err) {
//       reject(err);
//     } else {
//       const kontaktSissejuhatusData = {
//         loigud: []
//       };
//       for (let i = 0; i < result.length; i++) {
//         let loik = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         kontaktSissejuhatusData.loigud.push(loik);
//       }
//
//       resolve(kontaktSissejuhatusData);
//     }
//   });
// });
//
//
//
//
//
//
//
//
//
// app.get("/kontakt", async function(req, res) {
//   var pageTitle = "Kontakt";
//   var currentPage = "en/contact";
//
//
//
//
//
//   con.query("SELECT * FROM kontaktuldine ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var kontaktUldineData = {
//       pealkiri: {
//         est: result[0].est,
//         en: result[0].en
//       },
//       loigud: []
//     };
//     for (var i = 1; i < result.length; i++) {
//       var loik = {
//         est: result[i].est,
//         en: result[i].en
//       };
//       kontaktUldineData.loigud.push(loik);
//     }
//     con.query("SELECT * FROM kontaktandmed ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var kontaktAndmedData = {
//         pealkiri: {
//           est: result[0].est,
//           en: result[0].en
//         },
//         paarid: []
//       };
//       for (var i = 1; i < result.length; i++) {
//         var teave = {
//           estKey: result[i].estkey,
//           enKey: result[i].enkey,
//           est: result[i].est,
//           en: result[i].en
//         };
//         kontaktAndmedData.paarid.push(teave);
//       }
//       con.query("SELECT * FROM kontaktnumbrid ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var kontaktNumbridData = {
//           pealkiri: {
//             est: result[0].est,
//             en: result[0].en
//           },
//           numbrid: []
//         };
//         for (var i = 1; i < result.length; i++) {
//           var number = {
//             estKey: result[i].estkey,
//             enKey: result[i].enkey,
//             number: result[i].number,
//           };
//           kontaktNumbridData.numbrid.push(number);
//         }
//         con.query("SELECT * FROM kontaktmtu ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var kontaktMtuData = {
//             pealkiri: {
//               est: result[0].est,
//               en: result[0].en
//             },
//             paarid: []
//           };
//           for (var i = 1; i < result.length; i++) {
//             var teave = {
//               estKey: result[i].estkey,
//               enKey: result[i].enkey,
//               est: result[i].est,
//               en: result[i].en,
//             };
//             kontaktMtuData.paarid.push(teave);
//           }
//           con.query("SELECT * FROM vastuvotttekstid ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var vastuvottTekstidData = {
//               pealkiri: {
//                 est: result[0].est,
//                 en: result[0].en,
//               },
//               loigud: []
//             };
//             for (var i = 1; i < result.length; i++) {
//               var loik = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               vastuvottTekstidData.loigud.push(loik);
//             }
//             con.query("SELECT * FROM vastuvottankeet ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var vastuvottAnkeetData = {
//                 pealkiri: {
//                   est: result[0].est,
//                   en: result[0].en
//                 },
//                 valjad: []
//               };
//               for (var i = 1; i < result.length; i++) {
//                 var vali = {
//                   est: result[i].est,
//                   en: result[i].en,
//                   checked: result[i].checked,
//                   textArea: result[i].textarea
//                 };
//                 vastuvottAnkeetData.valjad.push(vali);
//               }
//               con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//                 if (err) throw err;
//                 var pealkirjadData = [];
//                 for (var i = 0; i < result.length; i++) {
//                   var pealkiri = {
//                     est: result[i].est,
//                     en: result[i].en
//                   };
//                   pealkirjadData.push(pealkiri);
//                 }
//
//                 console.log(paiseikoon);
//
//                 res.render("kontakt", {
//                   pageTitle: pageTitle,
//                   currentPage: currentPage,
//                   paiseikoon: paiseikoon,
//                   pealkirjadData: pealkirjadData,
//                   kontaktSissejuhatusData: kontaktSissejuhatusData,
//                   kontaktUldineData: kontaktUldineData,
//                   kontaktAndmedData: kontaktAndmedData,
//                   kontaktNumbridData: kontaktNumbridData,
//                   kontaktMtuData: kontaktMtuData,
//                   vastuvottTekstidData: vastuvottTekstidData,
//                   vastuvottAnkeetData: vastuvottAnkeetData
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
//
// app.get("/telli" + ":number", function(req, res) {
//   var number = req.params.number;
//   var pageTitle = "Telli";
//   var currentPage = "en/order" + number;
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM telli ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var telliData = {
//         loigud: []
//       };
//       for (var i = 0; i < result.length; i++) {
//         var loik = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         telliData.loigud.push(loik);
//       }
//       con.query("SELECT * FROM telliankeet ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var telliAnkeetData = {
//           pealkiri: {
//             est: result[0].est,
//             en: result[0].en
//           },
//           jarelloik: {
//             est: result[1].est,
//             en: result[1].en
//           },
//           valjad: []
//         };
//         for (var i = 2; i < result.length; i++) {
//           var vali = {
//             est: result[i].est,
//             en: result[i].en,
//             checked: result[i].checked,
//             textArea: result[i].textarea,
//           };
//           telliAnkeetData.valjad.push(vali);
//         }
//         // find the dynamic "pood" tables from the database and sort them into an array
//
//         var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//         con.query(sql, async function(err, result) {
//           if (err) throw err;
//
//           var poodTableNames = [];
//
//           for (var i = 0; i < result.length; i++) {
//
//             var tableName = (result[i].table_name);
//
//             if (tableName.indexOf("pood") !== -1 && tableName.indexOf("pildid") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//               poodTableNames.push(tableName);
//             }
//           }
//
//           var sortedPoodTableNames = poodTableNames.sort(function(a, b) {
//             return a - b;
//           });
//
//
//           // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//           // this is necessary, because we often need to wait for database queries,
//           // but because we need to have loops in our code, we cannot use callbacks like we normally do
//           // (for this advanced js code, we also use new arrow functions)
//
//
//           // a function, which returns a promise that will be resolved to a "pood" object once the database query has completed,
//           // takes an argument, which is the relevant database table name
//
//
//           const constructPoodPromise = tableName => {
//
//             return new Promise((resolve, reject) => {
//
//               con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                 if (err) throw err;
//
//                 var pood = {
//                   toode: {
//                     est: result[0].est,
//                     en: result[0].en,
//                     price: result[0].price
//                   },
//                   loigud: []
//                 };
//                 for (let b = 1; b < result.length; b++) {
//                   var loik = {
//                     est: result[b].est,
//                     en: result[b].en,
//                     price: result[b].price
//                   };
//                   pood.loigud.push(loik);
//                 }
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(pood);
//                 }
//               });
//             });
//           };
//
//
//           // create an array of the "pood" promises constructed above, using the map method
//
//           const poodDataPromise = sortedPoodTableNames.map(async tableName => {
//
//             const pood = await constructPoodPromise(tableName);
//
//             return pood;
//           });
//
//           // wait for all the promises to be resolved into an array of "pood" objects
//
//           var poodData = await Promise.all(poodDataPromise);
//           con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var pealkirjadData = [];
//             for (var i = 0; i < result.length; i++) {
//               var pealkiri = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               pealkirjadData.push(pealkiri);
//             }
//             res.render("telli", {
//               pageTitle: pageTitle,
//               currentPage: currentPage,
//               number: number,
//               paiseikoon: paiseikoon,
//               pealkirjadData: pealkirjadData,
//               telliData: telliData,
//               telliAnkeetData: telliAnkeetData,
//               poodData: poodData
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// app.get("/telli/onnestumine", function(req, res) {
//   var pageTitle = "Tellimus edastatud";
//   var currentPage = "en/order/success";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("onnestumine_telli", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
//
// app.get("/kontakt/onnestumine", function(req, res) {
//   var pageTitle = "Andmed edastatud";
//   var currentPage = "en/contact/success";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("onnestumine_kontakt", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
//
// app.get("/telli/nurjunud", function(req, res) {
//   var pageTitle = "Tellimus ebaõnnestus";
//   var currentPage = "en/order/failure";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("nurjunud_telli", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
// app.get("/kontakt/nurjunud", function(req, res) {
//   var pageTitle = "Registreerimine ebaõnnestus";
//   var currentPage = "en/contact/failure";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("nurjunud_kontakt", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
// app.get("/login", function(req, res) {
//   var pageTitle = "Sisselogimine";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM avalehtpildid ORDER BY id", function query(err, result) {
//       if (err) throw err;
//       var avalehtPildidData = {
//         avalehtLogo: {
//           url: result[1].url,
//           filename: result[1].url.slice(5)
//         }
//       };
//       res.render("login", {
//         pageTitle: pageTitle,
//         paiseikoon: paiseikoon,
//         avalehtPildidData: avalehtPildidData
//       });
//     });
//   });
// });
//
// // ENGLISH ROUTES
//
// app.get("/en", function(req, res) {
//   var pageTitle = "Home";
//   var currentPage = "";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//
//     con.query("SELECT * FROM avalehttekstid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var avalehtTekstidData = {
//         suurPealkiri: {
//           est: result[0].est,
//           en: result[0].en
//         },
//         jatkuPealkiri: {
//           est: result[1].est,
//           en: result[1].en
//         },
//         sektsiooniPealkiri1: {
//           est: result[2].est,
//           en: result[2].en
//         },
//         sektsiooniTekst1: {
//           est: result[3].est,
//           en: result[3].en
//         },
//         sektsiooniPealkiri2: {
//           est: result[4].est,
//           en: result[4].en
//         },
//         sektsiooniTekst2: {
//           est: result[5].est,
//           en: result[5].en
//         }
//       };
//       con.query("SELECT * FROM sundmusedpildid ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var plakatid = [];
//         for (var i = 0; i < result.length; i++) {
//           var plakat = {
//             url: result[i].url,
//             filename: result[i].url.slice(5)
//           };
//           plakatid.push(plakat);
//         }
//
//         // find the dynamic tables from the database ("sundmused" and "moodunud") and sort them into groups accordingly
//
//         var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//         con.query(sql, async function(err, result) {
//           if (err) throw err;
//
//           var tableNamesSundmused = [];
//           var tableNamesMoodunud = [];
//
//           for (var i = 0; i < result.length; i++) {
//
//             var tableName = (result[i].table_name);
//
//             if (tableName.indexOf("sundmused") !== -1 &&
//               tableName.indexOf("pildid") === -1 &&
//               tableName.indexOf("sissejuhatus") === -1 &&
//               tableName.indexOf("koht") === -1) {
//
//               tableNamesSundmused.push(tableName);
//
//             } else if (tableName.indexOf("moodunud") !== -1 &&
//               tableName.indexOf("pildid") === -1 &&
//               tableName.indexOf("koht") === -1) {
//
//               tableNamesMoodunud.push(tableName);
//
//             }
//           }
//
//           // sort the table arrays in alphabetic order (ascending for sundmused and descending for moodunud)
//
//           var sortedTableNamesSundmused = tableNamesSundmused.sort(function(a, b) {
//             return a - b;
//           });
//           var sortedTableNamesMoodunud = tableNamesMoodunud.reverse();
//
//
//           // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//           // this is necessary, because we often need to wait for database queries,
//           // but because we need to have loops in our code, we cannot use callbacks like we normally do
//           // (for this advanced js code, we also use new arrow functions)
//
//
//           // functions (one for each database table associated with a dynamic "sundmused" and "moodunud" subform),
//           // which will each return a promise that will be resolved to an array once the database query has completed,
//           // these functions take an argument, which is the relevant database table name
//
//           const constructSundmusedPromise = tableName => {
//
//             return new Promise((resolve, reject) => {
//
//               con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                 if (err) throw err;
//
//                 var sundmus = {
//                   pealkiri: {
//                     est: result[0].est,
//                     en: result[0].en
//                   },
//                   loigud: []
//                 };
//                 for (let b = 1; b < result.length; b++) {
//                   var loik = {
//                     est: result[b].est,
//                     en: result[b].en
//                   };
//                   sundmus.loigud.push(loik);
//                 }
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(sundmus);
//                 }
//               });
//             });
//           };
//
//
//           const constructMoodunudPromise = tableName => {
//
//             return new Promise((resolve, reject) => {
//
//               con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                 if (err) throw err;
//
//                 var sundmus = {
//                   pealkiri: {
//                     est: result[0].est,
//                     en: result[0].en
//                   },
//                   loigud: []
//                 };
//                 for (let b = 1; b < result.length; b++) {
//                   var loik = {
//                     est: result[b].est,
//                     en: result[b].en
//                   };
//                   sundmus.loigud.push(loik);
//                 }
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(sundmus);
//                 }
//               });
//             });
//           };
//
//
//           // create arrays of the promises constructed above, using the map method
//
//           const sundmusedDataPromise = sortedTableNamesSundmused.map(async tableNameSundmused => {
//
//             const sundmused = await constructSundmusedPromise(tableNameSundmused);
//
//             return sundmused;
//           });
//
//
//           const moodunudDataPromise = sortedTableNamesMoodunud.map(async tableNameMoodunud => {
//
//             const moodunud = await constructMoodunudPromise(tableNameMoodunud);
//
//             return moodunud;
//           });
//
//
//           // wait for all the promises to be resolved into two arrays
//
//           var sundmusedData = await Promise.all(sundmusedDataPromise);
//           var moodunudData = await Promise.all(moodunudDataPromise);
//
//           con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var pealkirjadData = [];
//             for (var i = 0; i < result.length; i++) {
//               var pealkiri = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               pealkirjadData.push(pealkiri);
//             }
//             res.render("home", {
//               pageTitle: pageTitle,
//               currentPage: currentPage,
//               paiseikoon: paiseikoon,
//               plakatid: plakatid,
//               avalehtTekstidData: avalehtTekstidData,
//               avalehtPildidData: avalehtPildidData,
//               sundmusedData: sundmusedData,
//               moodunudData: moodunudData,
//               pealkirjadData: pealkirjadData
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
//
//
// app.get("/en/about-us", function(req, res) {
//   var pageTitle = "About us";
//   var currentPage = "koorist";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM sissejuhatuspildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var avapilt = {
//         url: result[0].url,
//         filename: result[0].url.slice(5)
//       };
//       con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var pealkirjadData = [];
//         for (var i = 0; i < result.length; i++) {
//           var pealkiri = {
//             est: result[i].est,
//             en: result[i].en
//           };
//           pealkirjadData.push(pealkiri);
//         }
//
//         con.query("SELECT * FROM sissejuhatustekstid ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var sissejuhatusData = {
//             pealkiri: {
//               est: result[0].est,
//               en: result[0].en
//             },
//             loigud: []
//           };
//           for (var i = 1; i < result.length; i++) {
//             var loik = {
//               est: result[i].est,
//               en: result[i].en
//             };
//             sissejuhatusData.loigud.push(loik);
//           }
//           con.query("SELECT * FROM liikmed ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var liikmedData = {
//               haaleruhmaNimed: [{
//                 est: result[0].est,
//                 en: result[0].en
//               }, {
//                 est: result[1].est,
//                 en: result[1].en
//               }, {
//                 est: result[2].est,
//                 en: result[2].en
//               }, {
//                 est: result[3].est,
//                 en: result[3].en
//               }],
//               haaleruhmaTutvustused: [{
//                 est: result[4].est,
//                 en: result[4].en
//               }, {
//                 est: result[5].est,
//                 en: result[5].en
//               }, {
//                 est: result[6].est,
//                 en: result[6].en
//               }, {
//                 est: result[7].est,
//                 en: result[7].en
//               }],
//               lauljadPealkiri: {
//                 est: result[8].est,
//                 en: result[8].en
//               },
//               sopranid: result[9].est,
//               aldid: result[10].est,
//               tenorid: result[11].est,
//               bassid: result[12].est,
//               vilistlastePealkiri: {
//                 est: result[13].est,
//                 en: result[13].en
//               },
//               vilistlasteNimekiri: {
//                 est: result[14].est,
//                 en: result[14].en
//               },
//               loigud: []
//             };
//             for (var i = 15; i < result.length; i++) {
//               var loik = {
//                 name: result[i].name,
//                 est: result[i].est,
//                 en: result[i].en,
//               };
//               liikmedData.loigud.push(loik);
//             }
//
//             // find the dynamic tables from the database ("dirigendid" and "ajalugu") and sort them into groups accordingly
//
//             var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//             con.query(sql, async function(err, result) {
//               if (err) throw err;
//
//               var dirigendidTableNames = [];
//               var ajaluguTableNames = [];
//
//               for (var i = 0; i < result.length; i++) {
//
//                 var tableName = (result[i].table_name);
//
//                 if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
//
//                   dirigendidTableNames.push(tableName);
//
//                 } else if (tableName.indexOf("ajalugu") !== -1 && tableName.indexOf("sissekanded") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//                   ajaluguTableNames.push(tableName);
//
//                 }
//               }
//
//               var sortedDirigendidTableNames = dirigendidTableNames.sort(function(a, b) {
//                 return a - b;
//               });
//
//               var sortedAjaluguTableNames = ajaluguTableNames.sort(function(a, b) {
//                 return a - b;
//               });
//
//               // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//               // this is necessary, because we often need to wait for database queries,
//               // but because we need to have loops in our code, we cannot use callbacks like we normally do
//               // (for this advanced js code, we also use new arrow functions)
//
//
//               // a function, which returns a promise that will be resolved to a "dirigent" object once the database query has completed,
//               // takes an argument, which is the relevant database table name
//
//               const constructDirigendidPromise = tableName => {
//
//                 return new Promise((resolve, reject) => {
//
//                   con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                     if (err) throw err;
//
//                     var dirigent = {
//                       nimi: result[0].est,
//                       loigud: []
//                     };
//                     for (let b = 1; b < result.length; b++) {
//                       var loik = {
//                         est: result[b].est,
//                         en: result[b].en
//                       };
//                       dirigent.loigud.push(loik);
//                     }
//                     if (err) {
//                       reject(err);
//                     } else {
//                       resolve(dirigent);
//                     }
//                   });
//                 });
//               };
//
//
//               // a function, which returns a promise that will be resolved to a "ajaluguSektsioon" object once the database query has completed,
//               // takes an argument, which is the relevant database table name
//
//               const constructAjaluguPromise = tableName => {
//
//                 return new Promise((resolve, reject) => {
//
//                   con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                     if (err) throw err;
//
//                     var ajaluguSektsioon = {
//                       pealkiri: {
//                         est: result[0].est,
//                         en: result[0].en
//                       },
//                       loigud: []
//                     };
//                     for (let b = 1; b < result.length; b++) {
//                       var loik = {
//                         est: result[b].est,
//                         en: result[b].en
//                       };
//                       ajaluguSektsioon.loigud.push(loik);
//                     }
//                     if (err) {
//                       reject(err);
//                     } else {
//                       resolve(ajaluguSektsioon);
//                     }
//                   });
//                 });
//               };
//
//               // create an array of the "dirigent" promises constructed above, using the map method
//
//               const dirigendidDataPromise = sortedDirigendidTableNames.map(async tableName => {
//
//                 const dirigent = await constructDirigendidPromise(tableName);
//
//                 return dirigent;
//               });
//
//               // wait for all the promises to be resolved into an array of "dirigent" objects
//
//               var dirigendidData = await Promise.all(dirigendidDataPromise);
//
//
//               // create an array of the "ajaluguSektsioon" promises constructed above, using the map method
//
//               const ajaluguDataPromise = sortedAjaluguTableNames.map(async tableName => {
//
//                 const ajaluguSektsioon = await constructAjaluguPromise(tableName);
//
//                 return ajaluguSektsioon;
//               });
//
//               // wait for all the promises to be resolved into an array of "dirigent" objects
//
//               var ajaluguSektsioonidData = await Promise.all(ajaluguDataPromise);
//
//               con.query("SELECT * FROM dirigendidpildid ORDER by id", function(err, result) {
//                 if (err) throw err;
//                 var portreed = [];
//                 for (var i = 0; i < result.length; i++) {
//                   var portree = {
//                     url: result[i].url,
//                     filename: result[i].url.slice(5)
//                   };
//                   portreed.push(portree);
//                 }
//                 con.query("SELECT * FROM ajalugusissejuhatus ORDER BY id", function(err, result) {
//                   if (err) throw err;
//                   var ajaluguSissejuhatusData = {
//                     pealkiri: {
//                       est: result[0].est,
//                       en: result[0].en
//                     },
//                     loigud: []
//                   };
//                   for (var i = 1; i < result.length; i++) {
//                     var loik = {
//                       est: result[i].est,
//                       en: result[i].en
//                     };
//                     ajaluguSissejuhatusData.loigud.push(loik);
//                   }
//                   con.query("SELECT * FROM ajalugusissekanded ORDER by id", function(err, result) {
//                     if (err) throw err;
//                     var ajaluguSissekandedData = {
//                       pealkiri: {
//                         est: result[0].est,
//                         en: result[0].en
//                       },
//                       sissekanded: []
//                     };
//
//                     for (var i = 1; i < result.length; i++) {
//
//                       var sissekanne = {
//                         aasta: result[i].year,
//                         est: result[i].est,
//                         en: result[i].en
//                       };
//                       ajaluguSissekandedData.sissekanded.push(sissekanne);
//                     }
//                     con.query("SELECT * FROM meedia ORDER BY id", function(err, result) {
//                       if (err) throw err;
//                       var meediaSissejuhatusData = {
//                         pealkiri: {
//                           est: result[0].est,
//                           en: result[0].en,
//                         },
//                         loigud: []
//                       };
//                       for (var i = 1; i < result.length; i++) {
//                         var loik = {
//                           est: result[i].est,
//                           en: result[i].en
//                         };
//                         meediaSissejuhatusData.loigud.push(loik);
//                       }
//                       con.query("SELECT * FROM meediavideod ORDER BY id", function(err, result) {
//                         if (err) throw err;
//                         var meediaVideodData = {
//                           pealkiri: {
//                             est: result[0].est,
//                             en: result[0].en,
//                           },
//                           manustamislingid: []
//                         };
//                         for (var i = 1; i < result.length; i++) {
//                           var manustamislink = result[i].link;
//                           meediaVideodData.manustamislingid.push(manustamislink);
//                         }
//                         con.query("SELECT * FROM meedialingid ORDER BY id", function(err, result) {
//                           if (err) throw err;
//                           var meediaLingidData = {
//                             pealkiri: {
//                               est: result[0].est,
//                               en: result[0].en,
//                             },
//                             lingid: []
//                           };
//                           for (var i = 1; i < result.length; i++) {
//                             var link = {
//                               est: result[i].est,
//                               en: result[i].en,
//                               link: result[i].link
//                             };
//                             meediaLingidData.lingid.push(link);
//                           }
//                           con.query("SELECT * FROM toetajad ORDER BY id", function(err, result) {
//                             if (err) throw err;
//                             var toetajadData = [];
//                             for (var i = 0; i < result.length; i++) {
//                               var logo = {
//                                 link: result[i].link,
//                                 filename: result[i].url.slice(5),
//                                 url: result[i].url
//                               };
//                               toetajadData.push(logo);
//                             }
//                             res.render("about-us", {
//                               pageTitle: pageTitle,
//                               currentPage: currentPage,
//                               paiseikoon: paiseikoon,
//                               avapilt: avapilt,
//                               pealkirjadData: pealkirjadData,
//                               sissejuhatusData: sissejuhatusData,
//                               liikmedData: liikmedData,
//                               portreed: portreed,
//                               dirigendidData: dirigendidData,
//                               ajaluguSissejuhatusData: ajaluguSissejuhatusData,
//                               ajaluguSissekandedData: ajaluguSissekandedData,
//                               ajaluguSektsioonidData: ajaluguSektsioonidData,
//                               meediaSissejuhatusData: meediaSissejuhatusData,
//                               meediaVideodData: meediaVideodData,
//                               meediaLingidData: meediaLingidData,
//                               toetajadData: toetajadData
//                             });
//                           });
//                         });
//                       });
//                     });
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// app.get("/en/shop", function(req, res) {
//   var pageTitle = "Shop";
//   var currentPage = "pood";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM poodsissejuhatus ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var poodSissejuhatusData = {
//         loigud: []
//       };
//       for (var i = 0; i < result.length; i++) {
//         var loik = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         poodSissejuhatusData.loigud.push(loik);
//       }
//       // find the dynamic "pood" tables from the database and sort them into an array
//
//       var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//       con.query(sql, async function(err, result) {
//         if (err) throw err;
//
//         var poodTableNames = [];
//         var nimistuTableNames = [];
//
//         for (var i = 0; i < result.length; i++) {
//
//           var tableName = (result[i].table_name);
//
//           if (tableName.indexOf("pood") !== -1 && tableName.indexOf("pildid") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//             poodTableNames.push(tableName);
//
//           } else if (tableName.indexOf("nimistu") !== -1) {
//
//             nimistuTableNames.push(tableName);
//           }
//         }
//
//         var sortedPoodTableNames = poodTableNames.sort(function(a, b) {
//           return a - b;
//         });
//
//         var sortedNimistuTableNames = nimistuTableNames.sort(function(a, b) {
//           return a - b;
//         });
//
//
//         // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//         // this is necessary, because we often need to wait for database queries,
//         // but because we need to have loops in our code, we cannot use callbacks like we normally do
//         // (for this advanced js code, we also use new arrow functions)
//
//
//         // a function, which returns a promise that will be resolved to a "pood" object once the database query has completed,
//         // takes an argument, which is the relevant database table name
//
//
//         const constructPoodPromise = tableName => {
//
//           return new Promise((resolve, reject) => {
//
//             con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//               if (err) throw err;
//
//               var pood = {
//                 toode: {
//                   est: result[0].est,
//                   en: result[0].en,
//                   price: result[0].price
//                 },
//                 loigud: [],
//               };
//               for (let b = 1; b < result.length; b++) {
//                 var loik = {
//                   est: result[b].est,
//                   en: result[b].en,
//                 };
//                 pood.loigud.push(loik);
//               }
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(pood);
//               }
//             });
//           });
//         };
//
//         // a function, which returns a promise that will be resolved to a "nimistu" object once the database query has completed,
//         // takes an argument, which is the relevant database table name
//
//         const constructNimistuPromise = tableName => {
//
//           return new Promise((resolve, reject) => {
//
//             con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//               if (err) throw err;
//
//               var nimistu = {
//                 read: []
//               };
//
//               for (let b = 0; b < result.length; b++) {
//                 var rida = {
//                   est: result[b].est,
//                   en: result[b].en,
//                 };
//                 nimistu.read.push(rida);
//               }
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(nimistu);
//               }
//             });
//           });
//         };
//
//         // create an array of the "pood" promises constructed above, using the map method
//
//         const poodDataPromise = sortedPoodTableNames.map(async tableName => {
//
//           const pood = await constructPoodPromise(tableName);
//
//           return pood;
//         });
//
//         // create an array of the "nimistu" promises constructed above, using the map method
//
//         const nimistuDataPromise = sortedNimistuTableNames.map(async tableName => {
//
//           const nimistu = await constructNimistuPromise(tableName);
//
//           return nimistu;
//         });
//
//         // wait for all the promises to be resolved into an array of "pood" and "nimistu" objects
//
//         var poodData = await Promise.all(poodDataPromise);
//         var nimistuData = await Promise.all(nimistuDataPromise);
//
//         con.query("SELECT * FROM poodpildid ORDER by id", function(err, result) {
//           if (err) throw err;
//           var pildid = [];
//           for (var i = 0; i < result.length; i++) {
//             var pilt = {
//               url: result[i].url,
//               filename: result[i].url.slice(5)
//             };
//             pildid.push(pilt);
//           }
//           con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var pealkirjadData = [];
//             for (var i = 0; i < result.length; i++) {
//               var pealkiri = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               pealkirjadData.push(pealkiri);
//             }
//             res.render("shop", {
//               pageTitle: pageTitle,
//               currentPage: currentPage,
//               paiseikoon: paiseikoon,
//               pealkirjadData: pealkirjadData,
//               poodSissejuhatusData: poodSissejuhatusData,
//               poodData: poodData,
//               nimistuData: nimistuData,
//               pildid: pildid,
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
//
// app.get("/en/events", function(req, res) {
//   var pageTitle = "Events";
//   var currentPage = "sundmused";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM sundmusedpildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var plakatid = [];
//       for (var i = 0; i < result.length; i++) {
//         var plakat = {
//           url: result[i].url,
//           filename: result[i].url.slice(5)
//         };
//         plakatid.push(plakat);
//       }
//       con.query("SELECT * FROM moodunudpildid ORDER BY id DESC", function(err, result) {
//         if (err) throw err;
//         var moodunudPlakatid = [];
//         for (var i = 0; i < result.length; i++) {
//           var plakat = {
//             url: result[i].url,
//             filename: result[i].url.slice(5)
//           };
//           moodunudPlakatid.push(plakat);
//         }
//         con.query("SELECT * FROM sundmusedsissejuhatus ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var sundmusedSissejuhatusData = [];
//           for (var i = 0; i < result.length; i++) {
//             var loik = {
//               est: result[i].est,
//               en: result[i].en
//             };
//             sundmusedSissejuhatusData.push(loik);
//           }
//
//           // find the dynamic tables from the database ("sundmused", "sundmusedkoht", "moodunud", "moodunudkoht") and sort them into groups accordingly
//
//           var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//           con.query(sql, async function(err, result) {
//             if (err) throw err;
//
//             var tableNamesSundmused = [];
//             var tableNamesSundmusedKoht = [];
//             var tableNamesMoodunud = [];
//             var tableNamesMoodunudKoht = [];
//
//             for (var i = 0; i < result.length; i++) {
//
//               var tableName = (result[i].table_name);
//
//               if (tableName.indexOf("sundmused") !== -1 &&
//                 tableName.indexOf("pildid") === -1 &&
//                 tableName.indexOf("sissejuhatus") === -1 &&
//                 tableName.indexOf("koht") === -1) {
//
//                 tableNamesSundmused.push(tableName);
//
//               } else if (tableName.indexOf("sundmusedkoht") !== -1) {
//                 tableNamesSundmusedKoht.push(tableName);
//
//               } else if (tableName.indexOf("moodunud") !== -1 &&
//                 tableName.indexOf("pildid") === -1 &&
//                 tableName.indexOf("koht") === -1) {
//
//                 tableNamesMoodunud.push(tableName);
//
//               } else if (tableName.indexOf("moodunudkoht") !== -1) {
//                 tableNamesMoodunudKoht.push(tableName);
//               }
//             }
//
//             var sortedTableNamesSundmused = tableNamesSundmused.sort(function(a, b) {
//               return a - b;
//             });
//
//             var sortedTableNamesSundmusedKoht = tableNamesSundmusedKoht.sort(function(a, b) {
//               return a - b;
//             });
//
//             var sortedTableNamesMoodunud = tableNamesMoodunud.reverse();
//
//             var sortedTableNamesMoodunudKoht = tableNamesMoodunudKoht.reverse();
//
//             // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//             // this is necessary, because we often need to wait for database queries,
//             // but because we need to have loops in our code, we cannot use callbacks like we normally do
//             // (for this advanced js code, we also use new arrow functions)
//
//
//             // functions (one for each database table associated with a dynamic "sundmused", "sundmusedkoht", "moodunud" or "moodunudkoht" subform),
//             // which will each return a promise that will be resolved to an array once the database query has completed,
//             // these functions take an argument, which is the relevant database table name
//
//             const constructSundmusedPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmus = {
//                     pealkiri: {
//                       est: result[0].est,
//                       en: result[0].en
//                     },
//                     loigud: []
//                   };
//                   for (let b = 1; b < result.length; b++) {
//                     var loik = {
//                       est: result[b].est,
//                       en: result[b].en
//                     };
//                     sundmus.loigud.push(loik);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmus);
//                   }
//                 });
//               });
//             };
//
//             const constructSundmusedKohtPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmusKoht = {
//                     kohad: []
//                   };
//                   for (let b = 0; b < result.length; b++) {
//                     var koht = {
//                       est: result[b].est,
//                       en: result[b].en,
//                       link: result[b].link
//                     };
//                     sundmusKoht.kohad.push(koht);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmusKoht);
//                   }
//                 });
//               });
//             };
//
//             const constructMoodunudPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmus = {
//                     pealkiri: {
//                       est: result[0].est,
//                       en: result[0].en
//                     },
//                     loigud: []
//                   };
//                   for (let b = 1; b < result.length; b++) {
//                     var loik = {
//                       est: result[b].est,
//                       en: result[b].en
//                     };
//                     sundmus.loigud.push(loik);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmus);
//                   }
//                 });
//               });
//             };
//
//             const constructMoodunudKohtPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmusKoht = {
//                     kohad: []
//                   };
//                   for (let b = 0; b < result.length; b++) {
//                     var koht = {
//                       est: result[b].est,
//                       en: result[b].en,
//                       link: result[b].link
//                     };
//                     sundmusKoht.kohad.push(koht);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmusKoht);
//                   }
//                 });
//               });
//             };
//
//
//
//             // create arrays of the promises constructed above, using the map method
//
//             const sundmusedDataPromise = sortedTableNamesSundmused.map(async tableNameSundmused => {
//
//               const sundmused = await constructSundmusedPromise(tableNameSundmused);
//
//               return sundmused;
//             });
//
//
//             const sundmusedKohtDataPromise = sortedTableNamesSundmusedKoht.map(async tableNameSundmusedKoht => {
//
//               const sundmusedKoht = await constructSundmusedKohtPromise(tableNameSundmusedKoht);
//
//               return sundmusedKoht;
//             });
//
//             const moodunudDataPromise = sortedTableNamesMoodunud.map(async tableNameMoodunud => {
//
//               const moodunud = await constructMoodunudPromise(tableNameMoodunud);
//
//               return moodunud;
//             });
//
//
//             const moodunudKohtDataPromise = sortedTableNamesMoodunudKoht.map(async tableNameMoodunudKoht => {
//
//               const moodunudKoht = await constructMoodunudKohtPromise(tableNameMoodunudKoht);
//
//               return moodunudKoht;
//             });
//
//
//             // wait for all the promises to be resolved into four arrays
//
//             var sundmusedData = await Promise.all(sundmusedDataPromise);
//             var sundmusedKohtData = await Promise.all(sundmusedKohtDataPromise);
//             var moodunudData = await Promise.all(moodunudDataPromise);
//             var moodunudKohtData = await Promise.all(moodunudKohtDataPromise);
//
//             con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var pealkirjadData = [];
//               for (var i = 0; i < result.length; i++) {
//                 var pealkiri = {
//                   est: result[i].est,
//                   en: result[i].en
//                 };
//                 pealkirjadData.push(pealkiri);
//               }
//               res.render("events", {
//                 pageTitle: pageTitle,
//                 currentPage: currentPage,
//                 paiseikoon: paiseikoon,
//                 pealkirjadData: pealkirjadData,
//                 plakatid: plakatid,
//                 sundmusedSissejuhatusData: sundmusedSissejuhatusData,
//                 sundmusedData: sundmusedData,
//                 sundmusedKohtData: sundmusedKohtData,
//                 moodunudPlakatid: moodunudPlakatid,
//                 moodunudData: moodunudData,
//                 moodunudKohtData: moodunudKohtData,
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// app.get("/en/contact", function(req, res) {
//   var pageTitle = "Contact";
//   var currentPage = "kontakt";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM kontaktsissejuhatus ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var kontaktSissejuhatusData = {
//         loigud: []
//       };
//       for (var i = 0; i < result.length; i++) {
//         var loik = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         kontaktSissejuhatusData.loigud.push(loik);
//       }
//       con.query("SELECT * FROM kontaktuldine ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var kontaktUldineData = {
//           pealkiri: {
//             est: result[0].est,
//             en: result[0].en
//           },
//           loigud: []
//         };
//         for (var i = 1; i < result.length; i++) {
//           var loik = {
//             est: result[i].est,
//             en: result[i].en
//           };
//           kontaktUldineData.loigud.push(loik);
//         }
//         con.query("SELECT * FROM kontaktandmed ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var kontaktAndmedData = {
//             pealkiri: {
//               est: result[0].est,
//               en: result[0].en
//             },
//             paarid: []
//           };
//           for (var i = 1; i < result.length; i++) {
//             var teave = {
//               estKey: result[i].estkey,
//               enKey: result[i].enkey,
//               est: result[i].est,
//               en: result[i].en
//             };
//             kontaktAndmedData.paarid.push(teave);
//           }
//           con.query("SELECT * FROM kontaktnumbrid ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var kontaktNumbridData = {
//               pealkiri: {
//                 est: result[0].est,
//                 en: result[0].en
//               },
//               numbrid: []
//             };
//             for (var i = 1; i < result.length; i++) {
//               var number = {
//                 estKey: result[i].estkey,
//                 enKey: result[i].enkey,
//                 number: result[i].number,
//               };
//               kontaktNumbridData.numbrid.push(number);
//             }
//             con.query("SELECT * FROM kontaktmtu ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var kontaktMtuData = {
//                 pealkiri: {
//                   est: result[0].est,
//                   en: result[0].en
//                 },
//                 paarid: []
//               };
//               for (var i = 1; i < result.length; i++) {
//                 var teave = {
//                   estKey: result[i].estkey,
//                   enKey: result[i].enkey,
//                   est: result[i].est,
//                   en: result[i].en,
//                 };
//                 kontaktMtuData.paarid.push(teave);
//               }
//               con.query("SELECT * FROM vastuvotttekstid ORDER BY id", function(err, result) {
//                 if (err) throw err;
//                 var vastuvottTekstidData = {
//                   pealkiri: {
//                     est: result[0].est,
//                     en: result[0].en,
//                   },
//                   loigud: []
//                 };
//                 for (var i = 1; i < result.length; i++) {
//                   var loik = {
//                     est: result[i].est,
//                     en: result[i].en
//                   };
//                   vastuvottTekstidData.loigud.push(loik);
//                 }
//                 con.query("SELECT * FROM vastuvottankeet ORDER BY id", function(err, result) {
//                   if (err) throw err;
//                   var vastuvottAnkeetData = {
//                     pealkiri: {
//                       est: result[0].est,
//                       en: result[0].en
//                     },
//                     valjad: []
//                   };
//                   for (var i = 1; i < result.length; i++) {
//                     var vali = {
//                       est: result[i].est,
//                       en: result[i].en,
//                       checked: result[i].checked,
//                       textArea: result[i].textarea
//                     };
//                     vastuvottAnkeetData.valjad.push(vali);
//                   }
//                   con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//                     if (err) throw err;
//                     var pealkirjadData = [];
//                     for (var i = 0; i < result.length; i++) {
//                       var pealkiri = {
//                         est: result[i].est,
//                         en: result[i].en
//                       };
//                       pealkirjadData.push(pealkiri);
//                     }
//                     res.render("contact", {
//                       pageTitle: pageTitle,
//                       currentPage: currentPage,
//                       paiseikoon: paiseikoon,
//                       pealkirjadData: pealkirjadData,
//                       kontaktSissejuhatusData: kontaktSissejuhatusData,
//                       kontaktUldineData: kontaktUldineData,
//                       kontaktAndmedData: kontaktAndmedData,
//                       kontaktNumbridData: kontaktNumbridData,
//                       kontaktMtuData: kontaktMtuData,
//                       vastuvottTekstidData: vastuvottTekstidData,
//                       vastuvottAnkeetData: vastuvottAnkeetData
//                     });
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
//
// app.get("/en/order" + ":number", function(req, res) {
//   var number = req.params.number;
//   var pageTitle = "Order";
//   var currentPage = "telli" + number;
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM telli ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var telliData = {
//         loigud: []
//       };
//       for (var i = 0; i < result.length; i++) {
//         var loik = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         telliData.loigud.push(loik);
//       }
//       con.query("SELECT * FROM telliankeet ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var telliAnkeetData = {
//           pealkiri: {
//             est: result[0].est,
//             en: result[0].en
//           },
//           jarelloik: {
//             est: result[1].est,
//             en: result[1].en
//           },
//           valjad: []
//         };
//         for (var i = 2; i < result.length; i++) {
//           var vali = {
//             est: result[i].est,
//             en: result[i].en,
//             checked: result[i].checked,
//             textArea: result[i].textarea
//           };
//           telliAnkeetData.valjad.push(vali);
//         }
//         // find the dynamic "pood" tables from the database and sort them into an array
//
//         var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//         con.query(sql, async function(err, result) {
//           if (err) throw err;
//
//           var poodTableNames = [];
//
//           for (var i = 0; i < result.length; i++) {
//
//             var tableName = (result[i].table_name);
//
//             if (tableName.indexOf("pood") !== -1 && tableName.indexOf("pildid") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//               poodTableNames.push(tableName);
//             }
//           }
//
//           var sortedPoodTableNames = poodTableNames.sort(function(a, b) {
//             return a - b;
//           });
//
//
//           // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//           // this is necessary, because we often need to wait for database queries,
//           // but because we need to have loops in our code, we cannot use callbacks like we normally do
//           // (for this advanced js code, we also use new arrow functions)
//
//
//           // a function, which returns a promise that will be resolved to a "pood" object once the database query has completed,
//           // takes an argument, which is the relevant database table name
//
//
//           const constructPoodPromise = tableName => {
//
//             return new Promise((resolve, reject) => {
//
//               con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                 if (err) throw err;
//
//                 var pood = {
//                   toode: {
//                     est: result[0].est,
//                     en: result[0].en,
//                     price: result[0].price
//                   },
//                   loigud: []
//                 };
//                 for (let b = 1; b < result.length; b++) {
//                   var loik = {
//                     est: result[b].est,
//                     en: result[b].en,
//                     price: result[b].price
//                   };
//                   pood.loigud.push(loik);
//                 }
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(pood);
//                 }
//               });
//             });
//           };
//
//
//           // create an array of the "pood" promises constructed above, using the map method
//
//           const poodDataPromise = sortedPoodTableNames.map(async tableName => {
//
//             const pood = await constructPoodPromise(tableName);
//
//             return pood;
//           });
//
//           // wait for all the promises to be resolved into an array of "pood" objects
//
//           var poodData = await Promise.all(poodDataPromise);
//           con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var pealkirjadData = [];
//             for (var i = 0; i < result.length; i++) {
//               var pealkiri = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               pealkirjadData.push(pealkiri);
//             }
//             res.render("order", {
//               pageTitle: pageTitle,
//               currentPage: currentPage,
//               number: number,
//               paiseikoon: paiseikoon,
//               pealkirjadData: pealkirjadData,
//               telliData: telliData,
//               telliAnkeetData: telliAnkeetData,
//               poodData: poodData
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// app.get("/en/order/success", function(req, res) {
//   var pageTitle = "Order submitted";
//   var currentPage = "telli/onnestumine";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("success_order", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
// app.get("/en/contact/success", function(req, res) {
//   var pageTitle = "Registration complete";
//   var currentPage = "kontakt/onnestumine";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("success_contact", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
// app.get("/en/order/failure", function(req, res) {
//   var pageTitle = "Order unsuccessful";
//   var currentPage = "telli/nurjunud";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("failure_order", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
// app.get("/en/contact/failure", function(req, res) {
//   var pageTitle = "Registration unsuccessful";
//   var currentPage = "telli/nurjunud";
//   con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var paiseikoon = {
//       url: result[0].url,
//       filename: result[0].url.slice(5)
//     };
//     con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var pealkirjadData = [];
//       for (var i = 0; i < result.length; i++) {
//         var pealkiri = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         pealkirjadData.push(pealkiri);
//       }
//       res.render("failure_contact", {
//         pageTitle: pageTitle,
//         currentPage: currentPage,
//         paiseikoon: paiseikoon,
//         pealkirjadData: pealkirjadData
//       });
//     });
//   });
// });
//
//
// // admin routes
//
// app.get("/admin", function(req, res) {
//   res.redirect("admin/avaleht");
// });
//
// app.get("/admin/avaleht", function(req, res) {
//
//   if (req.session.loggedIn === true) {
//
//     var pageTitle = "admin/avaleht";
//     var routeName = "/";
//     con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var paiseikoon = {
//         url: result[0].url,
//         filename: result[0].url.slice(5)
//       };
//       con.query("SELECT * FROM avalehtpildid ORDER BY id", function query(err, result) {
//         if (err) throw err;
//         var avalehtPildidData = {
//           avalehtLogo: {
//             url: result[1].url,
//             filename: result[1].url.slice(5)
//           },
//           avalehtTaustapilt: {
//             url: result[2].url,
//             filename: result[2].url.slice(5)
//           }
//         };
//         con.query("SELECT * FROM avalehttekstid ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var avalehtTekstidData = {
//             suurPealkiri: {
//               est: result[0].est,
//               en: result[0].en
//             },
//             jatkuPealkiri: {
//               est: result[1].est,
//               en: result[1].en
//             },
//             sektsiooniPealkiri1: {
//               est: result[2].est,
//               en: result[2].en
//             },
//             sektsiooniTekst1: {
//               est: result[3].est,
//               en: result[3].en
//             },
//             sektsiooniPealkiri2: {
//               est: result[4].est,
//               en: result[4].en
//             },
//             sektsiooniTekst2: {
//               est: result[5].est,
//               en: result[5].en
//             }
//           };
//           res.render("admin_avaleht", {
//             pageTitle: pageTitle,
//             routeName: routeName,
//             paiseikoon: paiseikoon,
//             avalehtTekstidData: avalehtTekstidData,
//             avalehtPildidData: avalehtPildidData
//           });
//         });
//       });
//     });
//   } else {
//     res.redirect("/login");
//   }
// });
//
// app.get("/admin/koorist", function(req, res) {
//   if (req.session.loggedIn === true) {
//     var pageTitle = "admin/koorist";
//     var routeName = "/koorist";
//     con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var paiseikoon = {
//         url: result[0].url,
//         filename: result[0].url.slice(5)
//       };
//       con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var pealkirjadData = [];
//         for (var i = 0; i < result.length; i++) {
//           var pealkiri = {
//             est: result[i].est,
//             en: result[i].en
//           };
//           pealkirjadData.push(pealkiri);
//         }
//         con.query("SELECT * FROM sissejuhatuspildid ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var avapilt = {
//             url: result[0].url,
//             filename: result[0].url.slice(5)
//           };
//           con.query("SELECT * FROM sissejuhatustekstid ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var sissejuhatusData = {
//               pealkiri: {
//                 est: result[0].est,
//                 en: result[0].en
//               },
//               loigud: []
//             };
//             for (var i = 1; i < result.length; i++) {
//               var loik = {
//                 name: result[i].name,
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               sissejuhatusData.loigud.push(loik);
//             }
//             con.query("SELECT * FROM liikmed ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var liikmedData = {
//                 haaleruhmaNimed: [{
//                   est: result[0].est,
//                   en: result[0].en
//                 }, {
//                   est: result[1].est,
//                   en: result[1].en
//                 }, {
//                   est: result[2].est,
//                   en: result[2].en
//                 }, {
//                   est: result[3].est,
//                   en: result[3].en
//                 }],
//                 haaleruhmaTutvustused: [{
//                   est: result[4].est,
//                   en: result[4].en
//                 }, {
//                   est: result[5].est,
//                   en: result[5].en
//                 }, {
//                   est: result[6].est,
//                   en: result[6].en
//                 }, {
//                   est: result[7].est,
//                   en: result[7].en
//                 }],
//                 lauljadPealkiri: {
//                   est: result[8].est,
//                   en: result[8].en
//                 },
//                 sopranid: result[9].est,
//                 aldid: result[10].est,
//                 tenorid: result[11].est,
//                 bassid: result[12].est,
//                 vilistlastePealkiri: {
//                   est: result[13].est,
//                   en: result[13].en
//                 },
//                 vilistlasteNimekiri: {
//                   est: result[14].est,
//                   en: result[14].en
//                 },
//                 loigud: []
//               };
//               for (var i = 15; i < result.length; i++) {
//                 var loik = {
//                   name: result[i].name,
//                   est: result[i].est,
//                   en: result[i].en,
//                 };
//                 liikmedData.loigud.push(loik);
//               }
//
//
//
//               // find the dynamic tables from the database ("dirigendid" and "ajalugu") and sort them into groups accordingly
//
//               var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//               con.query(sql, async function(err, result) {
//                 if (err) throw err;
//
//                 var dirigendidTableNames = [];
//                 var ajaluguTableNames = [];
//
//                 for (var i = 0; i < result.length; i++) {
//
//                   var tableName = (result[i].table_name);
//
//                   if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
//
//                     dirigendidTableNames.push(tableName);
//
//                   } else if (tableName.indexOf("ajalugu") !== -1 && tableName.indexOf("sissekanded") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//                     ajaluguTableNames.push(tableName);
//
//                   }
//                 }
//
//                 var sortedDirigendidTableNames = dirigendidTableNames.sort(function(a, b) {
//                   return a - b;
//                 });
//
//                 var sortedAjaluguTableNames = ajaluguTableNames.sort(function(a, b) {
//                   return a - b;
//                 });
//
//                 // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//                 // this is necessary, because we often need to wait for database queries,
//                 // but because we need to have loops in our code, we cannot use callbacks like we normally do
//                 // (for this advanced js code, we also use new arrow functions)
//
//
//                 // a function, which returns a promise that will be resolved to a "dirigent" object once the database query has completed,
//                 // takes an argument, which is the relevant database table name
//
//                 const constructDirigendidPromise = tableName => {
//
//                   return new Promise((resolve, reject) => {
//
//                     con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                       if (err) throw err;
//
//                       var dirigent = {
//                         nimi: result[0].est,
//                         loigud: []
//                       };
//                       for (let b = 1; b < result.length; b++) {
//                         var loik = {
//                           est: result[b].est,
//                           en: result[b].en
//                         };
//                         dirigent.loigud.push(loik);
//                       }
//                       if (err) {
//                         reject(err);
//                       } else {
//                         resolve(dirigent);
//                       }
//                     });
//                   });
//                 };
//
//
//                 // a function, which returns a promise that will be resolved to a "ajaluguSektsioon" object once the database query has completed,
//                 // takes an argument, which is the relevant database table name
//
//                 const constructAjaluguPromise = tableName => {
//
//                   return new Promise((resolve, reject) => {
//
//                     con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                       if (err) throw err;
//
//                       var ajaluguSektsioon = {
//                         pealkiri: {
//                           est: result[0].est,
//                           en: result[0].en
//                         },
//                         loigud: []
//                       };
//                       for (let b = 1; b < result.length; b++) {
//                         var loik = {
//                           est: result[b].est,
//                           en: result[b].en
//                         };
//                         ajaluguSektsioon.loigud.push(loik);
//                       }
//                       if (err) {
//                         reject(err);
//                       } else {
//                         resolve(ajaluguSektsioon);
//                       }
//                     });
//                   });
//                 };
//
//                 // create an array of the "dirigent" promises constructed above, using the map method
//
//                 const dirigendidDataPromise = sortedDirigendidTableNames.map(async tableName => {
//
//                   const dirigent = await constructDirigendidPromise(tableName);
//
//                   return dirigent;
//                 });
//
//                 // wait for all the promises to be resolved into an array of "dirigent" objects
//
//                 var dirigendidData = await Promise.all(dirigendidDataPromise);
//
//
//                 // create an array of the "ajaluguSektsioon" promises constructed above, using the map method
//
//                 const ajaluguDataPromise = sortedAjaluguTableNames.map(async tableName => {
//
//                   const ajaluguSektsioon = await constructAjaluguPromise(tableName);
//
//                   return ajaluguSektsioon;
//                 });
//
//                 // wait for all the promises to be resolved into an array of "dirigent" objects
//
//                 var ajaluguSektsioonidData = await Promise.all(ajaluguDataPromise);
//
//                 con.query("SELECT * FROM dirigendidpildid ORDER by id", function(err, result) {
//                   if (err) throw err;
//                   var portreed = [];
//                   for (var i = 0; i < result.length; i++) {
//                     var portree = {
//                       url: result[i].url,
//                       filename: result[i].url.slice(5)
//                     };
//                     portreed.push(portree);
//                   }
//                   con.query("SELECT * FROM ajalugusissejuhatus ORDER BY id", function(err, result) {
//                     if (err) throw err;
//                     var ajaluguSissejuhatusData = {
//                       pealkiri: {
//                         est: result[0].est,
//                         en: result[0].en
//                       },
//                       loigud: []
//                     };
//                     for (var i = 1; i < result.length; i++) {
//                       var loik = {
//                         est: result[i].est,
//                         en: result[i].en
//                       };
//                       ajaluguSissejuhatusData.loigud.push(loik);
//                     }
//                     con.query("SELECT * FROM ajalugusissekanded ORDER BY id", function(err, result) {
//                       if (err) throw err;
//                       var ajaluguSissekandedData = {
//                         pealkiri: {
//                           est: result[0].est,
//                           en: result[0].en
//                         },
//                         sissekanded: []
//                       };
//
//                       for (var i = 1; i < result.length; i++) {
//                         var sissekanne = {
//                           aasta: result[i].year,
//                           est: result[i].est,
//                           en: result[i].en
//                         };
//                         ajaluguSissekandedData.sissekanded.push(sissekanne);
//                       }
//                       con.query("SELECT * FROM meedia ORDER BY id", function(err, result) {
//                         if (err) throw err;
//                         var meediaSissejuhatusData = {
//                           pealkiri: {
//                             est: result[0].est,
//                             en: result[0].en,
//                           },
//                           loigud: []
//                         };
//                         for (var i = 1; i < result.length; i++) {
//                           var loik = {
//                             est: result[i].est,
//                             en: result[i].en
//                           };
//                           meediaSissejuhatusData.loigud.push(loik);
//                         }
//                         con.query("SELECT * FROM meediavideod ORDER BY id", function(err, result) {
//                           if (err) throw err;
//                           var meediaVideodData = {
//                             pealkiri: {
//                               est: result[0].est,
//                               en: result[0].en,
//                             },
//                             manustamislingid: []
//                           };
//                           for (var i = 1; i < result.length; i++) {
//                             var manustamislink = result[i].link;
//                             meediaVideodData.manustamislingid.push(manustamislink);
//                           }
//                           con.query("SELECT * FROM meedialingid ORDER BY id", function(err, result) {
//                             if (err) throw err;
//                             var meediaLingidData = {
//                               pealkiri: {
//                                 est: result[0].est,
//                                 en: result[0].en,
//                               },
//                               lingid: []
//                             };
//                             for (var i = 1; i < result.length; i++) {
//                               var link = {
//                                 est: result[i].est,
//                                 en: result[i].en,
//                                 link: result[i].link
//                               };
//                               meediaLingidData.lingid.push(link);
//                             }
//                             con.query("SELECT * FROM toetajad ORDER BY id", function(err, result) {
//                               if (err) throw err;
//                               var toetajadData = [];
//                               for (var i = 0; i < result.length; i++) {
//                                 var logo = {
//                                   link: result[i].link,
//                                   filename: result[i].url.slice(5),
//                                   url: result[i].url
//                                 };
//                                 toetajadData.push(logo);
//                               }
//                               res.render("admin_koorist", {
//                                 pageTitle: pageTitle,
//                                 routeName: routeName,
//                                 paiseikoon: paiseikoon,
//                                 avapilt: avapilt,
//                                 pealkirjadData: pealkirjadData,
//                                 sissejuhatusData: sissejuhatusData,
//                                 liikmedData: liikmedData,
//                                 portreed: portreed,
//                                 dirigendidData: dirigendidData,
//                                 ajaluguSissejuhatusData: ajaluguSissejuhatusData,
//                                 ajaluguSissekandedData: ajaluguSissekandedData,
//                                 ajaluguSektsioonidData: ajaluguSektsioonidData,
//                                 meediaSissejuhatusData: meediaSissejuhatusData,
//                                 meediaVideodData: meediaVideodData,
//                                 meediaLingidData: meediaLingidData,
//                                 toetajadData: toetajadData
//                               });
//                             });
//                           });
//                         });
//                       });
//                     });
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   } else {
//     res.redirect("/login");
//   }
// });
//
//
// app.get("/admin/sundmused", function(req, res) {
//   if (req.session.loggedIn === true) {
//     var pageTitle = "admin/sundmused";
//     var routeName = "/sundmused";
//     con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var paiseikoon = {
//         url: result[0].url,
//         filename: result[0].url.slice(5)
//       };
//       con.query("SELECT * FROM sundmusedpildid ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var plakatid = [];
//         for (var i = 0; i < result.length; i++) {
//           var plakat = {
//             url: result[i].url,
//             filename: result[i].url.slice(5)
//           };
//           plakatid.push(plakat);
//         }
//         con.query("SELECT * FROM moodunudpildid ORDER BY id DESC", function(err, result) {
//           if (err) throw err;
//           var moodunudPlakatid = [];
//           for (var i = 0; i < result.length; i++) {
//             var moodunudPlakat = {
//               url: result[i].url,
//               filename: result[i].url.slice(5)
//             };
//             moodunudPlakatid.push(moodunudPlakat);
//           }
//           con.query("SELECT * FROM sundmusedsissejuhatus ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var sundmusedSissejuhatusData = [];
//             for (var i = 0; i < result.length; i++) {
//               var loik = {
//                 est: result[i].est,
//                 en: result[i].en
//               };
//               sundmusedSissejuhatusData.push(loik);
//             }
//
//
//             // find the dynamic tables from the database ("sundmused", "sundmusedkoht", "moodunud", "moodunudkoht") and sort them into groups accordingly
//
//             var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//             con.query(sql, async function(err, result) {
//               if (err) throw err;
//
//               var tableNamesSundmused = [];
//               var tableNamesSundmusedKoht = [];
//               var tableNamesMoodunud = [];
//               var tableNamesMoodunudKoht = [];
//
//               for (var i = 0; i < result.length; i++) {
//
//                 var tableName = (result[i].table_name);
//
//                 if (tableName.indexOf("sundmused") !== -1 &&
//                   tableName.indexOf("pildid") === -1 &&
//                   tableName.indexOf("sissejuhatus") === -1 &&
//                   tableName.indexOf("koht") === -1) {
//
//                   tableNamesSundmused.push(tableName);
//
//                 } else if (tableName.indexOf("sundmusedkoht") !== -1) {
//                   tableNamesSundmusedKoht.push(tableName);
//
//                 } else if (tableName.indexOf("moodunud") !== -1 &&
//                   tableName.indexOf("pildid") === -1 &&
//                   tableName.indexOf("koht") === -1) {
//
//                   tableNamesMoodunud.push(tableName);
//
//                 } else if (tableName.indexOf("moodunudkoht") !== -1) {
//                   tableNamesMoodunudKoht.push(tableName);
//                 }
//               }
//
//               var sortedTableNamesSundmused = tableNamesSundmused.sort(function(a, b) {
//                 return a - b;
//               });
//
//               var sortedTableNamesSundmusedKoht = tableNamesSundmusedKoht.sort(function(a, b) {
//                 return a - b;
//               });
//
//               var sortedTableNamesMoodunud = tableNamesMoodunud.reverse();
//
//               var sortedTableNamesMoodunudKoht = tableNamesMoodunudKoht.reverse();
//
//               // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//               // this is necessary, because we often need to wait for database queries,
//               // but because we need to have loops in our code, we cannot use callbacks like we normally do
//               // (for this advanced js code, we also use new arrow functions)
//
//
//               // functions (one for each database table associated with a dynamic "sundmused", "sundmusedkoht", "moodunud" or "moodunudkoht" subform),
//               // which will each return a promise that will be resolved to an array once the database query has completed,
//               // these functions take an argument, which is the relevant database table name
//
//               const constructSundmusedPromise = tableName => {
//
//                 return new Promise((resolve, reject) => {
//
//                   con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                     if (err) throw err;
//
//                     var sundmus = {
//                       pealkiri: {
//                         est: result[0].est,
//                         en: result[0].en
//                       },
//                       loigud: []
//                     };
//                     for (let b = 1; b < result.length; b++) {
//                       var loik = {
//                         est: result[b].est,
//                         en: result[b].en
//                       };
//                       sundmus.loigud.push(loik);
//                     }
//                     if (err) {
//                       reject(err);
//                     } else {
//                       resolve(sundmus);
//                     }
//                   });
//                 });
//               };
//
//               const constructSundmusedKohtPromise = tableName => {
//
//                 return new Promise((resolve, reject) => {
//
//                   con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                     if (err) throw err;
//
//                     var sundmusKoht = {
//                       kohad: []
//                     };
//                     for (let b = 0; b < result.length; b++) {
//                       var koht = {
//                         est: result[b].est,
//                         en: result[b].en,
//                         link: result[b].link
//                       };
//                       sundmusKoht.kohad.push(koht);
//                     }
//                     if (err) {
//                       reject(err);
//                     } else {
//                       resolve(sundmusKoht);
//                     }
//                   });
//                 });
//               };
//
//               const constructMoodunudPromise = tableName => {
//
//                 return new Promise((resolve, reject) => {
//
//                   con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                     if (err) throw err;
//
//                     var sundmus = {
//                       pealkiri: {
//                         est: result[0].est,
//                         en: result[0].en
//                       },
//                       loigud: []
//                     };
//                     for (let b = 1; b < result.length; b++) {
//                       var loik = {
//                         est: result[b].est,
//                         en: result[b].en
//                       };
//                       sundmus.loigud.push(loik);
//                     }
//                     if (err) {
//                       reject(err);
//                     } else {
//                       resolve(sundmus);
//                     }
//                   });
//                 });
//               };
//
//               const constructMoodunudKohtPromise = tableName => {
//
//                 return new Promise((resolve, reject) => {
//
//                   con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                     if (err) throw err;
//
//                     var sundmusKoht = {
//                       kohad: []
//                     };
//                     for (let b = 0; b < result.length; b++) {
//                       var koht = {
//                         est: result[b].est,
//                         en: result[b].en,
//                         link: result[b].link
//                       };
//                       sundmusKoht.kohad.push(koht);
//                     }
//                     if (err) {
//                       reject(err);
//                     } else {
//                       resolve(sundmusKoht);
//                     }
//                   });
//                 });
//               };
//
//
//
//               // create arrays of the promises constructed above, using the map method
//
//               const sundmusedDataPromise = sortedTableNamesSundmused.map(async tableNameSundmused => {
//
//                 const sundmused = await constructSundmusedPromise(tableNameSundmused);
//
//                 return sundmused;
//               });
//
//
//               const sundmusedKohtDataPromise = sortedTableNamesSundmusedKoht.map(async tableNameSundmusedKoht => {
//
//                 const sundmusedKoht = await constructSundmusedKohtPromise(tableNameSundmusedKoht);
//
//                 return sundmusedKoht;
//               });
//
//               const moodunudDataPromise = sortedTableNamesMoodunud.map(async tableNameMoodunud => {
//
//                 const moodunud = await constructMoodunudPromise(tableNameMoodunud);
//
//                 return moodunud;
//               });
//
//
//               const moodunudKohtDataPromise = sortedTableNamesMoodunudKoht.map(async tableNameMoodunudKoht => {
//
//                 const moodunudKoht = await constructMoodunudKohtPromise(tableNameMoodunudKoht);
//
//                 return moodunudKoht;
//               });
//
//
//               // wait for all the promises to be resolved into four arrays
//
//               var sundmusedData = await Promise.all(sundmusedDataPromise);
//               var sundmusedKohtData = await Promise.all(sundmusedKohtDataPromise);
//               var moodunudData = await Promise.all(moodunudDataPromise);
//               var moodunudKohtData = await Promise.all(moodunudKohtDataPromise);
//
//
//               res.render("admin_sundmused", {
//                 pageTitle: pageTitle,
//                 routeName: routeName,
//                 paiseikoon: paiseikoon,
//                 plakatid: plakatid,
//                 moodunudPlakatid: moodunudPlakatid,
//                 sundmusedSissejuhatusData: sundmusedSissejuhatusData,
//                 sundmusedData: sundmusedData,
//                 sundmusedKohtData: sundmusedKohtData,
//                 moodunudData: moodunudData,
//                 moodunudKohtData: moodunudKohtData
//               });
//             });
//           });
//         });
//       });
//     });
//   } else {
//     res.redirect("/login");
//   }
// });
//
//
//
// app.get("/admin/kontakt", async function(req, res) {
//   var pageTitle = "admin/kontakt";
//   var routeName = "/kontakt";
//   var avalehtPildidData = await getData("static_images", dataModels.getStaticImages);
//   con.query("SELECT * FROM kontaktsissejuhatus ORDER BY id", function(err, result) {
//     if (err) throw err;
//     var kontaktSissejuhatusData = {
//       loigud: []
//     };
//     for (var i = 0; i < result.length; i++) {
//       var loik = {
//         est: result[i].est,
//         en: result[i].en
//       };
//       kontaktSissejuhatusData.loigud.push(loik);
//     }
//     con.query("SELECT * FROM kontaktuldine ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var kontaktUldineData = {
//         pealkiri: {
//           est: result[0].est,
//           en: result[0].en
//         },
//         loigud: []
//       };
//       for (var i = 1; i < result.length; i++) {
//         var loik = {
//           est: result[i].est,
//           en: result[i].en
//         };
//         kontaktUldineData.loigud.push(loik);
//       }
//       con.query("SELECT * FROM kontaktandmed ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var kontaktAndmedData = {
//           pealkiri: {
//             est: result[0].est,
//             en: result[0].en
//           },
//           paarid: []
//         };
//         for (var i = 1; i < result.length; i++) {
//           var teave = {
//             estKey: result[i].estkey,
//             enKey: result[i].enkey,
//             est: result[i].est,
//             en: result[i].en
//           };
//           kontaktAndmedData.paarid.push(teave);
//         }
//         con.query("SELECT * FROM kontaktnumbrid ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var kontaktNumbridData = {
//             pealkiri: {
//               est: result[0].est,
//               en: result[0].en
//             },
//             numbrid: []
//           };
//           for (var i = 1; i < result.length; i++) {
//             var number = {
//               estKey: result[i].estkey,
//               enKey: result[i].enkey,
//               number: result[i].number,
//             };
//             kontaktNumbridData.numbrid.push(number);
//           }
//           con.query("SELECT * FROM kontaktmtu ORDER BY id", function(err, result) {
//             if (err) throw err;
//             var kontaktMtuData = {
//               pealkiri: {
//                 est: result[0].est,
//                 en: result[0].en
//               },
//               paarid: []
//             };
//             for (var i = 1; i < result.length; i++) {
//               var teave = {
//                 estKey: result[i].estkey,
//                 enKey: result[i].enkey,
//                 est: result[i].est,
//                 en: result[i].en,
//               };
//               kontaktMtuData.paarid.push(teave);
//             }
//             con.query("SELECT * FROM vastuvotttekstid ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var vastuvottTekstidData = {
//                 pealkiri: {
//                   est: result[0].est,
//                   en: result[0].en,
//                 },
//                 loigud: []
//               };
//               for (var i = 1; i < result.length; i++) {
//                 var loik = {
//                   est: result[i].est,
//                   en: result[i].en
//                 };
//                 vastuvottTekstidData.loigud.push(loik);
//               }
//               con.query("SELECT * FROM vastuvottankeet ORDER BY id", function(err, result) {
//                 if (err) throw err;
//                 var vastuvottAnkeetData = {
//                   pealkiri: {
//                     est: result[0].est,
//                     en: result[0].en
//                   },
//                   valjad: []
//                 };
//                 for (var i = 1; i < result.length; i++) {
//                   var vali = {
//                     est: result[i].est,
//                     en: result[i].en,
//                     checked: result[i].checked,
//                     textArea: result[i].textarea
//                   };
//                   vastuvottAnkeetData.valjad.push(vali);
//                 }
//                 con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//                   if (err) throw err;
//                   var pealkirjadData = [];
//                   for (var i = 0; i < result.length; i++) {
//                     var pealkiri = {
//                       est: result[i].est,
//                       en: result[i].en
//                     };
//                     pealkirjadData.push(pealkiri);
//                   }
//                   console.log(avalehtPildidData);
//                   res.render("admin_kontakt", {
//                     pageTitle: pageTitle,
//                     routeName: routeName,
//                     paiseikoon: avalehtPildidData.favicon,
//                     kontaktSissejuhatusData: kontaktSissejuhatusData,
//                     kontaktUldineData: kontaktUldineData,
//                     kontaktAndmedData: kontaktAndmedData,
//                     kontaktNumbridData: kontaktNumbridData,
//                     kontaktMtuData: kontaktMtuData,
//                     vastuvottTekstidData: vastuvottTekstidData,
//                     vastuvottAnkeetData: vastuvottAnkeetData,
//                     pealkirjadData: pealkirjadData
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
//
// app.get("/admin/pood", function(req, res) {
//   if (req.session.loggedIn === true) {
//     var pageTitle = "admin/pood";
//     var routeName = "/pood";
//     con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var paiseikoon = {
//         url: result[0].url,
//         filename: result[0].url.slice(5)
//       };
//       con.query("SELECT * FROM poodsissejuhatus ORDER BY id", function(err, result) {
//         if (err) throw err;
//         var poodSissejuhatusData = {
//           loigud: []
//         };
//         for (var i = 0; i < result.length; i++) {
//           var loik = {
//             est: result[i].est,
//             en: result[i].en
//           };
//           poodSissejuhatusData.loigud.push(loik);
//         }
//
//         // find the dynamic "pood" tables from the database and sort them into an array
//
//         var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//         con.query(sql, async function(err, result) {
//           if (err) throw err;
//
//           var poodTableNames = [];
//           var nimistuTableNames = [];
//
//           for (var i = 0; i < result.length; i++) {
//
//             var tableName = (result[i].table_name);
//
//             if (tableName.indexOf("pood") !== -1 && tableName.indexOf("pildid") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//               poodTableNames.push(tableName);
//
//             } else if (tableName.indexOf("nimistu") !== -1) {
//
//               nimistuTableNames.push(tableName);
//             }
//           }
//
//           var sortedPoodTableNames = poodTableNames.sort(function(a, b) {
//             return a - b;
//           });
//
//           var sortedNimistuTableNames = nimistuTableNames.sort(function(a, b) {
//             return a - b;
//           });
//
//
//           // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//           // this is necessary, because we often need to wait for database queries,
//           // but because we need to have loops in our code, we cannot use callbacks like we normally do
//           // (for this advanced js code, we also use new arrow functions)
//
//
//           // a function, which returns a promise that will be resolved to a "pood" object once the database query has completed,
//           // takes an argument, which is the relevant database table name
//
//
//           const constructPoodPromise = tableName => {
//
//             return new Promise((resolve, reject) => {
//
//               con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                 if (err) throw err;
//
//                 var pood = {
//                   toode: {
//                     est: result[0].est,
//                     en: result[0].en,
//                     price: result[0].price
//                   },
//                   loigud: [],
//                 };
//                 for (let b = 1; b < result.length; b++) {
//                   var loik = {
//                     est: result[b].est,
//                     en: result[b].en,
//                   };
//                   pood.loigud.push(loik);
//                 }
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(pood);
//                 }
//               });
//             });
//           };
//
//           // a function, which returns a promise that will be resolved to a "nimistu" object once the database query has completed,
//           // takes an argument, which is the relevant database table name
//
//           const constructNimistuPromise = tableName => {
//
//             return new Promise((resolve, reject) => {
//
//               con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                 if (err) throw err;
//
//                 var nimistu = {
//                   read: []
//                 };
//
//                 for (let b = 0; b < result.length; b++) {
//                   var rida = {
//                     est: result[b].est,
//                     en: result[b].en,
//                   };
//                   nimistu.read.push(rida);
//                 }
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(nimistu);
//                 }
//               });
//             });
//           };
//
//           // create an array of the "pood" promises constructed above, using the map method
//
//           const poodDataPromise = sortedPoodTableNames.map(async tableName => {
//
//             const pood = await constructPoodPromise(tableName);
//
//             return pood;
//           });
//
//           // create an array of the "nimistu" promises constructed above, using the map method
//
//           const nimistuDataPromise = sortedNimistuTableNames.map(async tableName => {
//
//             const nimistu = await constructNimistuPromise(tableName);
//
//             return nimistu;
//           });
//
//           // wait for all the promises to be resolved into an array of "pood" and "nimistu" objects
//
//           var poodData = await Promise.all(poodDataPromise);
//           var nimistuData = await Promise.all(nimistuDataPromise);
//
//           con.query("SELECT * FROM poodpildid ORDER by id", function(err, result) {
//             if (err) throw err;
//             var pildid = [];
//             for (var i = 0; i < result.length; i++) {
//               var pilt = {
//                 url: result[i].url,
//                 filename: result[i].url.slice(5)
//               };
//               pildid.push(pilt);
//             }
//             con.query("SELECT * FROM telli ORDER BY id", function(err, result) {
//               if (err) throw err;
//               var telliData = {
//                 loigud: []
//               };
//               for (var i = 0; i < result.length; i++) {
//                 var loik = {
//                   est: result[i].est,
//                   en: result[i].en
//                 };
//                 telliData.loigud.push(loik);
//               }
//               con.query("SELECT * FROM telliankeet ORDER BY id", function(err, result) {
//                 if (err) throw err;
//                 var telliAnkeetData = {
//                   pealkiri: {
//                     est: result[0].est,
//                     en: result[0].en
//                   },
//                   jarelloik: {
//                     est: result[1].est,
//                     en: result[1].en
//                   },
//                   valjad: []
//                 };
//                 for (var i = 2; i < result.length; i++) {
//                   var vali = {
//                     est: result[i].est,
//                     en: result[i].en,
//                     checked: result[i].checked,
//                     textArea: result[i].textarea
//                   };
//                   telliAnkeetData.valjad.push(vali);
//                 }
//                 con.query("SELECT * FROM pealkirjad ORDER BY id", function(err, result) {
//                   if (err) throw err;
//                   var pealkirjadData = [];
//                   for (var i = 0; i < result.length; i++) {
//                     var pealkiri = {
//                       est: result[i].est,
//                       en: result[i].en
//                     };
//                     pealkirjadData.push(pealkiri);
//                   }
//                   res.render("admin_pood", {
//                     pageTitle: pageTitle,
//                     routeName: routeName,
//                     paiseikoon: paiseikoon,
//                     pealkirjadData: pealkirjadData,
//                     poodSissejuhatusData: poodSissejuhatusData,
//                     poodData: poodData,
//                     nimistuData: nimistuData,
//                     pildid: pildid,
//                     telliData: telliData,
//                     telliAnkeetData: telliAnkeetData
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   } else {
//     res.redirect("/login");
//   }
// });
//
//
// app.get("/admin/arhiiv", function(req, res) {
//   if (req.session.loggedIn === true) {
//     var pageTitle = "Arhiiv";
//     con.query("SELECT * FROM avalehtpildid ORDER BY id", function(err, result) {
//       if (err) throw err;
//       var paiseikoon = {
//         url: result[0].url,
//         filename: result[0].url.slice(5)
//       };
//       con.query("SELECT * FROM moodunudpildid ORDER BY id DESC", function(err, result) {
//         if (err) throw err;
//         var plakatid = [];
//         for (var i = 0; i < result.length; i++) {
//           var plakat = {
//             url: result[i].url,
//             filename: result[i].url.slice(5)
//           };
//           plakatid.push(plakat);
//         }
//         con.query("SELECT * FROM vastuvottankeet ORDER BY id", function(err, result) {
//           if (err) throw err;
//           var vastuvottAnkeetData = {
//             pealkiri: {
//               est: result[0].est,
//               en: result[0].en
//             },
//             valjad: []
//           };
//           for (var i = 1; i < result.length; i++) {
//             var vali = {
//               est: result[i].est,
//               en: result[i].en,
//               checked: result[i].checked,
//               textArea: result[i].textarea
//             };
//             vastuvottAnkeetData.valjad.push(vali);
//           }
//
//           // find the dynamic tables from the database ("moodunud", "moodunudkoht") and sort them into groups accordingly
//
//           var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "' ORDER by table_name";
//
//           con.query(sql, async function(err, result) {
//             if (err) throw err;
//
//             var tableNames = [];
//             var tableNamesKoht = [];
//
//             for (var i = 0; i < result.length; i++) {
//
//               var tableName = (result[i].table_name);
//
//               if (tableName.indexOf("moodunud") !== -1 &&
//                 tableName.indexOf("pildid") === -1 &&
//                 tableName.indexOf("koht") === -1) {
//
//                 tableNames.push(tableName);
//
//               } else if (tableName.indexOf("moodunudkoht") !== -1) {
//
//                 tableNamesKoht.push(tableName);
//
//               }
//             }
//
//             var sortedTableNames = tableNames.reverse();
//
//             var sortedTableNamesKoht = tableNamesKoht.reverse();
//
//             // to get the necessary data for dynamic subforms, we need to use async functions with promises,
//             // this is necessary, because we often need to wait for database queries,
//             // but because we need to have loops in our code, we cannot use callbacks like we normally do
//             // (for this advanced js code, we also use new arrow functions)
//
//
//             // two functions (for the two database tables associated with one dynamic "moodunud" subform),
//             // which will each return a promise that will be resolved to an array once the database query has completed,
//             // these functions take an argument, which is the relevant database table name
//
//             const constructMoodunudPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmus = {
//                     pealkiri: {
//                       est: result[0].est,
//                       en: result[0].en
//                     },
//                     loigud: []
//                   };
//                   for (let b = 1; b < result.length; b++) {
//                     var loik = {
//                       est: result[b].est,
//                       en: result[b].en
//                     };
//                     sundmus.loigud.push(loik);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmus);
//                   }
//                 });
//               });
//             };
//
//             const constructMoodunudKohtPromise = tableName => {
//
//               return new Promise((resolve, reject) => {
//
//                 con.query("SELECT * FROM " + tableName + " ORDER by id", function(err, result) {
//                   if (err) throw err;
//
//                   var sundmusKoht = {
//                     kohad: []
//                   };
//                   for (let b = 0; b < result.length; b++) {
//                     var koht = {
//                       est: result[b].est,
//                       en: result[b].en,
//                       link: result[b].link
//                     };
//                     sundmusKoht.kohad.push(koht);
//                   }
//                   if (err) {
//                     reject(err);
//                   } else {
//                     resolve(sundmusKoht);
//                   }
//                 });
//               });
//             };
//
//
//             // create two arrays of the promises constructed above, using the map method
//
//             const moodunudDataPromise = sortedTableNames.map(async tableName => {
//
//               const moodunud = await constructMoodunudPromise(tableName);
//
//               return moodunud;
//             });
//
//
//             const moodunudKohtDataPromise = sortedTableNamesKoht.map(async tableNameKoht => {
//
//               const moodunudKoht = await constructMoodunudKohtPromise(tableNameKoht);
//
//               return moodunudKoht;
//             });
//
//
//             // wait for all the promises to be resolved into two arrays
//
//             var moodunudData = await Promise.all(moodunudDataPromise);
//             var moodunudKohtData = await Promise.all(moodunudKohtDataPromise);
//
//             res.render("arhiiv", {
//               pageTitle: pageTitle,
//               paiseikoon: paiseikoon,
//               plakatid: plakatid,
//               moodunudData: moodunudData,
//               moodunudKohtData: moodunudKohtData,
//               vastuvottAnkeetData: vastuvottAnkeetData
//             });
//           });
//         });
//       });
//     });
//   } else {
//     res.redirect("/login");
//   }
// });
//
// // POST ROUTES FOR HANDLING DATA POSTED FROM THE CLIENT-SIDE
//
//
// // update the images on the "avaleht" page
//
//
// app.post("/upload/avaleht/pildid", async function(req, res) {
//
//   // setup the upload function using the module "multer, also specifying the storage engine and the names of the file inputs"
//
//   var upload = multer({
//     storage: storage
//   }).fields([{
//       name: "paiseikoon",
//       maxCount: 1
//     },
//     {
//       name: "avalehtLogo",
//       maxCount: 1
//     },
//     {
//       name: "avalehtTaustapilt",
//       maxCount: 1
//     }
//   ]);
//
//   // initialize the upload
//
//   upload(req, res, async function(err) {
//     if (err) throw err;
//
//     // create an array of the values of all the file inputs on the form
//
//     var files = [req.files.paiseikoon, req.files.avalehtLogo, req.files.avalehtTaustapilt];
//
//     for (let i = 0; i < files.length; i++) {
//
//       // for each file, check if it is specified and then setup the database update
//
//       if (files[i] !== undefined) {
//
//         // create variables for each file's filename and also for the name by which it will be referred to in the database
//
//         var urlProperty = "/img/" + files[i][0].originalname;
//         var nameProperty = files[i][0].fieldname;
//
//         // store the urlProperty in a variable in order to pass it into the sql function
//
//         var value = [urlProperty];
//
//         // create the sql text for updating the database (question mark will be replaced by the "value" variable created above)
//
//         var sql = "UPDATE avalehtpildid SET url = ? WHERE name = '" + nameProperty + "'";
//
//         // update the database using the sql text created above
//
//         await updateDatabase(sql, value);
//       }
//     }
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the texts on the "avaleht" page
//
//
// app.post("/upload/avaleht/tekstid", async function(req, res) {
//
//   // convert the JSON data received from the client-side into js objects
//
//   var avalehtTekstidData = JSON.parse(req.body.data);
//
//   // array of entry names that will be updated in the relevant database
//
//   var names = ["suurPealkiri", "jatkuPealkiri", "sektsiooniPealkiri1", "sektsiooniTekst1", "sektsiooniPealkiri2", "sektsiooniTekst2"];
//
//   // the code below will run once for each entry in the array
//   //
//   for (let i = 0; i < names.length; i++) {
//
//     // create a variable for each entry name in the array
//
//     var nameProperty = names[i];
//
//     // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)
//
//     var estProperty = avalehtTekstidData[names[i]].est;
//     var enProperty = avalehtTekstidData[names[i]].en;
//
//     // create a variable for passing the retrieved information to the sql text
//
//     var values = [estProperty, enProperty];
//
//     // create the sql code to update each entry in the database using the data created above (question marks will be replaced by the values in the above variable)
//
//     var sql = "UPDATE avalehttekstid SET est = ?, en = ? WHERE name = '" + nameProperty + "'";
//
//     // run the sql code
//
//     await updateDatabase(sql, values);
//   }
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the headings on the "koorist" page and on the navigation dropdown menus
//
//
// app.post("/upload/pealkirjad", async function(req, res) {
//
//   // convert the JSON data received from the client-side into js objects
//
//   var pealkirjadData = JSON.parse(req.body.data);
//
//   // array of name properties for the database entries
//
//   var names = ["pealkiri1", "pealkiri2", "pealkiri3", "pealkiri4", "pealkiri5", "pealkiri6"];
//
//
//   // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)
//
//   for (var i = 0; i < names.length; i++) {
//
//     var estProperty = pealkirjadData[i].est;
//     var enProperty = pealkirjadData[i].en;
//     var nameProperty = names[i];
//
//     // create a variable for passing the retrieved information to the sql text
//
//     var values = [estProperty, enProperty, nameProperty];
//
//     // create the sql code to update each entry in the database using the data created above
//     // (question marks will be replaced by the values in the above variable)
//
//     var sql = "UPDATE pealkirjad SET est = ?, en = ? WHERE name = ?";
//
//     // run the sql code
//
//     await updateDatabase(sql, values);
//   }
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the "sissejuhatus" entries on the "koorist" page
//
//
// app.post("/upload/sissejuhatus", async function(req, res) {
//
//   // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files
//
//   var upload = multer({
//     storage: storage
//   }).single("avapilt");
//
//   // initialize the upload
//
//   upload(req, res, function(err) {
//     if (err) throw err;
//
//     // if there is a file to be uploaded, update the database as follows:
//
//     if (req.file !== undefined) {
//
//       // get the original filename of the uploaded file and store it in a variable
//
//       var urlProperty = "/img/" + req.file.originalname;
//
//       // create a variable for passing the retrieved value into the sql function
//
//       var valuePilt = [urlProperty];
//
//       // create the sql text for updating the database, using the value stored in "urlProperty"
//
//       var sqlPilt = "UPDATE sissejuhatuspildid SET url = ? WHERE name = 'avapilt'";
//
//       // update the database using the sql text
//
//       updateDatabase(sqlPilt, valuePilt);
//     }
//
//     // retrieve the values of the text inputs for "Pealkiri" and store them in variables
//
//     var estPropertySissejuhatusPealkiri = req.body.sissejuhatusPealkiriEst;
//     var enPropertySissejuhatusPealkiri = req.body.sissejuhatusPealkiriEn;
//
//     // create a values variable for the sql text
//
//     var valuesSissejuhatusPealkiri = [estPropertySissejuhatusPealkiri, enPropertySissejuhatusPealkiri];
//
//     // create the sql text where question marks will be replaced by values in the above variable
//
//     var sqlSissejuhatusPealkiri = "UPDATE sissejuhatustekstid SET est = ?, en =  ? WHERE name = 'pealkiri'";
//
//     // update the database using the sql text and passing in the "valuesPealkiri" variable
//
//     updateDatabase(sqlSissejuhatusPealkiri, valuesSissejuhatusPealkiri);
//
//     // get the input names from the submitted data as an array (They have been sent to the server as object keys)
//
//     var keys = Object.keys(req.body);
//
//     // Get the index of the last element in the keys array
//
//     var index = keys.length - 1;
//
//     // select the last input name in the array and get its last character (which is a number) and also convert it to number data type
//
//     var idNumber = Number(keys[index].slice(18));
//
//     // create empty arrays that will store the data needed for the sql text
//
//     var nameProperties = [];
//     var estPropertyNames = [];
//     var enPropertyNames = [];
//
//     // query the database for the "loik" entries
//
//     con.query("SELECT * FROM sissejuhatustekstid ORDER by ID", async function(err, result) {
//       if (err) throw err;
//
//       // the "loik" entries start from result[1]- retrieve all those and push their name properties into the empty array above
//
//       for (var i = 1; i <= idNumber; i++) {
//         var nameProperty = result[i].name;
//         nameProperties.push(nameProperty);
//       }
//       // the "est" and "en" properties are stored in the form data object as key-value pairs-
//       // first we need to get the number of "loik"-related keys, which is all of them except the first two
//
//       var loikKeysLength = keys.length - 2;
//
//       // There are equal amount of "loikEn" and "loikEst" keys (half the number of total "loik" keys)- let's choose to get the number of "loikEst" keys
//
//       var loikEstKeysLength = loikKeysLength / 2;
//
//       // get the key names for all "loik"-related data (these are always "sissejuhatusLoik" + "En" or "Est" + index number)
//
//       for (var a = 0; a < loikEstKeysLength; a++) {
//
//         // start counting from 1 not 0;
//
//         var indexNumber = a + 1;
//
//         // get the key names
//
//         var estPropertyName = "sissejuhatusLoikEst" + indexNumber;
//         var enPropertyName = "sissejuhatusLoikEn" + indexNumber;
//
//         // push those key names into the empty arrays above
//
//         estPropertyNames.push(estPropertyName);
//         enPropertyNames.push(enPropertyName);
//       }
//
//       // now update all the "loik" entries in the database
//
//       for (var b = 0; b < nameProperties.length; b++) {
//
//         // using the retrieved key names, get the necessary data for each of those keys
//
//         var currentNameValue = nameProperties[b];
//         var currentEstValue = req.body[estPropertyNames[b]];
//         var currentEnValue = req.body[enPropertyNames[b]];
//
//         // create the sql text
//
//         var sqlSissejuhatusLoik = "UPDATE sissejuhatustekstid SET est = ?, en =  ? WHERE name = ?";
//
//         // create the values which will replace the question marks in the sql text
//
//         var valuesSissejuhatusLoik = [currentEstValue, currentEnValue, currentNameValue];
//
//         // update the database
//
//         await updateDatabase(sqlSissejuhatusLoik, valuesSissejuhatusLoik);
//       }
//     });
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
// // upload a new "loik" element to the "sissejuhatus" section on the "koorist" page
//
//
// app.post("/upload/sissejuhatus/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO sissejuhatustekstid (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "sissejuhatus" part of the "koorist" page
//
//
// app.post("/upload/sissejuhatus/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM sissejuhatustekstid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // the "loik" database entries start from the second result and onwards, thus add 1 to the current index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM sissejuhatustekstid WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the "liikmed" section on the "koorist" page
//
//
// app.post("/upload/liikmed", async function(req, res) {
//
//   // convert the JSON data received from the client-side into js objects
//
//   var liikmedData = JSON.parse(req.body.data);
//
//   // array of name properties for the predetermined database entries called "haaleruhmaNimi"
//
//   var names1 = ["haaleruhmaNimi1", "haaleruhmaNimi2", "haaleruhmaNimi3", "haaleruhmaNimi4"];
//
//   // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)
//
//   for (let i = 0; i < names1.length; i++) {
//
//     var estProperty1 = liikmedData.haaleruhmaNimed[i].est;
//     var enProperty1 = liikmedData.haaleruhmaNimed[i].en;
//     var nameProperty1 = names1[i];
//
//     // create a variable for passing the retrieved information to the sql text
//
//     var values1 = [estProperty1, enProperty1, nameProperty1];
//
//     // create the sql code to update each entry in the database using the data created above
//     // (question marks will be replaced by the values in the above variable)
//
//     var sql1 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";
//
//     // run the sql code
//
//     await updateDatabase(sql1, values1);
//   }
//
//   // array of name properties for the predetermined database entries called "haaleruhmaTutvustus"
//
//   var names2 = ["haaleruhmaTutvustus1", "haaleruhmaTutvustus2", "haaleruhmaTutvustus3", "haaleruhmaTutvustus4"];
//
//   // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)
//
//   for (let a = 0; a < names2.length; a++) {
//
//     var estProperty2 = liikmedData.haaleruhmaTutvustused[a].est;
//     var enProperty2 = liikmedData.haaleruhmaTutvustused[a].en;
//     var nameProperty2 = names2[a];
//
//     // create a variable for passing the retrieved information to the sql text
//
//     var values2 = [estProperty2, enProperty2, nameProperty2];
//
//     // create the sql code to update each entry in the database using the data created above
//     // (question marks will be replaced by the values in the above variable)
//
//     var sql2 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";
//
//     // run the sql code
//
//     await updateDatabase(sql2, values2);
//   }
//
//   // array of name properties for the predetermined database entries that have only "est" values ("en" value is never updated)
//
//   var names3 = ["sopranid", "aldid", "tenorid", "bassid"];
//
//   // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)
//
//   for (let b = 0; b < names3.length; b++) {
//
//     var estProperty3 = liikmedData[names3[b]];
//     var nameProperty3 = names3[b];
//
//     // create a variable for passing the retrieved information to the sql text
//
//     var values3 = [estProperty3, nameProperty3];
//
//     // create the sql code to update each entry in the database using the data created above
//     // (question marks will be replaced by the values in the above variable)
//
//     var sql3 = "UPDATE liikmed SET est = ? WHERE name = ?";
//
//     // run the sql code
//
//     await updateDatabase(sql3, values3);
//   }
//
//   // array of name properties for the predetermined database entries that have both "est" and "en" values
//
//   var names4 = ["lauljadPealkiri", "vilistlastePealkiri", "vilistlasteNimekiri"];
//
//   // for each name in the array create an "estProperty" and "enProperty" which contain the admin-inputted strings (in estonian and english)
//
//   for (let c = 0; c < names4.length; c++) {
//
//     var estProperty4 = liikmedData[names4[c]].est;
//     var enProperty4 = liikmedData[names4[c]].en;
//     var nameProperty4 = names4[c];
//
//     // create a variable for passing the retrieved information to the sql text
//
//     var values4 = [estProperty4, enProperty4, nameProperty4];
//
//     // create the sql code to update each entry in the database using the data created above
//     // (question marks will be replaced by the values in the above variable)
//
//     var sql4 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";
//
//     // run the sql code
//
//     await updateDatabase(sql4, values4);
//   }
//
//   // query the database for "loik" entries
//
//   con.query("SELECT * FROM liikmed ORDER by id", async function(err, result) {
//     if (err) throw err;
//
//     // for each "loik" member in the "loigud" array, create an "est", "en" and "name" property
//
//     for (let c = 0; c < liikmedData.loigud.length; c++) {
//
//       // "loik" entries in the database start from result 15 onwards
//
//       indexNumber = c + 15;
//
//       // create "est" and "en" properties, alongside with the name property
//
//       var estProperty5 = liikmedData.loigud[c].est;
//       var enProperty5 = liikmedData.loigud[c].en;
//       var nameProperty5 = result[indexNumber].name;
//
//       // create the sql text
//
//       var sql5 = "UPDATE liikmed SET est = ?, en = ? WHERE name = ?";
//
//       // create an array, which will contain values that will replace question marks in the sql text
//
//       var values5 = [estProperty5, enProperty5, nameProperty5];
//
//       // update the database
//
//       await updateDatabase(sql5, values5);
//     }
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add new "loik" elements to the "liikmed" section on the "koorist" page
//
//
// app.post("/upload/liikmed/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO liikmed (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "liikmed" section of the "koorist" page
//
//
// app.post("/upload/liikmed/delete", async function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM liikmed ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // since "loik" entries start from result 15 onwards, add 15 to the retrieved index number
//
//     var realIndex = currentIndex + 15;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM liikmed WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the "dirigendid" section on the "koorist" page
//
//
// app.post("/upload/dirigendid", function(req, res) {
//
//
//   // create an empty array that will be populated by the field objects, which will contain the name and maxCount attributes of the uploaded images
//
//   var fieldsArray = [];
//
//   // query the database for existing entries for the "portree" images
//
//   con.query("SELECT * FROM dirigendidpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // create as many field objects as there are database entries
//
//     for (var i = 0; i < result.length; i++) {
//
//       // each "portree" image has a number in its name, which is the iterator + 1 (since normal people start counting from 1 not 0)
//
//       var indexNumber = i + 1;
//
//       // create the field object
//
//       var field = {
//         name: "dirigendid" + indexNumber + "Portree",
//         maxCount: 1
//       };
//
//       // push the field object into the array above
//
//       fieldsArray.push(field);
//     }
//
//     // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files
//
//     var upload = multer({
//       storage: storage
//     }).fields(fieldsArray);
//
//     // initialize the upload
//
//     upload(req, res, async function(err) {
//       if (err) throw err;
//
//       // obtain the keys of the req.files object (which contains information about uploaded images)
//
//       var keysPildid = Object.keys(req.files);
//
//       // create a name and url property for each key in the req.files object
//
//       for (let i = 0; i < keysPildid.length; i++) {
//
//         // get each key separately
//
//         var currentKeyPildid = keysPildid[i];
//
//         // using the key, get the corresponding image in the req.files object
//
//         var currentImg = req.files[currentKeyPildid];
//
//         // check if a corresponding image exists for each key
//
//         if (currentImg !== undefined) {
//
//           // if yes, construct the url property from the images originalname property
//
//           var urlProperty = "/img/" + currentImg[0].originalname;
//
//           // obtain the index number within the image's fieldname, in the specified position
//
//           var indexNumber = currentImg[0].fieldname.slice(10, -7);
//
//           // since js starts counting from 0 not 1, subtract 1 from the index number
//
//           var realIndex = indexNumber - 1;
//
//           // get the database result that corresponds to the obtained index
//
//           var nameProperty = result[realIndex].name;
//
//           // create the sql text
//
//           var sqlPildid = "UPDATE dirigendidpildid SET url = ? WHERE name = ?";
//
//           // create an array, which will contain values that will replace question marks in the sql text
//
//           var valuesPildid = [urlProperty, nameProperty];
//
//           // update the database
//
//           await updateDatabase(sqlPildid, valuesPildid);
//         }
//       }
//
//       // create the sql text to query the database for table names (we eventually need the ones named "dirigendid" + timestamp)
//
//       var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//       // make the database query
//
//       con.query(sql, async function(err, result) {
//         if (err) throw err;
//
//         // create an empty array that will be populated by the names of the relevant tables in the database
//
//         var tableNames = [];
//
//         // loop through all the tables in the database
//
//         for (var i = 0; i < result.length; i++) {
//
//           // capture the name of each table in a variable
//
//           var tableName = (result[i].table_name);
//
//           // the relevant tables have "dirigendid" string in their name, but not "pildid" string
//
//           if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
//
//             // push the relevant table names into the above array
//
//             tableNames.push(tableName);
//           }
//         }
//
//         // the tables have a timestamp in their name- sort the array in ascending order
//
//         var sortedTableNames = tableNames.sort(function(a, b) {
//           return a - b;
//         });
//
//         // obtain all the name properties of the text inputs on the "dirigendid" section of the admin/koorist page
//
//         var keysTekstid = Object.keys(req.body);
//
//         // create an empty array, where the name properties of the "nimi" inputs will be stored
//
//         var keysNimi = [];
//
//         // create an empty array, where the name properties of the "loik" inputs will be stored
//
//         var keysLoik = [];
//
//         // to get the "nimi" input names, loop through all the input names obtained above
//
//         for (var a = 0; a < keysTekstid.length; a++) {
//
//           // capture each input name in a variable
//
//           var keyTekstid = keysTekstid[a];
//
//           // check if the input name contains the string "Nimi"
//
//           if (keyTekstid.indexOf("Nimi") !== -1) {
//
//             // if yes, store the input name in the keysNimi array
//
//             keysNimi.push(keyTekstid);
//
//             // check if the input name contains the string "Loik"
//
//           } else if (keyTekstid.indexOf("Loik") !== -1) {
//
//             // if yes, store the input in the keysLoik array
//
//             keysLoik.push(keyTekstid);
//           }
//         }
//
//         // loop through all the "nimi" input names in the keysNimi array
//
//         for (let b = 0; b < keysNimi.length; b++) {
//
//           // capture the user updated values of each of those inputs
//
//           var value = req.body[keysNimi[b]];
//
//           // create the sql text for updating those inputs, where the table name will be obtained from the sortedTableNames array created above
//
//           var sql = "UPDATE " + sortedTableNames[b] + " SET est = ? WHERE name = 'nimi'";
//
//           // update the database using the sql text created above
//
//           await updateDatabase(sql, value);
//         }
//
//         // sort all "loik" input names into an array of objects, which at first will be an empty array
//
//         var sortedKeysLoik = [];
//
//         // loop through all the "loik" input names
//
//         for (var e = 0; e < keysLoik.length; e++) {
//
//           // capture the index number of the database table that each of those input names are referring to-
//           // this will be a number in the input name after the word "dirigendid" and before "Loik"
//
//           // determine where the letters "Loik" are in the input name
//
//           var loikIndex = keysLoik[e].indexOf("Loik");
//
//           // get the table index between the words "dirigendid" and "loik"
//
//           var tableIndex = keysLoik[e].slice(10, loikIndex);
//
//           // the input name also has an element index, which determines the position of this particular entry in the database table-
//           // we find this number at the end of the input name, after either the letters "Est" or "En"
//
//           // check if the input name contains the letters "Est"
//
//           if (keysLoik[e].indexOf("Est") !== -1) {
//
//             // if yes, find out the position of those letters in the input name and add 3 to that index,
//             // because "Est" is three letters long and we need to know where is the end rather than the beginning of those three letters
//
//             var estEndIndex = keysLoik[e].indexOf("Est") + 3;
//
//             // now that we know where the end of the letters "Est" is, we can use it to obtain the element index number,
//             // which is situated right after those letters
//
//             var estElementIndex = keysLoik[e].slice(estEndIndex);
//
//             // for each input name create an object, which also holds the table and element indexes obtained above,
//             // then push this object into an array created above
//
//             sortedKeysLoik.push({
//               name: keysLoik[e],
//               tableIndex: tableIndex,
//               elementIndex: estElementIndex
//             });
//
//             // check if the input name contains the letters "En" (It should if it doesn't contain the letters "Est")
//
//           } else if (keysLoik[e].indexOf("En") !== -1) {
//
//             // if yes, find out where the last letter of the word "En" is located in the input name
//
//             var enEndIndex = keysLoik[e].indexOf("En") + 2;
//
//             // use that information to get the element index, which is located right after the letters "En" in the input name
//
//             var enElementIndex = keysLoik[e].slice(enEndIndex);
//
//             // for each input name create an object, which also holds the table and element indexes obtained above,
//             // then push this object into an array created above
//
//             sortedKeysLoik.push({
//               name: keysLoik[e],
//               tableIndex: tableIndex,
//               elementIndex: enElementIndex
//             });
//           }
//         }
//
//         // create an empty array for all the database tables, where the "dirigendidLoik" entries are stored
//
//         var currentTableNames = [];
//
//         // create empty arrays for the data about "Est" and "En" inputs
//
//         var estDataArray = [];
//         var enDataArray = [];
//
//         // using the sortedKeysLoik array, obtain the data about "Est" inputs-
//         // only every second object in the array will be an "Est" object, that is why the iterator will always be increased by 2 in the loop
//
//         for (var f = 0; f < sortedKeysLoik.length; f += 2) {
//
//           // for every "Est" object obtain the tableIndex, which will be used to select a relevant database table,
//           // also subtract 1 from this index, because javascript starts counting from 0
//
//           var currentTableIndex = sortedKeysLoik[f].tableIndex - 1;
//
//           // using this index, get the name of the database table that contains the data about the current input,
//           // the database names have already been stored and sorted in an array named sortedTableNames
//
//           var currentTableName = sortedTableNames[currentTableIndex];
//
//           // push the table name into the array created above
//
//           currentTableNames.push(currentTableName);
//
//           // for each input, obtain the user-inputted value (using the req.body object of multer)
//
//           var estValue = req.body[sortedKeysLoik[f].name];
//
//           // get the element index from each input
//
//           var estIndex = sortedKeysLoik[f].elementIndex;
//
//           // subtract 1 from this index, because javascript starts counting from 0
//
//           var currentEstIndex = estIndex - 1;
//
//           // add 1 back to the new index, because the "loik" entries start from position 1 in the table (the first one is a "nimi" entry)
//
//           var realEstIndex = currentEstIndex + 1;
//
//           // using the obtained data, create a javascript object
//
//           var estData = {
//             value: estValue,
//             elementIndex: realEstIndex
//           };
//
//           // push this object into the array created above
//
//           estDataArray.push(estData);
//         }
//
//         // for the "En" inputs loop through the sortedKeysLoik array way once more, but this time the iterator will start on position 1 not 0
//
//         for (var g = 1; g < sortedKeysLoik.length; g += 2) {
//
//           // capture the user-inputted value for each input
//
//           var enValue = req.body[sortedKeysLoik[g].name];
//
//           // capture the element index for each input
//
//           var enIndex = sortedKeysLoik[g].elementIndex;
//
//           // subtract 1 from this index, because javascript starts counting from 0
//
//           var currentEnIndex = enIndex - 1;
//
//           // add 1 back to the new index, because the "loik" entries start from position 1 in the table (the first one is a "nimi" entry)
//
//           var realEnIndex = currentEnIndex + 1;
//
//           // using the obtained data, create a javascript object
//
//           var enData = {
//             value: enValue,
//             elementIndex: realEnIndex
//           };
//
//           // push this object into the array created above
//
//           enDataArray.push(enData);
//         }
//
//         // to update the correct entries in the correct database tables, loop through the currentTableNames array,
//         // which now contains all the relevant table names in the right order-
//         // use the keyword "let" for the iterator, because this way the iterator can be passed into the con.query callback
//
//         for (let g = 0; g < currentTableNames.length; g++) {
//
//           // query for all entries in each of the tables
//
//           con.query("SELECT * FROM " + currentTableNames[g] + " ORDER by id", async function(err, result) {
//             if (err) throw err;
//
//             // get the correct entry from the table using the elementIndex property created above-
//             // in this case we loop through the estDataArray object, to update all the estonian inputs
//
//             var nameProperty = result[estDataArray[g].elementIndex].name;
//
//             // create a values variable for the sql text to update the database table-
//             // this will consist of the user-inputted value and the name property created above
//
//             var values = [estDataArray[g].value, nameProperty];
//
//             // create the sql text using the relevant entry from the currentTableNames array
//
//             var sql = "UPDATE " + currentTableNames[g] + " SET est = ? WHERE name = ?";
//
//             // update the database using the sql text values object created above
//
//             await updateDatabase(sql, values);
//           });
//         }
//
//
//         // loop through the currentTableNames array once more, but this time the english inputs will be updated
//
//         for (let h = 0; h < currentTableNames.length; h++) {
//
//           // query for all entries in each of the tables
//
//           con.query("SELECT * FROM " + currentTableNames[h] + " ORDER by id", async function(err, result) {
//             if (err) throw err;
//
//             // get the correct entry from the table using the elementIndex property created above-
//             // in this case we loop through the enDataArray object, to update all the english inputs
//
//             var nameProperty = result[enDataArray[h].elementIndex].name;
//
//             // create a values variable for the sql text to update the database table-
//             // this will consist of the user-inputted value and the name property created above
//
//             var values = [enDataArray[h].value, nameProperty];
//
//             // create the sql text using the relevant entry from the currentTableNames array
//
//             var sql = "UPDATE " + currentTableNames[h] + " SET en = ? WHERE name = ?";
//
//             // update the database using the sql text values object created above
//
//             await updateDatabase(sql, values);
//           });
//         }
//       });
//     });
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
// // add a new "dirigent" subform to the "dirigent" section on the "koorist" page
//
// app.post("/upload/dirigendid/new", async function(req, res) {
//
//   // create a name for a new table in the database- this will be "dirigendid" + the current timestamp
//
//   var namePropertyTable = "dirigendid" + Date.now();
//
//   // create the sql text for creating a new table
//
//   var sqlCreate = "CREATE TABLE " + namePropertyTable + " (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(3000), en varchar(3000), PRIMARY KEY(id)) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
//
//   // create a new table using the sql text
//
//   updateDatabase(sqlCreate);
//
//   // create sql text to alter the character set of the new table using the table name created above
//
//   var sqlAlter = "ALTER TABLE " + namePropertyTable + " CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
//
//   // execute the alteration
//
//   updateDatabase(sqlAlter);
//
//   // create a name property variable for a new entry to the "dirigendidpildid" table in the database, this will be "portree" + the current timestamp
//
//   var namePropertyPilt = "portree" + Date.now();
//
//   // create the sql text, where namePropertyPilt is the variable created above
//
//   var sqlPilt = "INSERT INTO dirigendidpildid (name, url) VALUES ('" + namePropertyPilt + "', '')";
//
//   // insert the new "portree" entry into the database
//
//   updateDatabase(sqlPilt);
//
//   // create the sql text for inserting the non-dynamic "nimi" entry to the newly created database table
//
//   var sqlInsert = "INSERT INTO " + namePropertyTable + " (name, est, en) VALUES ('nimi', '', '')";
//
//   // execute the insertion
//
//   updateDatabase(sqlInsert);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "dirigent" subform from the "dirigent" section on the "koorist" page
//
//
// app.post("/upload/dirigendid/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted subform
//
//   var deleteSubformData = JSON.parse(req.body.data);
//
//   // to find the right result, we need to know the subform's index number-
//   // this will be the id number of the deleted subform minus 1 (since js starts to count from 0 not 1)
//
//   var indexNumber = deleteSubformData.idNumber - 1;
//
//   // create the sql text for querying the database for the tables related to the "dirigendid" subforms
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have "dirigendid" string in their name, but not "pildid" string
//
//       if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
//
//         // push the relevant table names into the above array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the table corresponding to the deleted subform using the retrieved index number
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // the retrieved table name will be included in the sql text as a variable
//
//     var nameProperty = currentResult;
//
//     // create the sql text
//
//     var sql = "DROP TABLE " + nameProperty + "";
//
//     // delete the table from the database
//
//     updateDatabase(sql);
//   });
//   // the image on the deleted subform is stored in a different table- get all the images in this table as an array
//
//   con.query("SELECT * FROM dirigendidpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // the correct result can be found with the index number retrieved previously
//
//     var currentResult = result[indexNumber];
//
//     // get the name property for the correct image
//
//     var nameProperty = currentResult.name;
//
//     // delete the image from the database using its name property
//
//     con.query("DELETE FROM dirigendidpildid WHERE name = '" + nameProperty + "'", function(err, result) {
//       if (err) throw err;
//     });
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
//
// // add a new "loik" element to the "dirigendid" section of the "koorist" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/dirigendid" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have "dirigendid" string in their name, but not "pildid" string
//
//       if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
//
//         // push the relevant table names into the above array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//     var nameProperty = "loik" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//     // // insert the new entry into the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
//
// // delete a "loik" element from the "dirigendid" section of the "koorist" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/dirigendid" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "dirigendid" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have "dirigendid" string in their name, but not "pildid" string
//
//       if (tableName.indexOf("dirigendid") !== -1 && tableName.indexOf("pildid") === -1) {
//
//         // push the relevant table names into the above array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "loik" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // since the "loik" data in all the relevant tables start from the second entry, add 1 to the retrieved index
//
//       var realIndex = currentIndex + 1;
//
//       // get the database entry of the deleted "loik" element
//
//       var currentResult = result[realIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//     });
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
//
// // update the "ajalugu" section on the "koorist" page
//
// app.post("/upload/ajalugu", function(req, res) {
//
//   // get the necessary data from the server and parse it into a javascript object
//
//   var ajaluguData = JSON.parse(req.body.data);
//
//   // to update the "pealkiri" elements in the "sissejuhatus" section, create an object with the relevant user-inputted values
//
//   var valuesAjaluguSissejuhatusPealkiri = [ajaluguData.sissejuhatus.pealkiri.est, ajaluguData.sissejuhatus.pealkiri.en];
//
//   // create the sql text for the database operation
//
//   var sqlAjaluguSissejuhatusPealkiri = "UPDATE ajalugusissejuhatus SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//   // update the database
//
//   updateDatabase(sqlAjaluguSissejuhatusPealkiri, valuesAjaluguSissejuhatusPealkiri);
//
//   // to update "loik" elements, first query the database for relevant entries
//
//   con.query("SELECT * FROM ajalugusissejuhatus ORDER by id", async function(err, result) {
//     if (err) throw err;
//
//     // loop through the database results, while keeping in mind,
//     // that the "loik" entries in the database start from position 1
//
//     for (let i = 1; i < result.length; i++) {
//
//       // capture the name entry from the database
//
//       var nameProperty = result[i].name;
//
//       // use the same iterator to also loop through the ajalugu.sissejuhatus.loigud array sent from the server-
//       // however this array starts from position 0 not 1
//
//       var estProperty = ajaluguData.sissejuhatus.loigud[i - 1].est;
//       var enProperty = ajaluguData.sissejuhatus.loigud[i - 1].en;
//
//       // create the values variable, which captures all the relevant values in each database entry
//
//       var valuesAjaluguSissejuhatus = [estProperty, enProperty, nameProperty];
//
//       // create the sql text for updating the database, the question marks will be replaced by the variables captured in the values variable
//
//       var sqlAjaluguSissejuhatus = "UPDATE ajalugusissejuhatus SET est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sqlAjaluguSissejuhatus, valuesAjaluguSissejuhatus);
//     }
//   });
//
//   // to update the "pealkiri" elements in the "sissekanded" section, create an object with the relevant user-inputted values
//
//   var valuesAjaluguSissekandedPealkiri = [ajaluguData.ajajoon.pealkiri.est, ajaluguData.ajajoon.pealkiri.en];
//
//   // create the sql text for the database operation
//
//   var sqlAjaluguSissekandedPealkiri = "UPDATE ajalugusissekanded SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//   // update the database
//
//   updateDatabase(sqlAjaluguSissekandedPealkiri, valuesAjaluguSissekandedPealkiri);
//
//   // to update "loik" elements, first query the database for relevant entries
//
//   con.query("SELECT * FROM ajalugusissekanded ORDER by id", async function(err, result) {
//     if (err) throw err;
//
//     // loop through the database results, while keeping in mind,
//     // that the "loik" entries in the database start from position 1
//
//     for (let i = 1; i < result.length; i++) {
//
//       // capture the name entry from the database
//
//       var nameProperty = result[i].name;
//
//       // use the same iterator to also loop through the ajalugu.ajajoon.sissekanded array sent from the server-
//       // however this array starts from position 0 not 1
//
//       var indexNumber = i - 1;
//
//       var yearProperty = ajaluguData.ajajoon.sissekanded[indexNumber].year;
//       var estProperty = ajaluguData.ajajoon.sissekanded[indexNumber].est;
//       var enProperty = ajaluguData.ajajoon.sissekanded[indexNumber].en;
//
//       // create the values variable, which captures all the relevant values in each database entry
//
//       var valuesAjaluguSissekanded = [yearProperty, estProperty, enProperty, nameProperty];
//
//       // create the sql text for updating the database, the question marks will be replaced by the variables captured in the values variable
//
//       var sqlAjaluguSissekanded = "UPDATE ajalugusissekanded SET year = ?, est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sqlAjaluguSissekanded, valuesAjaluguSissekanded);
//     }
//   });
//
//   // create the sql text for querying the database for the tables related to the "ajalugu" subforms
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, async function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have "ajalugu" string in their name, but not "sissekanded" nor "sissejuhatus" string
//
//       if (tableName.indexOf("ajalugu") !== -1 && tableName.indexOf("sissekanded") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//         // push the relevant table names into the above array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // create an async function that gets the length and necessary values for the "loik" related entries for each of the relevant databases,
//     // and updates them with user-inputted data
//
//     async function loopThroughAjaluguSektsioonid(tableNameProperty, a) {
//
//       // query each table for its contents
//
//       con.query("SELECT * FROM " + tableNameProperty + " ORDER BY id", async function(err, result) {
//         if (err) throw err;
//
//         // loop through the results to get the name properties of the "loik" entries (these results start from position 1)
//
//         for (let i = 1; i < result.length; i++) {
//
//           // capture the name property for each "loik" element
//
//           var nameProperty = result[i].name;
//
//           // capture the user-inputted "est" and "en" values from the parsed ajaluguData object (using the same iterator)
//
//           var estProperty = ajaluguData.sektsioonid[a].loigud[i - 1].est;
//           var enProperty = ajaluguData.sektsioonid[a].loigud[i - 1].en;
//
//           // construct a values object from the variables created above
//
//           var values = [estProperty, enProperty, nameProperty];
//
//           // create the sql text for updating the database
//
//           var sql = "UPDATE " + tableNameProperty + " SET est = ?, en = ? WHERE name = ?";
//
//           // update the database
//
//           await updateDatabase(sql, values);
//         }
//       });
//     }
//
//
//     // loop through the relevant tables
//
//     for (let a = 0; a < sortedTableNames.length; a++) {
//
//       // capture the current table name into a variable
//
//       var tableNameProperty = sortedTableNames[a];
//
//       // to update the "pealkiri" entry in each relevant database table, we need to capture the user-inputted data into variables,
//       // since the ajaluguData.sektsioonid array should have the same length as the sortedTableNames array, we can use the same iterator here
//
//       var estPropertyPealkiri = ajaluguData.sektsioonid[a].pealkiri.est;
//       var enPropertyPealkiri = ajaluguData.sektsioonid[a].pealkiri.en;
//
//       // create a values variable, which will be inserted into the database update function
//
//       var valuesAjaluguSektsiooniPealkiri = [estPropertyPealkiri, enPropertyPealkiri];
//
//       // create the sql text for the database update, question marks will be replaced using the values variable created above
//
//
//       var sqlAjaluguSektsiooniPealkiri = "UPDATE " + tableNameProperty + " SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//       // update the database
//
//       await updateDatabase(sqlAjaluguSektsiooniPealkiri, valuesAjaluguSektsiooniPealkiri);
//
//       // for updating "loik" entries, call the function created above for each of the relevant database tables
//
//       await loopThroughAjaluguSektsioonid(tableNameProperty, a);
//     }
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
// // upload a new "loik" element to the "sissejuhatus" part on the "ajalugu" section
//
// app.post("/upload/ajalugu/sissejuhatus/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO ajalugusissejuhatus (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "sissejuhatus" part of the "ajalugu" section
//
// app.post("/upload/ajalugu/sissejuhatus/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM ajalugusissejuhatus ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // the "loik" database entries start from the second result and onwards, thus add 1 to the current index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM ajalugusissejuhatus WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // upload a new "sissekanne" element to the "ajalugu" section on the "koorist" page
//
// app.post("/upload/ajalugu/sissekanne/new", function(req, res) {
//
//   // create variables for new database entries- est, en and year properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var yearProperty = "";
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO ajalugusissekanded (name, year, est, en) VALUES ('" + nameProperty + "', '" + yearProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "sissekanne" element from the "ajalugu" section on the "koorist" page
//
// app.post("/upload/ajalugu/sissekanne/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM ajalugusissekanded ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // the "loik" database entries start from the second result and onwards, thus add 1 to the current index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM ajalugusissekanded WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
//
// // add a new "ajalugu" subform to the "ajalugu" section on the "koorist" page
//
// app.post("/upload/ajalugu/new", function(req, res) {
//
//   // create a name for a new table in the database- this will be "ajalugu" + the current timestamp
//
//   var namePropertyTable = "ajalugu" + Date.now();
//
//   // create the sql text for creating a new table
//
//   var sqlCreate = "CREATE TABLE " + namePropertyTable + " (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(3000), en varchar(3000), PRIMARY KEY(id)) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
//
//   // create a new table using the sql text
//
//   updateDatabase(sqlCreate);
//
//   // create sql text to alter the character set of the new table using the table name created above
//
//   var sqlAlter = "ALTER TABLE " + namePropertyTable + " CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
//
//   // execute the alteration
//
//   updateDatabase(sqlAlter);
//
//   // create the sql text for inserting the non-dynamic "pealkiri" entry to the newly created database table
//
//   var sqlInsert = "INSERT INTO " + namePropertyTable + " (name, est, en) VALUES ('pealkiri', '', '')";
//
//   // execute the insertion
//
//   updateDatabase(sqlInsert);
//
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "ajalugu" subform from the "ajalugu" section on the "koorist" page
//
//
// app.post("/upload/ajalugu/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted subform
//
//   var deleteSubformData = JSON.parse(req.body.data);
//
//   // to find the right result, we need to know the subform's index number-
//   // this will be the id number of the deleted subform minus 1 (since js starts to count from 0 not 1)
//
//   var indexNumber = deleteSubformData.idNumber - 1;
//
//   // create the sql text for querying the database for the tables related to the "ajalugu" subforms
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have "ajalugu" string in their name, but not "sissekanded" or "sissejuhatus" string
//
//       if (tableName.indexOf("ajalugu") !== -1 && tableName.indexOf("sissekanded") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//         // push the relevant table names into the above array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the table corresponding to the deleted subform using the retrieved index number
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // the retrieved table name will be included in the sql text as a variable
//
//     var nameProperty = currentResult;
//
//     // create the sql text
//
//     var sql = "DROP TABLE " + nameProperty + "";
//
//     // delete the table from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new "loik" element to the "ajalugu" section of the "koorist" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/ajalugu" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have "ajalugu" string in their name, but not "sissekanded" or "sissejuhatus" string
//
//       if (tableName.indexOf("ajalugu") !== -1 && tableName.indexOf("sissekanded") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//         // push the relevant table names into the above array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//     var nameProperty = "loik" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//     // // insert the new entry into the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
//
// // delete a "loik" element from the "ajalugu" section of the "koorist" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/ajalugu" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "ajalugu" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have "ajalugu" string in their name, but not "sissekanded" or "sissejuhatus" string
//
//       if (tableName.indexOf("ajalugu") !== -1 && tableName.indexOf("sissekanded") === -1 && tableName.indexOf("sissejuhatus") === -1) {
//
//         // push the relevant table names into the above array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "loik" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // since the "loik" data in all the relevant tables start from the second entry, add 1 to the retrieved index
//
//       var realIndex = currentIndex + 1;
//
//       // get the database entry of the deleted "loik" element
//
//       var currentResult = result[realIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//     });
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
// // update the "meedia" section on the "koorist" page
//
// app.post("/upload/meedia", function(req, res) {
//
//   // parse the data that has been sent to the server as a JSON file from the client-side
//
//   var meediaData = JSON.parse(req.body.data);
//
//   // capture into variables all the user-inputted values for the "pealkiri" elements in all three "meedia"-related database tables
//
//   var estPropertyPealkiri1 = meediaData.sissejuhatus.pealkiri.est;
//   var enPropertyPealkiri1 = meediaData.sissejuhatus.pealkiri.en;
//
//   var estPropertyPealkiri2 = meediaData.videod.pealkiri.est;
//   var enPropertyPealkiri2 = meediaData.videod.pealkiri.en;
//
//   var estPropertyPealkiri3 = meediaData.muudLingid.pealkiri.est;
//   var enPropertyPealkiri3 = meediaData.muudLingid.pealkiri.en;
//
//   // create the values objects for each of these database tables
//
//   var values1 = [estPropertyPealkiri1, enPropertyPealkiri1];
//   var values2 = [estPropertyPealkiri2, enPropertyPealkiri2];
//   var values3 = [estPropertyPealkiri3, enPropertyPealkiri3];
//
//   // create sql texts for all the database tables
//
//   var sql1 = "UPDATE meedia SET est = ?, en = ? WHERE name = 'pealkiri'"
//   var sql2 = "UPDATE meediavideod SET est = ?, en = ? WHERE name = 'pealkiri'"
//   var sql3 = "UPDATE meedialingid SET est = ?, en = ? WHERE name = 'pealkiri'"
//
//   // update the three database tables
//
//   updateDatabase(sql1, values1);
//   updateDatabase(sql2, values2);
//   updateDatabase(sql3, values3);
//
//   // check if there are any "loik" elements to update in the "sissejuhatus" part of "meedia" section
//
//   if (meediaData.sissejuhatus.loigud.length !== 0) {
//
//     // if yes, query the database to get the names of all "loik" entries in the "meedia" table
//
//     con.query("SELECT * FROM meedia ORDER BY id", async function(err, result) {
//       if (err) throw err;
//
//       // loop through the results, paying in mind that the "loik" entries start from position 1
//
//       for (var i = 1; i < result.length; i++) {
//
//         // capture the name property of each "loik" entry
//
//         var nameProperty = result[i].name;
//
//         // capture the relevant user-inputted values from the meediaData object,
//         // using the same iterator modified by subtracting 1 from it
//         // (due to the result object starting from position 1, which is not the case for meediaData.sissejuhatus.loigud array)
//
//         var estProperty = meediaData.sissejuhatus.loigud[i - 1].est;
//         var enProperty = meediaData.sissejuhatus.loigud[i - 1].en;
//
//         // create a values object from the variables created above
//
//         var values = [estProperty, enProperty, nameProperty];
//
//         // create the sql text, where question marks will later be replaced by the values object
//
//         var sql = "UPDATE meedia SET est = ?, en = ? WHERE name = ?";
//
//         // update the database
//
//         await updateDatabase(sql, values);
//       }
//     });
//   }
//
//   // check if there are any "manustamislink" elements to update in the "videod" part of "meedia" section
//
//   if (meediaData.videod.manustamislingid.length !== 0) {
//
//     // if yes, query the database to get the names of all "link" entries in the "meediaVideod" table
//
//     con.query("SELECT * FROM meediavideod ORDER BY id", async function(err, result) {
//       if (err) throw err;
//
//       // loop through the results, paying in mind that the "link" entries start from position 1
//
//       for (var i = 1; i < result.length; i++) {
//
//         // capture the name property of each "link" entry
//
//         var nameProperty = result[i].name;
//
//         // capture the relevant user-inputted value from the meediaData object,
//         // using the same iterator modified by subtracting 1 from it
//         // (due to the result object starting from position 1, which is not the case for meediaData.videod.manustamislingid array)
//
//         var linkProperty = meediaData.videod.manustamislingid[i - 1];
//
//         // create a values object from the variables created above
//
//         var values = [linkProperty, nameProperty];
//
//         // create the sql text, where question marks will later be replaced by the values object
//
//         var sql = "UPDATE meediavideod SET link = ? WHERE name = ?";
//
//         // update the database
//
//         await updateDatabase(sql, values);
//       }
//     });
//
//   }
//
//   // check if there are any "link" elements to update in the "lingid" part of "meedia" section
//
//   if (meediaData.muudLingid.lingid.length !== 0) {
//
//     // if yes, query the database to get the names of all "link" entries in the "meediaLingid" table
//
//     con.query("SELECT * FROM meedialingid ORDER BY id", async function(err, result) {
//       if (err) throw err;
//
//       // loop through the results, paying in mind that the "link" entries start from position 1
//
//       for (var i = 1; i < result.length; i++) {
//
//         // capture the name property of each "link" entry
//
//         var nameProperty = result[i].name;
//
//         // capture the relevant user-inputted value from the meediaData object,
//         // using the same iterator modified by subtracting 1 from it
//         // (due to the result object starting from position 1, which is not the case for meediaData.muudLingid.lingid array)
//
//         var estProperty = meediaData.muudLingid.lingid[i - 1].est;
//         var enProperty = meediaData.muudLingid.lingid[i - 1].en;
//         var linkProperty = meediaData.muudLingid.lingid[i - 1].link;
//
//         // create a values object from the variables created above
//
//         var values = [estProperty, enProperty, linkProperty, nameProperty];
//
//         // create the sql text, where question marks will later be replaced by the values object
//
//         var sql = "UPDATE meedialingid SET est = ?, en = ?, link = ? WHERE name = ?";
//
//         // update the database
//
//         await updateDatabase(sql, values);
//       }
//     });
//
//   }
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new "loik" element to the first part of the "meedia" section
//
// app.post("/upload/meedia/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO meedia (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the first part of the "meedia" section
//
// app.post("/upload/meedia/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM meedia ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // since "loik" entries start from result 1 onwards, add 1 to the retrieved index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM meedia WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new video to the "meedia" section on the "koorist" page
//
// app.post("/upload/meedia/video/new", function(req, res) {
//
//   // create variables for new database entries- est, en and link properties will be empty strings, while the name property will be "link" + current timestamp
//
//   var nameProperty = "link" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//   var linkProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO meediavideod (name, est, en, link) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + linkProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a video from the "meedia" section on the "koorist" page
//
// app.post("/upload/meedia/video/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "link" entries
//
//   con.query("SELECT * FROM meediavideod ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // since "link" entries start from result 1 onwards, add 1 to the retrieved index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM meediavideod WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new link to the "meedia" section on the "koorist" page
//
// app.post("/upload/meedia/link/new", function(req, res) {
//
//   // create variables for new database entries- est, en and link properties will be empty strings, while the name property will be "link" + current timestamp
//
//   var nameProperty = "link" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//   var linkProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO meedialingid (name, est, en, link) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + linkProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a link from the "meedia" section on the "koorist" page
//
// app.post("/upload/meedia/link/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "link" entries
//
//   con.query("SELECT * FROM meedialingid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // since "link" entries start from result 1 onwards, add 1 to the retrieved index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM meedialingid WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the "toetajad" section on the "koorist" page
//
// app.post("/upload/toetajad", function(req, res) {
//
//   // create an empty array that will be populated by the field objects, which will contain the name and maxCount attributes of the uploaded images
//
//   var fieldsArray = [];
//
//   // query the database for existing entries
//
//   con.query("SELECT * FROM toetajad ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // create as many field objects as there are database entries
//
//     for (var i = 0; i < result.length; i++) {
//
//       // each image has a number in its name, which is the iterator + 1 (since normal people start counting from 1 not 0)
//
//       var indexNumber = i + 1;
//
//       // create the field object
//
//       var field = {
//         name: "toetajadLoikFile" + indexNumber,
//         maxCount: 1
//       };
//
//       // push the field object into the array above
//
//       fieldsArray.push(field);
//     }
//
//     // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files
//
//     var upload = multer({
//       storage: storage
//     }).fields(fieldsArray);
//
//     // initialize the upload
//
//     upload(req, res, async function(err) {
//       if (err) throw err;
//
//       // obtain the keys of the req.files object (which contains information about uploaded images)
//
//       var keysPildid = Object.keys(req.files);
//
//       var keysLingid = Object.keys(req.body);
//
//       // create a name and url property for each key in the req.files object
//
//       for (let i = 0; i < keysPildid.length; i++) {
//
//         // get each key in the req.files object separately
//
//         var currentKeyPildid = keysPildid[i];
//
//         // using the key, get the corresponding image from the req.files object
//
//         var currentImg = req.files[currentKeyPildid];
//
//         // construct the url property from the images originalname property
//
//         var urlProperty = "/img/" + currentImg[0].originalname;
//
//         // obtain the index number within the image's fieldname, in the specified position
//
//         var indexNumber = currentImg[0].fieldname.slice(16);
//
//         // since js starts counting from 0 not 1, subtract 1 from the index number
//
//         var realIndex = indexNumber - 1;
//
//         // get the database result that corresponds to the obtained index
//
//         var namePropertyPilt = result[realIndex].name;
//
//         // create the sql text
//
//         var sqlPildid = "UPDATE toetajad SET url = ? WHERE name = ?";
//
//         // create an array, which will contain values that will replace question marks in the sql text
//
//         var valuesPildid = [urlProperty, namePropertyPilt];
//
//         // update the database
//
//         await updateDatabase(sqlPildid, valuesPildid);
//       }
//
//       // query the database for the entries in the "toetajad" table
//
//       con.query("SELECT * FROM toetajad ORDER BY id", async function(err, result) {
//         if (err) throw err;
//
//         // for each entry, create a name property and link property and update the database with the values of these properties
//
//         for (var i = 0; i < result.length; i++) {
//
//           // the name property can be obtained from the database entry
//
//           var namePropertyLink = result[i].name;
//
//           // as the keysLingid array has the same length as there are entries in the database table,
//           // we can use the same iterator to get each key separately
//
//           var currentKey = keysLingid[i];
//
//           // use this key to create a linkProperty from the req.body object of the multer middleware
//
//           var linkProperty = req.body[currentKey];
//
//           // store the created properties in a values object
//
//           var valuesLingid = [linkProperty, namePropertyLink];
//
//           // create the sql text for updating the database
//
//           var sqlLingid = "UPDATE toetajad SET link = ? WHERE name = ?";
//
//           // update the database
//
//           await updateDatabase(sqlLingid, valuesLingid);
//         }
//
//         // send a server response
//
//         res.send("OK!");
//       });
//     });
//   });
// });
//
//
// // add a new logo to the "toetajad" section on the "koorist" page
//
// app.post("/upload/toetajad/new", function(req, res) {
//
//   // create variables for new database entries- url and link properties will be empty strings, while the name property will be "logo" + current timestamp
//
//   var nameProperty = "logo" + Date.now();
//   var urlProperty = "";
//   var linkProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO toetajad (name, link, url) VALUES ('" + nameProperty + "', '" + linkProperty + "', '" + urlProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a logo from the "toetajad" section on the "koorist" page
//
// app.post("/upload/toetajad/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "logo" entries
//
//   con.query("SELECT * FROM toetajad ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[currentIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM toetajad WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the first part of the "kontakt" page
//
// app.post("/upload/kontakt", async function(req, res) {
//
//   // parse the JSON data received from the client-side
//
//   var kontaktData = JSON.parse(req.body.data);
//
//   // create an empty array for all the "pealkiri" entries on the "kontakt" page
//
//   var pealkirjad = [];
//
//   // create four "pealkiri" objects from the data sent from the client-side
//
//   var pealkiriAndmed = {
//     est: kontaktData.andmed.pealkiri.est,
//     en: kontaktData.andmed.pealkiri.en,
//   };
//   var pealkiriNumbrid = {
//     est: kontaktData.numbrid.pealkiri.est,
//     en: kontaktData.numbrid.pealkiri.en,
//   };
//   var pealkiriMtu = {
//     est: kontaktData.mtu.pealkiri.est,
//     en: kontaktData.mtu.pealkiri.en,
//   };
//   var pealkiriUldine = {
//     est: kontaktData.uldine.pealkiri.est,
//     en: kontaktData.uldine.pealkiri.en,
//   };
//
//   // populate the pealkirjad array with these objects
//
//   pealkirjad.push(pealkiriAndmed);
//   pealkirjad.push(pealkiriNumbrid);
//   pealkirjad.push(pealkiriMtu);
//   pealkirjad.push(pealkiriUldine);
//
//   // create an array of all the four database table names that have "pealkiri" entries on the "kontakt" page
//
//   var tabeliNimed = ["kontaktandmed", "kontaktnumbrid", "kontaktmtu", "kontaktuldine"];
//
//   // loop through the pealkirjad array
//
//   for (var i = 0; i < pealkirjad.length; i++) {
//
//     // for each object in the array, create an est and en property, and using the same iterator also select a corresponding table name
//
//     var estProperty = pealkirjad[i].est;
//     var enProperty = pealkirjad[i].en;
//     var tableNameProperty = tabeliNimed[i];
//
//     // create a values object with the variables created above
//
//     var valuesPealkirjad = [estProperty, enProperty];
//
//     // create the sql text for updating each database
//
//     var sqlPealkirjad = "UPDATE " + tableNameProperty + " SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//     // update each database
//
//     await updateDatabase(sqlPealkirjad, valuesPealkirjad);
//   }
//
//   // query the database for "loik" entries in the "sissejuhatus" section on the "kontakt" page
//
//   con.query("SELECT * FROM kontaktsissejuhatus ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // go through each result
//
//     for (var i = 0; i < result.length; i++) {
//
//       // obtain the name of each "loik" database entry
//
//       var nameProperty = result[i].name;
//
//       // for each result capture the relevant est and en properties from the data received from the client-side using the same iterator
//
//       var estProperty = kontaktData.sissejuhatus.loigud[i].est;
//       var enProperty = kontaktData.sissejuhatus.loigud[i].en;
//
//       // create a values array for the sql text using the variables created above
//
//       var values = [estProperty, enProperty, nameProperty];
//
//       // create the sql text
//
//       var sql = "UPDATE kontaktsissejuhatus SET est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // query the database for "loik" entries in the "üldine" section on the "kontakt" page
//
//   con.query("SELECT * FROM kontaktuldine ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // go through each result
//
//     for (var i = 1; i < result.length; i++) {
//
//       // obtain the name of each "loik" database entry
//
//       var nameProperty = result[i].name;
//
//       // for each result capture the relevant est and en properties from the data received from the client-side
//       // we can use the same iterator if we substract 1 from it
//       // (since these arrays are relevant from position 0 not 1 like the database results)
//
//       var estProperty = kontaktData.uldine.loigud[i - 1].est;
//       var enProperty = kontaktData.uldine.loigud[i - 1].en;
//
//       // create a values array for the sql text using the variables created above
//
//       var values = [estProperty, enProperty, nameProperty];
//
//       // create the sql text
//
//       var sql = "UPDATE kontaktuldine SET est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // query the database for "teave" entries in the "andmed" section on the "kontakt" page
//
//   con.query("SELECT * FROM kontaktandmed ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // go through each result, taking into account that the "teave" entries start from position 1 not 0
//
//     for (var i = 1; i < result.length; i++) {
//
//       // obtain the name of each "teave" database entry
//
//       var nameProperty = result[i].name;
//
//       // for each result capture the relevant estKey, enKey, est and en properties from the data received from the client-side
//       // we can use the same iterator if we substract 1 from it
//       // (since these arrays are relevant from position 0 not 1 like the database results)
//
//       var estKeyProperty = kontaktData.andmed.paarid[i - 1].estKey;
//       var enKeyProperty = kontaktData.andmed.paarid[i - 1].enKey;
//       var estProperty = kontaktData.andmed.paarid[i - 1].est;
//       var enProperty = kontaktData.andmed.paarid[i - 1].en;
//
//       // create a values array for the sql text using the variables created above
//
//       var values = [estKeyProperty, enKeyProperty, estProperty, enProperty, nameProperty];
//
//       // create the sql text
//
//       var sql = "UPDATE kontaktandmed SET estkey = ?, enkey = ?, est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // query the database for "number" entries in the "telefoninumbrid" section on the "kontakt" page
//
//   con.query("SELECT * FROM kontaktnumbrid ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // go through each result, taking into account that the "number" entries start from position 1 not 0
//
//     for (var i = 1; i < result.length; i++) {
//
//       // obtain the name of each "number" database entry
//
//       var nameProperty = result[i].name;
//
//       // for each result capture the relevant estKey, enKey and number properties from the data received from the client-side
//       // we can use the same iterator if we substract 1 from it
//       // (since these arrays are relevant from position 0 not 1 like the database results)
//
//       var estKeyProperty = kontaktData.numbrid.numbrid[i - 1].estKey;
//       var enKeyProperty = kontaktData.numbrid.numbrid[i - 1].enKey;
//       var numberProperty = kontaktData.numbrid.numbrid[i - 1].number;
//
//       // create a values array for the sql text using the variables created above
//
//       var values = [estKeyProperty, enKeyProperty, numberProperty, nameProperty];
//
//       // create the sql text
//
//       var sql = "UPDATE kontaktnumbrid SET estkey = ?, enkey = ?, number = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // query the database for "teave" entries in the "MTÜ" section on the "kontakt" page
//
//   con.query("SELECT * FROM kontaktmtu ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // go through each result, taking into account that the "teave" entries start from position 1 not 0
//
//     for (var i = 1; i < result.length; i++) {
//
//       // obtain the name of each "teave" database entry
//
//       var nameProperty = result[i].name;
//
//       // for each result capture the relevant estKey, enKey, est and en properties from the data received from the client-side
//       // we can use the same iterator if we substract 1 from it
//       // (since these arrays are relevant from position 0 not 1 like the database results)
//
//       var estKeyProperty = kontaktData.mtu.paarid[i - 1].estKey;
//       var enKeyProperty = kontaktData.mtu.paarid[i - 1].enKey;
//       var estProperty = kontaktData.mtu.paarid[i - 1].est;
//       var enProperty = kontaktData.mtu.paarid[i - 1].en;
//
//       // create a values array for the sql text using the variables created above
//
//       var values = [estKeyProperty, enKeyProperty, estProperty, enProperty, nameProperty];
//
//       // create the sql text
//
//       var sql = "UPDATE kontaktmtu SET estkey = ?, enkey = ?, est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new "loik" element to the introduction section on the "kontakt" page
//
// app.post("/upload/kontakt/sissejuhatus/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO kontaktsissejuhatus (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the introduction section on the "kontakt" page
//
// app.post("/upload/kontakt/sissejuhatus/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM kontaktsissejuhatus ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[currentIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM kontaktsissejuhatus WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new "loik" element to the middle section on the "kontakt" page
//
// app.post("/upload/kontakt/uldine/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO kontaktuldine (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the middle section on the "kontakt" page
//
// app.post("/upload/kontakt/uldine/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM kontaktuldine ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // as the "loik" elements start from the second result onwards, add 1 to the index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM kontaktuldine WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new number to the "telefoninumbrid" section on the "kontakt" page
//
// app.post("/upload/kontakt/numbrid/new", function(req, res) {
//
//   // create variables for new database entries- est, en, estKey, enKey and number properties will be empty strings, while the name property will be "number" + current timestamp
//
//   var nameProperty = "number" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//   var estKeyProperty = "";
//   var enKeyProperty = "";
//   var numberProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO kontaktnumbrid (name, est, en, estkey, enkey, number) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + estKeyProperty + "', '" + enKeyProperty + "', '" + numberProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a number from the "telefoninumbrid" section on the "kontakt" page
//
// app.post("/upload/kontakt/numbrid/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "number" entries
//
//   con.query("SELECT * FROM kontaktnumbrid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // as the "number" elements start from the second result onwards, add 1 to the index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM kontaktnumbrid WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new key-value pair to the "andmed" section on the "kontakt" page
//
// app.post("/upload/kontakt/andmed/new", function(req, res) {
//
//   // create variables for new database entries- est, en, estKey and enKey properties will be empty strings, while the name property will be "teave" + current timestamp
//
//   var nameProperty = "teave" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//   var estKeyProperty = "";
//   var enKeyProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO kontaktandmed (name, est, en, estkey, enkey) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + estKeyProperty + "', '" + enKeyProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a key-value pair from the "andmed" section on the "kontakt" page
//
// app.post("/upload/kontakt/andmed/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "keypair" entries
//
//   con.query("SELECT * FROM kontaktandmed ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // as the "keypair" elements start from the second result onwards, add 1 to the index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM kontaktandmed WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new key-value pair to the "MTÜ" section on the "kontakt" page
//
// app.post("/upload/kontakt/mtu/new", function(req, res) {
//
//   // create variables for new database entries- est, en, estKey and enKey properties will be empty strings, while the name property will be "teave" + current timestamp
//
//   var nameProperty = "teave" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//   var estKeyProperty = "";
//   var enKeyProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO kontaktmtu (name, est, en, estkey, enkey) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + estKeyProperty + "', '" + enKeyProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a key-value pair from the "MTÜ" section on the "kontakt" page
//
// app.post("/upload/kontakt/mtu/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "keypair" entries
//
//   con.query("SELECT * FROM kontaktmtu ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // as the "keypair" elements start from the second result onwards, add 1 to the index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM kontaktmtu WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // update the "vastuvõtt" section on the "kontakt" page
//
// app.post("/upload/vastuvott", async function(req, res) {
//
//   // parse the JSON data received from the client-side
//
//   var vastuvottData = JSON.parse(req.body.data);
//
//   // for updating the "pealkiri" entry in the "vastuvott" section, obtain the est and en values from the data object sent from the browser
//
//   var estProperty = vastuvottData.tekstid.pealkiri.est;
//   var enProperty = vastuvottData.tekstid.pealkiri.en;
//
//   // create the values object with est and en properties
//
//   var valuesPealkiri = [estProperty, enProperty];
//
//   // create the sql text for updating the database
//
//   var sqlPealkiri = "UPDATE vastuvotttekstid SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//   // update the database
//
//   updateDatabase(sqlPealkiri, valuesPealkiri);
//
//   // for updating the "pealkiri" entry in the "ankeet" section, obtain the est and en values from the data object sent from the browser
//
//   var estPropertyAnkeet = vastuvottData.ankeet.pealkiri.est;
//   var enPropertyAnkeet = vastuvottData.ankeet.pealkiri.en;
//
//   // create the values object with est and en properties
//
//   var valuesPealkiriAnkeet = [estPropertyAnkeet, enPropertyAnkeet];
//
//   // create the sql text for updating the database
//
//   var sqlPealkiriAnkeet = "UPDATE vastuvottankeet SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//   // update the database
//
//   updateDatabase(sqlPealkiriAnkeet, valuesPealkiriAnkeet);
//
//   // query the database for "loik" entries in the "vastuvotttekstid" table
//
//   con.query("SELECT * FROM vastuvotttekstid ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // loop through the results ("loik" entries start from position 1)
//
//     for (var i = 1; i < result.length; i++) {
//
//       // for each relevant entry, get its name property
//
//       var nameProperty = result[i].name;
//
//       // modify the iterator by substracting 1 from it and use it to obtain the user-inputted values from the vastuvottData object sent by the browser
//       // (the relevant array in the vastuvottData object corresponds to the database results with the exception that it starts from position 0 not 1)
//
//       var estProperty = vastuvottData.tekstid.loigud[i - 1].est;
//       var enProperty = vastuvottData.tekstid.loigud[i - 1].en;
//
//       // create a values object using those variables
//
//       var values = [estProperty, enProperty, nameProperty];
//
//       // create the sql text for updating the database
//
//       var sql = "UPDATE vastuvotttekstid SET est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // query the database for "vali" entries in the "vastuvottankeet" table
//
//   con.query("SELECT * FROM vastuvottankeet ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // loop through the results ("vali" entries start from position 1)
//
//     for (var i = 1; i < result.length; i++) {
//
//       // for each relevant entry, get its name property
//
//       var nameProperty = result[i].name;
//
//       // modify the iterator by substracting 1 from it and use it to obtain the user-inputted values from the vastuvottData object sent by the browser
//       // (the relevant array in the vastuvottData object corresponds to the database results with the exception that it starts from position 0 not 1)
//
//       var estProperty = vastuvottData.ankeet.valjad[i - 1].est;
//       var enProperty = vastuvottData.ankeet.valjad[i - 1].en;
//       var checkedProperty = vastuvottData.ankeet.valjad[i - 1].checked;
//       var textAreaProperty = vastuvottData.ankeet.valjad[i - 1].textArea;
//
//       // create a values object using those variables
//
//       var values = [estProperty, enProperty, checkedProperty, textAreaProperty, nameProperty];
//
//       // create the sql text for updating the database
//
//       var sql = "UPDATE vastuvottankeet SET est = ?, en = ?, checked = ?, textarea = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new loik to the "tekstid" section on the "vastuvõtt" part of the "kontakt" page
//
// app.post("/upload/vastuvott/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO vastuvotttekstid (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "tekstid" section on the "vastuvott" part of the "kontakt" page
//
// app.post("/upload/vastuvott/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM vastuvotttekstid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[currentIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM vastuvotttekstid WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new field to the "ankeet" section on the "kontakt" page
//
// app.post("/upload/vastuvott/ankeet/new", function(req, res) {
//
//   // create variables for new database entries- est, en, checked and textarea properties will be empty strings,
//   // while the name property will be "vali" + current timestamp
//
//   var nameProperty = "vali" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//   var checkedProperty = "";
//   var textAreaProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO vastuvottankeet (name, est, en, checked, textarea) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + checkedProperty + "', '" + textAreaProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a field from the ankeet" section on the "kontakt" page
//
// app.post("/upload/vastuvott/ankeet/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "vali" entries
//
//   con.query("SELECT * FROM vastuvottankeet ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // as the "vali" elements start from the second result onwards, add 1 to the index number
//
//     var realIndex = currentIndex + 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM vastuvottankeet WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
//
// // update the "sundmused" page
//
// app.post("/upload/sundmused", function(req, res) {
//
//   // create an empty array that will be populated by the field objects, which will contain the name and maxCount attributes of the uploaded images
//
//   var fieldsArray = [];
//
//   // query the database for existing entries for the "plakat" images
//
//   con.query("SELECT * FROM sundmusedpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // create as many field objects as there are database entries
//
//     for (var i = 0; i < result.length; i++) {
//
//       // each "plakat" image has a number in its name, which is the iterator + 1 (since normal people start counting from 1 not 0)
//
//       var indexNumber = i + 1;
//
//       // create the field object
//
//       var field = {
//         name: "sundmused" + indexNumber + "Plakat",
//         maxCount: 1
//       };
//
//       // push the field object into the array above
//
//       fieldsArray.push(field);
//     }
//
//     // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files
//
//     var upload = multer({
//       storage: storage
//     }).fields(fieldsArray);
//
//     // initialize the upload
//
//     upload(req, res, async function(err) {
//       if (err) throw err;
//
//       // obtain the keys of the req.files object (which contains information about uploaded images)
//
//       var keysPildid = Object.keys(req.files);
//
//       // create a name and url property for each key in the req.files object
//
//       for (let i = 0; i < keysPildid.length; i++) {
//
//         // get each key separately
//
//         var currentKeyPildid = keysPildid[i];
//
//         // using the key, get the corresponding image in the req.files object
//
//         var currentImg = req.files[currentKeyPildid];
//
//         // check if a corresponding image exists for each key
//
//         if (currentImg !== undefined) {
//
//           // if yes, construct the url property from the images originalname property
//
//           var urlProperty = "/img/" + currentImg[0].originalname;
//
//           // obtain the index number within the image's fieldname, in the specified position
//
//           var indexNumber = currentImg[0].fieldname.slice(9, -6);
//
//           // since js starts counting from 0 not 1, subtract 1 from the index number
//
//           var realIndex = indexNumber - 1;
//
//           // get the database result that corresponds to the obtained index
//
//           var nameProperty = result[realIndex].name;
//
//           // create the sql text
//
//           var sqlPildid = "UPDATE sundmusedpildid SET url = ? WHERE name = ?";
//
//           // create an array, which will contain values that will replace question marks in the sql text
//
//           var valuesPildid = [urlProperty, nameProperty];
//
//           // update the database
//
//           await updateDatabase(sqlPildid, valuesPildid);
//         }
//       }
//
//       // query the "sundmusedsissejuhatus" table for entries
//
//       con.query("SELECT * FROM sundmusedsissejuhatus ORDER BY id", async function(err, result) {
//         if (err) throw err;
//
//         // loop through the results
//
//         for (var i = 0; i < result.length; i++) {
//
//           // get the name property for each result
//
//           var nameProperty = result[i].name;
//
//           // to get the user-inputted values for each of the required inputs, we need to know their index numbers
//           // we get it for each result by adding 1 to the iterator (because normal people start counting from 1 not 0)
//
//           var indexNumber = i + 1;
//
//           // construct the keys by which to access the user-inputted values
//
//           var estKey = "sundmusedSissejuhatusLoikEst" + indexNumber;
//           var enKey = "sundmusedSissejuhatusLoikEn" + indexNumber;
//
//           // get the user-inputted values
//
//           var estProperty = req.body[estKey];
//           var enProperty = req.body[enKey];
//
//           // for each result, create an array of the obtained values
//
//           var values = [estProperty, enProperty, nameProperty];
//
//           // create the sql text for updating the database, where question marks will be replaced from the values array created above
//
//           var sql = "UPDATE sundmusedsissejuhatus SET est = ?, en = ? WHERE name = ?";
//
//           // update the database
//
//           await updateDatabase(sql, values);
//         }
//
//         // create the sql text to query the database for table names (we eventually need the ones named "sundmused" + timestamp and "sundmusedkoht" + timestamp)
//
//         var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//         // make the database query
//
//         con.query(sql, async function(err, result) {
//           if (err) throw err;
//
//           // create two empty arrays that will be populated by the names of the relevant tables in the database
//
//           var tableNames = [];
//           var tableNamesKoht = [];
//
//           // loop through all the tables in the database
//
//           for (var i = 0; i < result.length; i++) {
//
//             // capture the name of each table in a variable
//
//             var tableName = (result[i].table_name);
//
//             // one type of relevant tables have "sundmused" string in their name, but not "pildid", "koht" or "sissejuhatus" string
//
//             if (tableName.indexOf("sundmused") !== -1 &&
//               tableName.indexOf("pildid") === -1 &&
//               tableName.indexOf("koht") === -1 &&
//               tableName.indexOf("sissejuhatus") === -1) {
//
//               // push the relevant table names into the above array
//
//               tableNames.push(tableName);
//
//               // the other type of tables have a "sundmusedkoht" string in their name
//
//             } else if (tableName.indexOf("sundmusedkoht") !== -1) {
//
//               // push the relevant table names into the above array
//
//               tableNamesKoht.push(tableName);
//             }
//           }
//
//           // the tables have a timestamp in their name- sort the arrays in ascending order
//
//           var sortedTableNames = tableNames.sort(function(a, b) {
//             return a - b;
//           });
//
//           var sortedTableNamesKoht = tableNamesKoht.sort(function(a, b) {
//             return a - b;
//           });
//
//           // obtain all the name properties of the text inputs on the "sundmused" page
//
//           var keysTekstid = Object.keys(req.body);
//
//           // create an empty array, where the name properties of the dynamic text inputs will be stored
//
//           var keysLoik = [];
//           var keysLoikKoht = [];
//
//           // to get the "loik" input names, loop through all the input names obtained above
//
//           for (var a = 0; a < keysTekstid.length; a++) {
//
//             // capture each input name in a variable
//
//             var keyTekstid = keysTekstid[a];
//
//             // check if the input name contains the string "Loik" but not "Koht" or "Sissejuhatus"
//
//             if (keyTekstid.indexOf("Loik") !== -1 && keyTekstid.indexOf("Koht") === -1 && keyTekstid.indexOf("Sissejuhatus") === -1) {
//
//               // if yes, store the input in the keysLoik array
//
//               keysLoik.push(keyTekstid);
//
//               // check if the input name contains the string "LoikKoht"
//
//             } else if (keyTekstid.indexOf("LoikKoht") !== -1) {
//
//               // if yes, store the input in the keysLoikKoht array
//
//               keysLoikKoht.push(keyTekstid);
//             }
//           }
//
//           // sort all "loik" input names into two arrays of objects, which at first will be empty
//
//           var sortedKeysLoik = [];
//           var sortedKeysLoikKoht = [];
//
//           // loop through all the "loik" input names
//
//           for (var e = 0; e < keysLoik.length; e++) {
//
//             // capture the index number of the database table that each of those input names are referring to-
//             // this will be a number in the input name after the word "sundmused" and before "Loik"
//
//             // determine where the letters "Loik" are in the input name
//
//             var loikIndex = keysLoik[e].indexOf("Loik");
//
//             // get the table index between the words "sundmused" and "loik"
//
//             var tableIndex = keysLoik[e].slice(9, loikIndex);
//
//             // the input name also has an element index, which determines the position of this particular entry in the database table-
//             // we find this number at the end of the input name, after either the letters "Est" or "En"
//
//             // check if the input name contains the letters "Est"
//
//             if (keysLoik[e].indexOf("Est") !== -1) {
//
//               // if yes, find out the position of those letters in the input name and add 3 to that index,
//               // because "Est" is three letters long and we need to know where is the end rather than the beginning of those three letters
//
//               var estEndIndex = keysLoik[e].indexOf("Est") + 3;
//
//               // now that we know where the end of the letters "Est" is, we can use it to obtain the element index number,
//               // which is situated right after those letters
//
//               var estElementIndex = keysLoik[e].slice(estEndIndex);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoik.push({
//                 name: keysLoik[e],
//                 tableIndex: tableIndex,
//                 elementIndex: estElementIndex
//               });
//
//               // check if the input name contains the letters "En" (It should if it doesn't contain the letters "Est")
//
//             } else if (keysLoik[e].indexOf("En") !== -1) {
//
//               // if yes, find out where the last letter of the word "En" is located in the input name
//
//               var enEndIndex = keysLoik[e].indexOf("En") + 2;
//
//               // use that information to get the element index, which is located right after the letters "En" in the input name
//
//               var enElementIndex = keysLoik[e].slice(enEndIndex);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoik.push({
//                 name: keysLoik[e],
//                 tableIndex: tableIndex,
//                 elementIndex: enElementIndex
//               });
//             }
//           }
//
//           // loop through all the "loikKoht" input names
//
//           for (var f = 0; f < keysLoikKoht.length; f++) {
//
//             // capture the index number of the database table that each of those input names are referring to-
//             // this will be a number in the input name after the word "sundmused" and before "Loik"
//
//             // determine where the letters "Loik" are in the input name
//
//             var loikIndexKoht = keysLoikKoht[f].indexOf("Loik");
//
//             // get the table index between the words "sundmused" and "loik"
//
//             var tableIndexKoht = keysLoikKoht[f].slice(9, loikIndexKoht);
//
//             // the input name also has an element index, which determines the position of this particular entry in the database table-
//             // we find this number at the end of the input name, after either the letters "Est" or "En"
//
//             // check if the input name contains the letters "Est"
//
//             if (keysLoikKoht[f].indexOf("Est") !== -1) {
//
//               // if yes, find out the position of those letters in the input name and add 3 to that index,
//               // because "Est" is three letters long and we need to know where is the end rather than the beginning of those three letters
//
//               var estEndIndexKoht = keysLoikKoht[f].indexOf("Est") + 3;
//
//               // now that we know where the end of the letters "Est" is, we can use it to obtain the element index number,
//               // which is situated right after those letters
//
//               var estElementIndexKoht = keysLoikKoht[f].slice(estEndIndexKoht);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoikKoht.push({
//                 name: keysLoikKoht[f],
//                 tableIndex: tableIndexKoht,
//                 elementIndex: estElementIndexKoht
//               });
//
//               // check if the input name contains the letters "En"
//
//             } else if (keysLoikKoht[f].indexOf("En") !== -1) {
//
//               // if yes, find out where the last letter of the word "En" is located in the input name
//
//               var enEndIndexKoht = keysLoikKoht[f].indexOf("En") + 2;
//
//               // use that information to get the element index, which is located right after the letters "En" in the input name
//
//               var enElementIndexKoht = keysLoikKoht[f].slice(enEndIndexKoht);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoikKoht.push({
//                 name: keysLoikKoht[f],
//                 tableIndex: tableIndexKoht,
//                 elementIndex: enElementIndexKoht
//               });
//
//               // check if the input name contains the letters "Link"
//
//             } else if (keysLoikKoht[f].indexOf("Link") !== -1) {
//
//               // if yes, find out the position of those letters in the input name and add 4 to that index,
//               // because "Link" is four letters long and we need to know where is the end rather than the beginning of those three letters
//
//               var linkEndIndexKoht = keysLoikKoht[f].indexOf("Link") + 4;
//
//               // now that we know where the end of the letters "Link" is, we can use it to obtain the element index number,
//               // which is situated right after those letters
//
//               var linkElementIndexKoht = keysLoikKoht[f].slice(linkEndIndexKoht);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoikKoht.push({
//                 name: keysLoikKoht[f],
//                 tableIndex: tableIndexKoht,
//                 elementIndex: linkElementIndexKoht
//               });
//             }
//           }
//
//           // create an empty array for all the database tables, where the "sundmusedLoik" entries are stored
//           // and another for the one, where the "sundmusedLoikKoht" entries are located
//
//           var currentTableNames = [];
//           var currentTableNamesKoht = [];
//
//
//           // create empty arrays for the data about "Est", "En" and "Link" inputs
//
//           var estDataArray = [];
//           var enDataArray = [];
//           var estDataKohtArray = [];
//           var enDataKohtArray = [];
//           var linkDataKohtArray = [];
//
//           // using the sortedKeysLoik array, obtain the data about "Est" inputs-
//           // only every second object in the array will be an "Est" object, that is why the iterator will always be increased by 2 in the loop
//
//           for (let g = 0; g < sortedKeysLoik.length; g += 2) {
//
//             // for every "Est" object obtain the tableIndex, which will be used to select a relevant database table,
//             // also subtract 1 from this index, because javascript starts counting from 0
//
//             var currentTableIndex = sortedKeysLoik[g].tableIndex - 1;
//
//             // using this index, get the name of the database table that contains the data about the current input,
//             // the database names have already been stored and sorted in an array named sortedTableNames
//
//             var currentTableName = sortedTableNames[currentTableIndex];
//
//             // push the table name into the array created above
//
//             currentTableNames.push(currentTableName);
//
//             // for each input, obtain the user-inputted value (using the req.body object of multer)
//
//             var estValue = req.body[sortedKeysLoik[g].name];
//
//             // get the element index from each input
//
//             var estIndex = sortedKeysLoik[g].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEstIndex = estIndex - 1;
//
//             // add 1 to this index, since the relevant entries start from position 1 onwards
//
//             var realEstIndex = currentEstIndex + 1;
//
//             // using the obtained data, create a javascript object
//
//             var estData = {
//               value: estValue,
//               elementIndex: realEstIndex
//             };
//
//             // push this object into the array created above
//
//             estDataArray.push(estData);
//           }
//
//           // for the "En" inputs loop through the sortedKeysLoik array way once more, but this time the iterator will start on position 1 not 0
//
//           for (let h = 1; h < sortedKeysLoik.length; h += 2) {
//
//             // capture the user-inputted value for each input
//
//             var enValue = req.body[sortedKeysLoik[h].name];
//
//             // capture the element index for each input
//
//             var enIndex = sortedKeysLoik[h].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEnIndex = enIndex - 1;
//
//             // add 1 to this index, since the relevant entries start from position 1 onwards
//
//             var realEnIndex = currentEnIndex + 1;
//
//             // using the obtained data, create a javascript object
//
//             var enData = {
//               value: enValue,
//               elementIndex: realEnIndex
//             };
//
//             // push this object into the array created above
//
//             enDataArray.push(enData);
//           }
//
//
//           // using the sortedKeysLoikKoht array, repeat the above process with the "loikKoht" inputs,
//           // only that this time we also have the "link" input, which means we increase the iterator always by 3
//
//           for (let j = 0; j < sortedKeysLoikKoht.length; j += 3) {
//
//             // for every "Est" object obtain the tableIndex, which will be used to select a relevant database table,
//             // also subtract 1 from this index, because javascript starts counting from 0
//
//             var currentTableIndexKoht = sortedKeysLoikKoht[j].tableIndex - 1;
//
//             // using this index, get the name of the database table that contains the data about the current input,
//             // the database names have already been stored and sorted in an array named sortedTableNames
//
//             var currentTableNameKoht = sortedTableNamesKoht[currentTableIndexKoht];
//
//             // push the table name into the array created above
//
//             currentTableNamesKoht.push(currentTableNameKoht);
//
//             // for each input, obtain the user-inputted value (using the req.body object of multer)
//
//             var estValueKoht = req.body[sortedKeysLoikKoht[j].name];
//
//             // get the element index from each input
//
//             var estIndexKoht = sortedKeysLoikKoht[j].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEstIndexKoht = estIndexKoht - 1;
//
//             // using the obtained data, create a javascript object
//
//             var estDataKoht = {
//               value: estValueKoht,
//               elementIndex: currentEstIndexKoht
//             };
//
//             // push this object into the array created above
//
//             estDataKohtArray.push(estDataKoht);
//           }
//
//           // for the "En" inputs loop through the sortedKeysLoikKoht array way once more, but this time the iterator will start on position 1 not 0
//
//           for (let k = 1; k < sortedKeysLoikKoht.length; k += 3) {
//
//             // capture the user-inputted value for each input
//
//             var enValueKoht = req.body[sortedKeysLoikKoht[k].name];
//
//             // capture the element index for each input
//
//             var enIndexKoht = sortedKeysLoikKoht[k].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEnIndexKoht = enIndexKoht - 1;
//
//             // using the obtained data, create a javascript object
//
//             var enDataKoht = {
//               value: enValueKoht,
//               elementIndex: currentEnIndexKoht
//             };
//
//             // push this object into the array created above
//
//             enDataKohtArray.push(enDataKoht);
//           }
//
//           // for the "Link" inputs loop through the sortedKeysLoikKoht array way once more, but this time the iterator will start on position 2
//
//           for (let p = 2; p < sortedKeysLoikKoht.length; p += 3) {
//
//             // capture the user-inputted value for each input
//
//             var linkValueKoht = req.body[sortedKeysLoikKoht[p].name];
//
//             // capture the element index for each input
//
//             var linkIndexKoht = sortedKeysLoikKoht[p].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentLinkIndexKoht = linkIndexKoht - 1;
//
//             // using the obtained data, create a javascript object
//
//             var linkDataKoht = {
//               value: linkValueKoht,
//               elementIndex: currentLinkIndexKoht
//             };
//
//             // push this object into the array created above
//
//             linkDataKohtArray.push(linkDataKoht);
//           }
//
//           // to update the correct entries in the correct database tables, loop through the currentTableNames array,
//           // which now contains all the relevant table names in the right order-
//           // use the keyword "let" for the iterator, because this way the iterator can be passed into the con.query callback
//
//           for (let l = 0; l < currentTableNames.length; l++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNames[l] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the estDataArray object, to update all the estonian inputs
//
//               var nameProperty = result[estDataArray[l].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var values = [estDataArray[l].value, nameProperty];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sql = "UPDATE " + currentTableNames[l] + " SET est = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sql, values);
//             });
//           }
//
//
//           // loop through the currentTableNames array once more, but this time the english inputs will be updated
//
//           for (let m = 0; m < currentTableNames.length; m++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNames[m] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the enDataArray object, to update all the english inputs
//
//               var nameProperty = result[enDataArray[m].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var values = [enDataArray[m].value, nameProperty];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sql = "UPDATE " + currentTableNames[m] + " SET en = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sql, values);
//             });
//           }
//
//           // repeat the above process with "loikKoht" inputs
//
//           for (let n = 0; n < currentTableNamesKoht.length; n++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNamesKoht[n] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the estDataKohtArray object, to update all the estonian inputs
//
//               var nameProperty = result[estDataKohtArray[n].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var values = [estDataKohtArray[n].value, nameProperty];
//
//               // create the sql text using the relevant entry from the currentTableNamesKoht array
//
//               var sql = "UPDATE " + currentTableNamesKoht[n] + " SET est = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sql, values);
//             });
//           }
//
//
//           // loop through the currentTableNamesKoht array once more, but this time the english inputs will be updated
//
//           for (let o = 0; o < currentTableNamesKoht.length; o++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNamesKoht[o] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the enDataKohtArray object, to update all the english inputs
//
//               var nameProperty = result[enDataKohtArray[o].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var values = [enDataKohtArray[o].value, nameProperty];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sql = "UPDATE " + currentTableNamesKoht[o] + " SET en = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sql, values);
//             });
//           }
//
//           // loop through the currentTableNamesKoht array once more, but this time the "link" inputs will be updated
//
//           for (let q = 0; q < currentTableNamesKoht.length; q++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNamesKoht[q] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the enDataKohtArray object, to update all the english inputs
//
//               var nameProperty = result[linkDataKohtArray[q].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var values = [linkDataKohtArray[q].value, nameProperty];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sql = "UPDATE " + currentTableNamesKoht[q] + " SET link = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sql, values);
//             });
//           }
//
//           // loop through all the (sorted) "sundmused" table names again
//
//           for (var r = 0; r < sortedTableNames.length; r++) {
//
//             // capture each table name in a variable
//
//             var thisTableName = sortedTableNames[r];
//
//             // for the user-inputted values, we need to know all the input names, which all have an index number in them,
//             // use the iterator and add 1 to it (because the index numbers start from 1 not 0) to get this number
//
//             var indexNumberPealkiri = r + 1;
//
//             // construct the input names
//
//             var pealkiriEstKey = "sundmused" + indexNumberPealkiri + "PealkiriEst";
//             var pealkiriEnKey = "sundmused" + indexNumberPealkiri + "PealkiriEn";
//
//             // capture the values of these inputs
//
//             var estPropertyPealkiri = req.body[pealkiriEstKey];
//             var enPropertyPealkiri = req.body[pealkiriEnKey];
//
//             // create an array of these values
//
//             var valuesPealkiri = [estPropertyPealkiri, enPropertyPealkiri];
//
//             // create the sql text for updating the "pealkiri" entries
//
//             var sqlPealkiri = "UPDATE " + thisTableName + " SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//             // update the database
//
//             await updateDatabase(sqlPealkiri, valuesPealkiri);
//           }
//
//           // send a server response
//
//           res.send("OK!");
//         });
//       });
//     });
//   });
// });
//
//
//
// // add a new subform for the "sundmused" page
//
// app.post("/upload/sundmused/new", async function(req, res) {
//
//   // create a name for a new table in the database- this will be "sundmused" + the current timestamp
//
//   var namePropertyTable = "sundmused" + Date.now();
//
//   // create the sql text for creating a new table
//
//   var sqlCreate = "CREATE TABLE " + namePropertyTable + " (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(3000), en varchar(3000), PRIMARY KEY(id)) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
//
//   // create a new table using the sql text
//
//   updateDatabase(sqlCreate);
//
//   // create sql text to alter the character set of the new table using the table name created above
//
//   var sqlAlter = "ALTER TABLE " + namePropertyTable + " CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
//
//   // execute the alteration
//
//   updateDatabase(sqlAlter);
//
//
//   // create a name for another new table in the database- this will be "sundmusedkoht" + the current timestamp
//
//   var namePropertyTableKoht = "sundmusedkoht" + Date.now();
//
//   // create the sql text for creating a new table
//
//   var sqlCreateKoht = "CREATE TABLE " + namePropertyTableKoht + " (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(255), en varchar(255), link varchar(255), PRIMARY KEY(id)) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
//
//   // create a new table using the sql text
//
//   updateDatabase(sqlCreateKoht);
//
//   // create sql text to alter the character set of the new table using the table name created above
//
//   var sqlAlterKoht = "ALTER TABLE " + namePropertyTableKoht + " CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
//
//   // execute the alteration
//
//   updateDatabase(sqlAlterKoht);
//
//   // create the sql text for inserting a "pealkiri" entry into one of the new tables
//
//   var sqlInsert = "INSERT INTO " + namePropertyTable + " (name, est, en) VALUES ('pealkiri','', '')";
//
//   // insert the entry into the new table
//
//   updateDatabase(sqlInsert);
//
//   // create a name property variable for a new entry to the "sundmusedpildid" table in the database, this will be "plakat" + the current timestamp
//
//   var namePropertyPilt = "plakat" + Date.now();
//
//   // create the sql text, where namePropertyPilt is the variable created above
//
//   var sqlPilt = "INSERT INTO sundmusedpildid (name, url) VALUES ('" + namePropertyPilt + "', '')";
//
//   // insert the new "plakat" entry into the database
//
//   updateDatabase(sqlPilt);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a subform from the "sundmused" page
//
// app.post("/upload/sundmused/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted subform
//
//   var deleteSubformData = JSON.parse(req.body.data);
//
//   // to find the right result, we need to know the subform's index number-
//   // this will be the id number of the deleted subform minus 1 (since js starts to count from 0 not 1)
//
//   var indexNumber = deleteSubformData.idNumber - 1;
//
//   // create the sql text for querying the database for the tables related to the "sundmused" subforms
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // there will be two arrays of table names, with equal length,
//     // first create these as empty arrays and they will later be populated by relevant table names
//
//     var tableNames = [];
//     var tableNamesKoht = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // firstly, capture the tables that have "sundmused" string in their name, but not "pildid", "sissejuhatus" or "koht" strings
//
//       if (tableName.indexOf("sundmused") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("sissejuhatus") === -1 &&
//         tableName.indexOf("koht") === -1) {
//
//         // push the table names into the above array
//
//         tableNames.push(tableName);
//
//
//         // then capture the tables that have "sundmusedkoht" string in their name
//
//       } else if (tableName.indexOf("sundmusedkoht") !== -1) {
//
//         // push the table names into the above array
//
//         tableNamesKoht.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort both arrays in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     var sortedTableNamesKoht = tableNamesKoht.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the tables from both arrays that correspond to the deleted subform using the retrieved index number
//
//     var currentResult = sortedTableNames[indexNumber];
//     var currentResultKoht = sortedTableNamesKoht[indexNumber];
//
//     // the retrieved table names will be included in the sql texts as variables
//
//     var nameProperty = currentResult;
//     var namePropertyKoht = currentResultKoht;
//
//     // check if the deleted subform has any text elements added to it
//     // if yes, we will not delete the corresponding database tables, but instead rename them, so that they will be displayed as past events
//
//     if (deleteSubformData.textQuery === true) {
//
//       // get the timestamp from both table names
//
//       var timeStamp = nameProperty.slice(9);
//       var timeStampKoht = namePropertyKoht.slice(13);
//
//       // create two new tables with the obtained timestamps as part of their name
//
//       var newNameProperty = "moodunud" + timeStamp;
//       var newNamePropertyKoht = "moodunudkoht" + timeStampKoht;
//
//       // create two sql texts, which rename the tables so that they will be displayed in the "past events" section
//
//       var sqlAlter = "ALTER TABLE " + nameProperty + " RENAME TO " + newNameProperty;
//       var sqlAlterKoht = "ALTER TABLE " + namePropertyKoht + " RENAME TO " + newNamePropertyKoht;
//
//       // rename both tables
//
//       updateDatabase(sqlAlter);
//       updateDatabase(sqlAlterKoht);
//
//       // if the deleted subform does not have any text elements added to it, we will delete the corresponding tables completely
//
//     } else if (deleteSubformData.textQuery === false) {
//
//       // create the sql text for deleting the database tables
//
//       var sqlDelete = "DROP TABLE " + nameProperty;
//       var sqlDeleteKoht = "DROP TABLE " + namePropertyKoht;
//
//       // delete both tables
//
//       updateDatabase(sqlDelete);
//       updateDatabase(sqlDeleteKoht);
//     }
//   });
//
//   // the image on the deleted subform is stored in a different table- get all the images in this table as an array
//
//   con.query("SELECT * FROM sundmusedpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // the correct result can be found with the index number retrieved previously
//
//     var currentResult = result[indexNumber];
//
//     // get the properties for the correct image
//
//     var idProperty = currentResult.id;
//     var nameProperty = currentResult.name;
//     var urlProperty = currentResult.url;
//
//     // check again if the deleted subform has any text elements added to it
//     // if yes, we will delete the corresponding image entries, but not before transferring them to another table so that they could be displayed as past events
//
//     if (deleteSubformData.textQuery === true) {
//
//       // create the sql text for inserting those properties into the database table, which holds past events
//
//       var sql = "INSERT INTO moodunudpildid (id, name, url) VALUES ('" + idProperty + "', '" + nameProperty + "', '" + urlProperty + "')";
//
//       // insert the properties to the "new" database table
//
//       con.query(sql, function(err, result) {
//         if (err) throw err;
//
//         // create the sql text for deleting these properties from the "old" database table
//
//         var sql = "DELETE FROM sundmusedpildid WHERE name = '" + nameProperty + "'";
//
//         // delete the entry from the database
//
//         updateDatabase(sql);
//
//         // send a server response
//
//         res.send("OK!");
//       });
//
//       // if there are no text elements on the deleted subform, delete the corresponding image without preserving any data
//
//     } else if (deleteSubformData.textQuery === false) {
//
//       // create the sql text for deleting the corresponding entry from the database table
//
//       var sqlDeleteOnly = "DELETE FROM sundmusedpildid WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sqlDeleteOnly);
//
//       // send a server response
//
//       res.send("OK!");
//     }
//   });
// });
//
//
// // add a new "loik" element to the "sissejuhatus" section on the "sündmused" page
//
// app.post("/upload/sundmused/sissejuhatus/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO sundmusedsissejuhatus (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "sissejuhatus" section on the "sündmused" page
//
// app.post("/upload/sundmused/sissejuhatus/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM sundmusedsissejuhatus ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[currentIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM sundmusedsissejuhatus WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new "rida" element to the "sündmused" subform on the "sündmused" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/sundmused" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant table has a "sundmused" string in their name, but not "pildid", "sissejuhatus" or "koht" string
//
//       if (tableName.indexOf("sundmused") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("sissejuhatus") === -1 &&
//         tableName.indexOf("koht") === -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est and en properties will be empty strings, while the name property will be "rida" + current timestamp
//
//     var nameProperty = "rida" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//     // // insert the new entry into the corresponding database table
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "rida" element from the "sundmused" subform on the "sündmused" page-
// // because this is a dynamic route handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/sundmused" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "sundmused" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have a "sundmused" string in their name, but not "pildid", "sissejuhatus" or "koht" string
//
//       if (tableName.indexOf("sundmused") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("sissejuhatus") === -1 &&
//         tableName.indexOf("koht") === -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "rida" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // because the "rida" elements start from position 1 (position 0 occupied, by the "pealkiri" entry), add 1 to the index
//
//       var realIndex = currentIndex + 1;
//
//       // get the database entry of the deleted "rida" element
//
//       var currentResult = result[realIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//
//       // send a server response
//
//       res.send("OK!");
//     });
//   });
// });
//
//
// // add a new "koht" element to the "sündmused" subform on the "sündmused" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/sundmused/koht" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant table has a "sundmusedkoht" string in their name
//
//       if (tableName.indexOf("sundmusedkoht") !== -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est, en and link properties will be empty strings, while the name property will be "koht" + current timestamp
//
//     var nameProperty = "koht" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//     var linkProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en, link) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + linkProperty + "')";
//
//     // // insert the new entry into the corresponding database table
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "koht" element from the "sundmused" subform on the "sündmused" page-
// // because this is a dynamic route handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/sundmused/koht" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "sundmusedkoht" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have a "sundmusedkoht" string in their name
//
//       if (tableName.indexOf("sundmusedkoht") !== -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "koht" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // get the database entry of the deleted "koht" element
//
//       var currentResult = result[currentIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//
//       // send a server response
//
//       res.send("OK!");
//     });
//   });
// });
//
//
// // update the "pood" page
//
//
// app.post("/upload/pood", function(req, res) {
//
//   // create an empty array that will be populated by the field objects, which will contain the name and maxCount attributes of the uploaded images
//
//   var fieldsArray = [];
//
//   // query the database for existing entries for the "pilt" images
//
//   con.query("SELECT * FROM poodpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // create as many field objects as there are database entries
//
//     for (var i = 0; i < result.length; i++) {
//
//       // each "pilt" image has a number in its name, which is the iterator + 1 (since normal people start counting from 1 not 0)
//
//       var indexNumber = i + 1;
//
//       // create the field object
//
//       var field = {
//         name: "pood" + indexNumber + "Pilt",
//         maxCount: 1
//       };
//
//       // push the field object into the array above
//
//       fieldsArray.push(field);
//     }
//
//     // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files
//
//     var upload = multer({
//       storage: storage
//     }).fields(fieldsArray);
//
//     // initialize the upload
//
//     upload(req, res, async function(err) {
//       if (err) throw err;
//
//       // obtain the keys of the req.files object (which contains information about uploaded images)
//
//       var keysPildid = Object.keys(req.files);
//
//       // create a name and url property for each key in the req.files object
//
//       for (let i = 0; i < keysPildid.length; i++) {
//
//         // get each key separately
//
//         var currentKeyPildid = keysPildid[i];
//
//         // using the key, get the corresponding image in the req.files object
//
//         var currentImg = req.files[currentKeyPildid];
//
//         // check if a corresponding image exists for each key
//
//         if (currentImg !== undefined) {
//
//           // if yes, construct the url property from the images originalname property
//
//           var urlProperty = "/img/" + currentImg[0].originalname;
//
//           // obtain the index number within the image's fieldname, in the specified position
//
//           var indexNumber = currentImg[0].fieldname.slice(4, -4);
//
//           // since js starts counting from 0 not 1, subtract 1 from the index number
//
//           var realIndex = indexNumber - 1;
//
//           // get the database result that corresponds to the obtained index
//
//           var nameProperty = result[realIndex].name;
//
//           // create the sql text
//
//           var sqlPildid = "UPDATE poodpildid SET url = ? WHERE name = ?";
//
//           // create an array, which will contain values that will replace question marks in the sql text
//
//           var valuesPildid = [urlProperty, nameProperty];
//
//           // update the database
//
//           await updateDatabase(sqlPildid, valuesPildid);
//         }
//       }
//
//       // query the "poodsissejuhatus" table for entries
//
//       con.query("SELECT * FROM poodsissejuhatus ORDER BY id", async function(err, result) {
//         if (err) throw err;
//
//         // loop through the results
//
//         for (var i = 0; i < result.length; i++) {
//
//           // get the name property for each result
//
//           var nameProperty = result[i].name;
//
//           // to get the user-inputted values for each of the required inputs, we need to know their index numbers
//           // we get it for each result by adding 1 to the iterator (because normal people start counting from 1 not 0)
//
//           var indexNumber = i + 1;
//
//           // construct the keys by which to access the user-inputted values
//
//           var estKey = "poodSissejuhatusLoikEst" + indexNumber;
//           var enKey = "poodSissejuhatusLoikEn" + indexNumber;
//
//           // get the user-inputted values
//
//           var estProperty = req.body[estKey];
//           var enProperty = req.body[enKey];
//
//           // for each result, create an array of the obtained values
//
//           var values = [estProperty, enProperty, nameProperty];
//
//           // create the sql text for updating the database, where question marks will be replaced from the values array created above
//
//           var sql = "UPDATE poodsissejuhatus SET est = ?, en = ? WHERE name = ?";
//
//           // update the database
//
//           await updateDatabase(sql, values);
//         }
//
//         // create the sql text to query the database for table names
//         // (we eventually need the ones named "pood" + timestamp and "nimistu" + timestamp)
//
//         var sqlQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//         // make the database query
//
//         con.query(sqlQuery, async function(err, result) {
//           if (err) throw err;
//
//           // create two empty arrays that will be populated by the names of the relevant tables in the database
//
//           var tableNames = [];
//           var tableNamesNimistu = [];
//
//           // loop through all the tables in the database
//
//           for (var i = 0; i < result.length; i++) {
//
//             // capture the name of each table in a variable
//
//             var tableName = (result[i].table_name);
//
//             // one type of relevant tables have "pood" string in their name, but not "pildid" or "sissejuhatus" string
//
//             if (tableName.indexOf("pood") !== -1 &&
//               tableName.indexOf("pildid") === -1 &&
//               tableName.indexOf("sissejuhatus") === -1) {
//
//               // push the relevant table names into the above array
//
//               tableNames.push(tableName);
//
//               // other type of relevant tables have "nimistu" in their name
//
//             } else if (tableName.indexOf("nimistu") !== -1) {
//
//               // push the relevant table names into the corresponding array
//
//               tableNamesNimistu.push(tableName);
//             }
//
//           }
//
//           // the tables have a timestamp in their name- sort the arrays in ascending order
//
//           var sortedTableNames = tableNames.sort(function(a, b) {
//             return a - b;
//           });
//
//           var sortedTableNamesNimistu = tableNamesNimistu.sort(function(a, b) {
//             return a - b;
//           });
//
//           // obtain all the name properties of the text inputs on the "pood" page
//
//           var keysTekstid = Object.keys(req.body);
//
//           // create two empty arrays, where the name properties of the dynamic text inputs will be stored
//
//           var keysLoik = [];
//           var keysLoikNimistu = [];
//
//           // to get the "loik" input names, loop through all the input names obtained above
//
//           for (var a = 0; a < keysTekstid.length; a++) {
//
//             // capture each input name in a variable
//
//             var keyTekstid = keysTekstid[a];
//
//             // check if the input name contains the string "Loik" but not "Sissejuhatus" or "Nimistu"
//
//             if (keyTekstid.indexOf("Loik") !== -1 && keyTekstid.indexOf("Sissejuhatus") === -1 && keyTekstid.indexOf("Nimistu") === -1) {
//
//               // if yes, store the input name in the keysLoik array
//
//               keysLoik.push(keyTekstid);
//
//               // else check, if the input name contains the string "Nimistu"
//
//             } else if (keyTekstid.indexOf("Nimistu") !== -1) {
//
//               // if yes, store the input name in the keysLoikNimistu array
//
//               keysLoikNimistu.push(keyTekstid);
//             }
//           }
//
//           // sort all "loik" input names into an array of objects, which at first will be empty
//
//           var sortedKeysLoik = [];
//
//           // loop through all the "loik" input names
//
//           for (var e = 0; e < keysLoik.length; e++) {
//
//             // capture the index number of the database table that each of those input names are referring to-
//             // this will be a number in the input name after the word "pood" and before "Loik"
//
//             // determine where the letters "Loik" are in the input name
//
//             var loikIndex = keysLoik[e].indexOf("Loik");
//
//             // get the table index between the words "pood" and "loik"
//
//             var tableIndex = keysLoik[e].slice(4, loikIndex);
//
//             // the input name also has an element index, which determines the position of this particular entry in the database table-
//             // we find this number at the end of the input name, after either the letters "Est", "En" or "Number"
//
//             // check if the input name contains the letters "Est"
//
//             if (keysLoik[e].indexOf("Est") !== -1) {
//
//               // if yes, find out the position of those letters in the input name and add 3 to that index,
//               // because "Est" is three letters long and we need to know where is the end rather than the beginning of those three letters
//
//               var estEndIndex = keysLoik[e].indexOf("Est") + 3;
//
//               // now that we know where the end of the letters "Est" is, we can use it to obtain the element index number,
//               // which is situated right after those letters
//
//               var estElementIndex = keysLoik[e].slice(estEndIndex);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoik.push({
//                 name: keysLoik[e],
//                 tableIndex: tableIndex,
//                 elementIndex: estElementIndex
//               });
//
//               // check if the input name contains the letters "En"
//
//             } else if (keysLoik[e].indexOf("En") !== -1) {
//
//               // if yes, find out where the last letter of the word "En" is located in the input name
//
//               var enEndIndex = keysLoik[e].indexOf("En") + 2;
//
//               // use that information to get the element index, which is located right after the letters "En" in the input name
//
//               var enElementIndex = keysLoik[e].slice(enEndIndex);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoik.push({
//                 name: keysLoik[e],
//                 tableIndex: tableIndex,
//                 elementIndex: enElementIndex
//               });
//             }
//           }
//
//           // create an empty array for all the database tables, where the "poodLoik" entries are stored
//
//           var currentTableNames = [];
//
//           // create empty arrays for the data about "Est" and "En" inputs
//
//           var estDataArray = [];
//           var enDataArray = [];
//
//           // using the sortedKeysLoik array, obtain the data about "Est" inputs-
//           // only every second object in the array will be an "Est" object, that is why the iterator will always be increased by 2 in the loop
//
//           for (let g = 0; g < sortedKeysLoik.length; g += 2) {
//
//             // for every "Est" object obtain the tableIndex, which will be used to select a relevant database table,
//             // also subtract 1 from this index, because javascript starts counting from 0
//
//             var currentTableIndex = sortedKeysLoik[g].tableIndex - 1;
//
//             // using this index, get the name of the database table that contains the data about the current input,
//             // the database names have already been stored and sorted in an array named sortedTableNames
//
//             var currentTableName = sortedTableNames[currentTableIndex];
//
//             // push the table name into the array created above
//
//             currentTableNames.push(currentTableName);
//
//             // for each input, obtain the user-inputted value (using the req.body object of multer)
//
//             var estValue = req.body[sortedKeysLoik[g].name];
//
//             // get the element index from each input
//
//             var estIndex = sortedKeysLoik[g].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEstIndex = estIndex - 1;
//
//             // add 1 to this index, since the relevant entries start from position 1 onwards
//
//             var realEstIndex = currentEstIndex + 1;
//
//             // using the obtained data, create a javascript object
//
//             var estData = {
//               value: estValue,
//               elementIndex: realEstIndex
//             };
//
//             // push this object into the array created above
//
//             estDataArray.push(estData);
//           }
//
//           // for the "En" inputs loop through the sortedKeysLoik array way once more, but this time the iterator will start on position 1 not 0
//
//           for (let h = 1; h < sortedKeysLoik.length; h += 2) {
//
//             // capture the user-inputted value for each input
//
//             var enValue = req.body[sortedKeysLoik[h].name];
//
//             // capture the element index for each input
//
//             var enIndex = sortedKeysLoik[h].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEnIndex = enIndex - 1;
//
//             // add 1 to this index, since the relevant entries start from position 1 onwards
//
//             var realEnIndex = currentEnIndex + 1;
//
//             // using the obtained data, create a javascript object
//
//             var enData = {
//               value: enValue,
//               elementIndex: realEnIndex
//             };
//
//             // push this object into the array created above
//
//             enDataArray.push(enData);
//           }
//
//           // to update the correct entries in the correct database tables, loop through the currentTableNames array,
//           // which now contains all the relevant table names in the right order-
//           // use the keyword "let" for the iterator, because this way the iterator can be passed into the con.query callback
//
//           for (let l = 0; l < currentTableNames.length; l++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNames[l] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the estDataArray object, to update all the estonian inputs
//
//               var nameProperty = result[estDataArray[l].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var values = [estDataArray[l].value, nameProperty];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sql = "UPDATE " + currentTableNames[l] + " SET est = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sql, values);
//             });
//           }
//
//
//           // loop through the currentTableNames array once more, but this time the english inputs will be updated
//
//           for (let m = 0; m < currentTableNames.length; m++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNames[m] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the enDataArray object, to update all the english inputs
//
//               var nameProperty = result[enDataArray[m].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var values = [enDataArray[m].value, nameProperty];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sql = "UPDATE " + currentTableNames[m] + " SET en = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sql, values);
//             });
//           }
//
//           // sort all "loikNimistu" input names into an array of objects, which at first will be empty
//
//           var sortedKeysLoikNimistu = [];
//
//           // loop through all the "loik" input names
//
//           for (var q = 0; q < keysLoikNimistu.length; q++) {
//
//             // capture the index number of the database table that each of those input names are referring to-
//             // this will be a number in the input name after the word "pood" and before "Loik"
//
//             // determine where the letters "Loik" are in the input name
//
//             var loikIndexNimistu = keysLoikNimistu[q].indexOf("Loik");
//
//             // get the table index between the words "pood" and "loik"
//
//             var tableIndexNimistu = keysLoikNimistu[q].slice(4, loikIndexNimistu);
//
//             // the input name also has an element index, which determines the position of this particular entry in the database table-
//             // we find this number at the end of the input name, after either the letters "Est" or "En"
//
//             // check if the input name contains the letters "Est"
//
//             if (keysLoikNimistu[q].indexOf("Est") !== -1) {
//
//               // if yes, find out the position of those letters in the input name and add 3 to that index,
//               // because "Est" is three letters long and we need to know where is the end rather than the beginning of those three letters
//
//               var estEndIndexNimistu = keysLoikNimistu[q].indexOf("Est") + 3;
//
//               // now that we know where the end of the letters "Est" is, we can use it to obtain the element index number,
//               // which is situated right after those letters
//
//               var estElementIndexNimistu = keysLoikNimistu[q].slice(estEndIndexNimistu);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoikNimistu.push({
//                 name: keysLoikNimistu[q],
//                 tableIndex: tableIndexNimistu,
//                 elementIndex: estElementIndexNimistu
//               });
//
//
//               // check if the input name contains the letters "En" (It should if it doesn't contain the letters "Est")
//
//             } else if (keysLoikNimistu[q].indexOf("En") !== -1) {
//
//               // if yes, find out where the last letter of the word "En" is located in the input name
//
//               var enEndIndexNimistu = keysLoikNimistu[q].indexOf("En") + 2;
//
//               // use that information to get the element index, which is located right after the letters "En" in the input name
//
//               var enElementIndexNimistu = keysLoikNimistu[q].slice(enEndIndexNimistu);
//
//               // for each input name create an object, which also holds the table and element indexes obtained above,
//               // then push this object into an array created above
//
//               sortedKeysLoikNimistu.push({
//                 name: keysLoikNimistu[q],
//                 tableIndex: tableIndexNimistu,
//                 elementIndex: enElementIndexNimistu
//               });
//             }
//           }
//
//           // create an empty array for all the database tables, where the "poodLoikNimistu" entries are stored
//
//           var currentTableNamesNimistu = [];
//
//           // create empty arrays for the data about "Est" and "En" inputs
//
//           var estDataArrayNimistu = [];
//           var enDataArrayNimistu = [];
//
//           // using the sortedKeysLoikNimistu array, obtain the data about "Est" inputs-
//           // only every second object in the array will be an "Est" object, that is why the iterator will always be increased by 2 in the loop
//
//           for (let r = 0; r < sortedKeysLoikNimistu.length; r += 2) {
//
//             // for every "Est" object obtain the tableIndex, which will be used to select a relevant database table,
//             // also subtract 1 from this index, because javascript starts counting from 0
//
//             var currentTableIndexNimistu = sortedKeysLoikNimistu[r].tableIndex - 1;
//
//             // using this index, get the name of the database table that contains the data about the current input,
//             // the database names have already been stored and sorted in an array named sortedTableNames
//
//             var currentTableNameNimistu = sortedTableNamesNimistu[currentTableIndexNimistu];
//
//             // push the table name into the array created above
//
//             currentTableNamesNimistu.push(currentTableNameNimistu);
//
//             // for each input, obtain the user-inputted value (using the req.body object of multer)
//
//             var estValueNimistu = req.body[sortedKeysLoikNimistu[r].name];
//
//             // get the element index from each input
//
//             var estIndexNimistu = sortedKeysLoikNimistu[r].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEstIndexNimistu = estIndexNimistu - 1;
//
//             // using the obtained data, create a javascript object
//
//             var estDataNimistu = {
//               value: estValueNimistu,
//               elementIndex: currentEstIndexNimistu
//             };
//
//             // push this object into the array created above
//
//             estDataArrayNimistu.push(estDataNimistu);
//           }
//
//           // for the "En" inputs loop through the sortedKeysLoik array way once more, but this time the iterator will start on position 1 not 0
//
//           for (let s = 1; s < sortedKeysLoikNimistu.length; s += 2) {
//
//             // capture the user-inputted value for each input
//
//             var enValueNimistu = req.body[sortedKeysLoikNimistu[s].name];
//
//             // capture the element index for each input
//
//             var enIndexNimistu = sortedKeysLoikNimistu[s].elementIndex;
//
//             // subtract 1 from this index, because javascript starts counting from 0
//
//             var currentEnIndexNimistu = enIndexNimistu - 1;
//
//             // using the obtained data, create a javascript object
//
//             var enDataNimistu = {
//               value: enValueNimistu,
//               elementIndex: currentEnIndexNimistu
//             };
//
//             // push this object into the array created above
//
//             enDataArrayNimistu.push(enDataNimistu);
//           }
//
//           // to update the correct entries in the correct database tables, loop through the currentTableNamesNimistu array,
//           // which now contains all the relevant table names in the right order-
//           // use the keyword "let" for the iterator, because this way the iterator can be passed into the con.query callback
//
//           for (let t = 0; t < currentTableNamesNimistu.length; t++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNamesNimistu[t] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the estDataArrayNimistu object, to update all the estonian inputs
//
//               var namePropertyNimistu = result[estDataArrayNimistu[t].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var valuesNimistu = [estDataArrayNimistu[t].value, namePropertyNimistu];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sqlNimistu = "UPDATE " + currentTableNamesNimistu[t] + " SET est = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sqlNimistu, valuesNimistu);
//             });
//           }
//
//
//           // loop through the currentTableNamesNimistu array once more, but this time the english inputs will be updated
//
//           for (let u = 0; u < currentTableNamesNimistu.length; u++) {
//
//             // query for all entries in each of the tables
//
//             con.query("SELECT * FROM " + currentTableNamesNimistu[u] + " ORDER by id", async function(err, result) {
//               if (err) throw err;
//
//               // get the correct entry from the table using the elementIndex property created above-
//               // in this case we loop through the enDataArrayNimistu object, to update all the english inputs
//
//               var namePropertyNimistu = result[enDataArrayNimistu[u].elementIndex].name;
//
//               // create a values variable for the sql text to update the database table-
//               // this will consist of the user-inputted value and the name property created above
//
//               var valuesNimistu = [enDataArrayNimistu[u].value, namePropertyNimistu];
//
//               // create the sql text using the relevant entry from the currentTableNames array
//
//               var sqlNimistu = "UPDATE " + currentTableNamesNimistu[u] + " SET en = ? WHERE name = ?";
//
//               // update the database using the sql text values object created above
//
//               await updateDatabase(sqlNimistu, valuesNimistu);
//             });
//           }
//
//           // loop through all the (sorted) "pood" table names again
//
//           for (var r = 0; r < sortedTableNames.length; r++) {
//
//             // capture each table name in a variable
//
//             var thisTableName = sortedTableNames[r];
//
//             // for the user-inputted values, we need to know all the input names, which all have an index number in them,
//             // use the iterator and add 1 to it (because the index numbers start from 1 not 0) to get this number
//
//             var indexNumberToode = r + 1;
//
//             // construct the input names
//
//             var toodeEstKey = "pood" + indexNumberToode + "ToodeEst";
//             var toodeEnKey = "pood" + indexNumberToode + "ToodeEn";
//             var toodeNumberKey = "pood" + indexNumberToode + "ToodeNumber";
//
//             // capture the values of these inputs
//
//             var estPropertyToode = req.body[toodeEstKey];
//             var enPropertyToode = req.body[toodeEnKey];
//             var numberPropertyToode = req.body[toodeNumberKey];
//
//             // create an array of these values
//
//             var valuesToode = [estPropertyToode, enPropertyToode, numberPropertyToode];
//
//             // create the sql text for updating the "toode" entries
//
//             var sqlToode = "UPDATE " + thisTableName + " SET est = ?, en = ?, price = ? WHERE name = 'toode'";
//
//             // update the database
//
//             await updateDatabase(sqlToode, valuesToode);
//           }
//
//           // send a server response
//
//           res.send("OK!");
//
//         });
//       });
//     });
//   });
// });
//
//
// // add a new subform for the "pood" page
//
// app.post("/upload/pood/new", async function(req, res) {
//
//   // create a name for two new tables in the database- these will be "pood" and "nimistu" + the current timestamp
//
//   var namePropertyTable = "pood" + Date.now();
//   var namePropertyTableNimistu = "nimistu" + Date.now();
//
//   // create the sql texts for creating a new table
//
//   var sqlCreate = "CREATE TABLE " + namePropertyTable + " (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(3000), en varchar(3000), price varchar(255), PRIMARY KEY(id)) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
//   var sqlCreateNimistu = "CREATE TABLE " + namePropertyTableNimistu + " (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(3000), en varchar(3000), PRIMARY KEY(id)) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
//
//   // create the new tables using the sql texts
//
//   updateDatabase(sqlCreate);
//   updateDatabase(sqlCreateNimistu);
//
//   // create sql texts to alter the character set of the new tables using the table name created above
//
//   var sqlAlter = "ALTER TABLE " + namePropertyTable + " CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
//   var sqlAlterNimistu = "ALTER TABLE " + namePropertyTableNimistu + " CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
//
//   // execute the alteration
//
//   updateDatabase(sqlAlter);
//   updateDatabase(sqlAlterNimistu);
//
//   // create the sql text for inserting a "toode" entry into the new table
//
//   var sqlInsert = "INSERT INTO " + namePropertyTable + " (name, est, en, price) VALUES ('toode', '', '', '')";
//
//   // insert the entry into the new table
//
//   updateDatabase(sqlInsert);
//
//   // create a name property variable for a new entry to the "poodpildid" table in the database, this will be "pilt" + the current timestamp
//
//   var namePropertyPilt = "pilt" + Date.now();
//
//   // create the sql text, where namePropertyPilt is the variable created above
//
//   var sqlPilt = "INSERT INTO poodpildid (name, url) VALUES ('" + namePropertyPilt + "', '')";
//
//   // insert the new "pilt" entry into the database
//
//   updateDatabase(sqlPilt);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a subform from the "pood" page
//
//
// app.post("/upload/pood/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted subform
//
//   var deleteSubformData = JSON.parse(req.body.data);
//
//   // to find the right result, we need to know the subform's index number-
//   // this will be the id number of the deleted subform minus 1 (since js starts to count from 0 not 1)
//
//   var indexNumber = deleteSubformData.idNumber - 1;
//
//   // create the sql text for querying the database for the tables related to the "pood" subforms
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create two empty array, which will later be populated by relevant table names
//
//     var tableNames = [];
//     var tableNamesNimistu = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // firstly, capture the tables that have "pood" string in their name, but not "pildid" or "sissejuhatus" strings
//
//       if (tableName.indexOf("pood") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("sissejuhatus") === -1) {
//
//         // push the table names into the above array
//
//         tableNames.push(tableName);
//
//         // capture the tables that have "nimistu" string in their name
//
//       } else if (tableName.indexOf("nimistu") !== -1) {
//
//         // push the table names into the corresponding array
//
//         tableNamesNimistu.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the arrays in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     var sortedTableNamesNimistu = tableNamesNimistu.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the correct "pood" table from the array that corresponds to the deleted subform using the retrieved index number
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // the retrieved table name will be included in the sql text as a variable
//
//     var nameProperty = currentResult;
//
//     // create the sql text for deleting the database table
//
//     var sqlDelete = "DROP TABLE " + nameProperty;
//
//     // delete the table
//
//     updateDatabase(sqlDelete);
//
//     // get the correct "nimistu" table from the array that corresponds to the deleted subform using the retrieved index number
//
//     var currentResultNimistu = sortedTableNamesNimistu[indexNumber];
//
//     // the retrieved table name will be included in the sql text as a variable
//
//     var namePropertyNimistu = currentResultNimistu;
//
//     // create the sql text for deleting the database table
//
//     var sqlDeleteNimistu = "DROP TABLE " + namePropertyNimistu;
//
//     // delete the table
//
//     updateDatabase(sqlDeleteNimistu);
//   });
//
//   // the image on the deleted subform is stored in a different table- get all the images in this table as an array
//
//   con.query("SELECT * FROM poodpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // the correct result can be found with the index number retrieved previously
//
//     var currentResult = result[indexNumber];
//
//     // get the properties for the correct image
//
//     var idProperty = currentResult.id;
//     var nameProperty = currentResult.name;
//     var urlProperty = currentResult.url;
//
//     // create the sql text for deleting the corresponding entry from the database table
//
//     var sqlDelete = "DELETE FROM poodpildid WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sqlDelete);
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
// // add a new "loik" element to the "sissejuhatus" section on the "pood" page
//
// app.post("/upload/pood/sissejuhatus/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO poodsissejuhatus (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "sissejuhatus" section on the "pood" page
//
// app.post("/upload/pood/sissejuhatus/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM poodsissejuhatus ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[currentIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM poodsissejuhatus WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new "loik" element to the "pood" subform on the "pood" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/pood" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant table has a "pood" string in their name, but not "pildid" or "sissejuhatus" string
//
//       if (tableName.indexOf("pood") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("sissejuhatus") === -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est, en and number properties will be empty strings, while the name property will be "loik" + current timestamp
//
//     var nameProperty = "loik" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//     var priceProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en, price) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + priceProperty + "')";
//
//     // // insert the new entry into the corresponding database table
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "pood" subform on the "pood" page-
// // because this is a dynamic route handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/pood" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "pood" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have a "pood" string in their name, but not "pildid", "sissejuhatus" or "koht" string
//
//       if (tableName.indexOf("pood") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("sissejuhatus") === -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "rida" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // because the "loik" elements start from position 1 (position 0 occupied, by the "toode" entry), add 1 to the index
//
//       var realIndex = currentIndex + 1;
//
//       // get the database entry of the deleted "loik" element
//
//       var currentResult = result[realIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//
//       // send a server response
//
//       res.send("OK!");
//     });
//   });
// });
//
// // add a new "loikNimistu" element to the "pood" subform on the "pood" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/pood/nimistu" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant table has a "nimistu" string in their name
//
//       if (tableName.indexOf("nimistu") !== -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est, en and number properties will be empty strings, while the name property will be "loik" + current timestamp
//
//     var nameProperty = "rida" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//     // // insert the new entry into the corresponding database table
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loikNimistu" element from the "pood" subform on the "pood" page-
// // because this is a dynamic route handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/pood/nimistu" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "nimistu" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have a "nimistu" string in their name
//
//       if (tableName.indexOf("nimistu") !== -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in ascending order
//
//     var sortedTableNames = tableNames.sort(function(a, b) {
//       return a - b;
//     });
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "rida" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // get the database entry of the deleted "loik" element
//
//       var currentResult = result[currentIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//
//       // send a server response
//
//       res.send("OK!");
//     });
//   });
// });
//
// // update the "telli" part of the "pood" page
//
// app.post("/upload/telli", function(req, res) {
//
//   // parse the JSON data sent from the client side
//
//   var telliData = JSON.parse(req.body.data);
//
//   // for updating the "pealkiri" entry in the "kontaktandmed" section, obtain the est and en values from the data object sent from the browser
//
//   var estPropertyPealkiri = telliData.ankeet.pealkiri.est;
//   var enPropertyPealkiri = telliData.ankeet.pealkiri.en;
//
//   // create the values object with est and en properties
//
//   var valuesPealkiri = [estPropertyPealkiri, enPropertyPealkiri];
//
//   // create the sql text for updating the database
//
//   var sqlPealkiri = "UPDATE telliankeet SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//   // update the database
//
//   updateDatabase(sqlPealkiri, valuesPealkiri);
//
//   // for updating the "jarelloik" entry in the "kontaktandmed" section, obtain the est and en values from the data object sent from the browser
//
//   var estPropertyJarelloik = telliData.ankeet.jarelloik.est;
//   var enPropertyJarelloik = telliData.ankeet.jarelloik.en;
//
//   // create the values object with est and en properties
//
//   var valuesJarelloik = [estPropertyJarelloik, enPropertyJarelloik];
//
//   // create the sql text for updating the database
//
//   var sqlJarelloik = "UPDATE telliankeet SET est = ?, en = ? WHERE name = 'jarelloik'";
//
//   // update the database
//
//   updateDatabase(sqlJarelloik, valuesJarelloik);
//
//   // query the database for "loik" entries in the "telli" table
//
//   con.query("SELECT * FROM telli ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // loop through the results
//
//     for (var i = 0; i < result.length; i++) {
//
//       // for each relevant entry, get its name property
//
//       var nameProperty = result[i].name;
//
//       // use the iterator to obtain the user-inputted values from the vastuvottData object sent by the browser
//
//       var estProperty = telliData.loigud[i].est;
//       var enProperty = telliData.loigud[i].en;
//
//       // create a values object using those variables
//
//       var values = [estProperty, enProperty, nameProperty];
//
//       // create the sql text for updating the database
//
//       var sql = "UPDATE telli SET est = ?, en = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // query the database for "vali" entries in the "telliankeet" table
//
//   con.query("SELECT * FROM telliankeet ORDER BY id", async function(err, result) {
//     if (err) throw err;
//
//     // loop through the results ("vali" entries start from position 2)
//
//     for (var i = 2; i < result.length; i++) {
//
//       // for each relevant entry, get its name property
//
//       var nameProperty = result[i].name;
//
//       // modify the iterator by substracting 2 from it and use it to obtain the user-inputted values from the vastuvottData object sent by the browser
//       // (the relevant array in the vastuvottData object corresponds to the database results with the exception that it starts from position 0 not 2)
//
//       var estProperty = telliData.ankeet.valjad[i - 2].est;
//       var enProperty = telliData.ankeet.valjad[i - 2].en;
//       var checkedProperty = telliData.ankeet.valjad[i - 2].checked;
//       var textAreaProperty = telliData.ankeet.valjad[i - 2].textArea;
//
//       // create a values object using those variables
//
//       var values = [estProperty, enProperty, checkedProperty, textAreaProperty, nameProperty];
//
//       // create the sql text for updating the database
//
//       var sql = "UPDATE telliankeet SET est = ?, en = ?, checked = ?, textarea = ? WHERE name = ?";
//
//       // update the database
//
//       await updateDatabase(sql, values);
//     }
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new loik to the "telli" section on the "pood" page
//
// app.post("/upload/telli/new", function(req, res) {
//
//   // create variables for new database entries- est and en properties will be empty strings, while the name property will be "loik" + current timestamp
//
//   var nameProperty = "loik" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO telli (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "loik" element from the "telli" part of the "pood" page
//
// app.post("/upload/telli/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "loik" entries
//
//   con.query("SELECT * FROM telli ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[currentIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM telli WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // add a new field to the "kontaktandmed" section on the "pood" page
//
// app.post("/upload/telli/kontaktandmed/new", function(req, res) {
//
//   // create variables for new database entries- est, en, checked and textarea properties will be empty strings,
//   // while the name property will be "vali" + current timestamp
//
//   var nameProperty = "vali" + Date.now();
//   var estProperty = "";
//   var enProperty = "";
//   var checkedProperty = "";
//   var textAreaProperty = "";
//
//   // create the sql text with the variables created above
//
//   var sql = "INSERT INTO telliankeet (name, est, en, checked, textarea) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + checkedProperty + "', '" + textAreaProperty + "')";
//
//   // insert the new entry into the database
//
//   updateDatabase(sql);
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a field from the "kontaktandmed" section on the "pood" page
//
// app.post("/upload/telli/kontaktandmed/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // query the database for all the "vali" entries
//
//   con.query("SELECT * FROM telliankeet ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // to find the right result, we need to know its index number-
//     // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//     var currentIndex = deleteLoikData.idNumber - 1;
//
//     // as the "vali" elements start from the third result onwards, add 2 to the index number
//
//     var realIndex = currentIndex + 2;
//
//     // get the database entry of the deleted element
//
//     var currentResult = result[realIndex];
//
//     // get the name property of the database entry
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text
//
//     var sql = "DELETE FROM telliankeet WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sql);
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
// // update a "moodunud" subform on the "arhiiv" page
//
// app.post("/upload/moodunud", function(req, res) {
//
//   // create an empty array that will be populated by the field objects, which will contain the name and maxCount attributes of the uploaded images
//
//   var fieldsArray = [];
//
//   // query the database for existing entries for the "plakat" images
//
//   con.query("SELECT * FROM moodunudpildid ORDER by id DESC", function(err, result) {
//     if (err) throw err;
//
//     // create as many field objects as there are database entries
//
//     for (var i = 0; i < result.length; i++) {
//
//       // each "plakat" image has a number in its name, which is the iterator + 1 (since normal people start counting from 1 not 0)
//
//       var indexNumber = i + 1;
//
//       // create the field object
//
//       var field = {
//         name: "moodunud" + indexNumber + "Plakat",
//         maxCount: 1
//       };
//
//       // push the field object into the array above
//
//       fieldsArray.push(field);
//     }
//
//     // setup a picture upload function with the "multer" module and specify the name and storage method of the uploaded files
//
//     var upload = multer({
//       storage: storage
//     }).fields(fieldsArray);
//
//     // initialize the upload
//
//     upload(req, res, async function(err) {
//       if (err) throw err;
//
//       // obtain the keys of the req.files object (which contains information about uploaded images)
//
//       var keysPildid = Object.keys(req.files);
//
//       // create a name and url property for each key in the req.files object
//
//       for (let i = 0; i < keysPildid.length; i++) {
//
//         // get each key separately
//
//         var currentKeyPildid = keysPildid[i];
//
//
//         // using the key, get the corresponding image in the req.files object
//
//         var currentImg = req.files[currentKeyPildid];
//
//         // check if a corresponding image exists for each key
//
//         if (currentImg !== undefined) {
//
//           // if yes, construct the url property from the images originalname property
//
//           var urlProperty = "/img/" + currentImg[0].originalname;
//
//           // obtain the index number within the image's fieldname, in the specified position
//
//           var indexNumber = currentImg[0].fieldname.slice(8, -6);
//
//           // since js starts counting from 0 not 1, subtract 1 from the index number
//
//           var realIndex = indexNumber - 1;
//
//           // get the database result that corresponds to the obtained index
//
//           var nameProperty = result[realIndex].name;
//
//           // create the sql text
//
//           var sqlPildid = "UPDATE moodunudpildid SET url = ? WHERE name = ?";
//
//           // create an array, which will contain values that will replace question marks in the sql text
//
//           var valuesPildid = [urlProperty, nameProperty];
//
//           // update the database
//
//           await updateDatabase(sqlPildid, valuesPildid);
//         }
//       }
//
//       // create the sql text to query the database for table names (we eventually need the ones named "moodunud" + timestamp and "moodunudkoht" + timestamp)
//
//       var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//       // make the database query
//
//       con.query(sql, async function(err, result) {
//         if (err) throw err;
//
//         // create two empty arrays that will be populated by the names of the relevant tables in the database
//
//         var tableNames = [];
//         var tableNamesKoht = [];
//
//         // loop through all the tables in the database
//
//         for (var i = 0; i < result.length; i++) {
//
//           // capture the name of each table in a variable
//
//           var tableName = (result[i].table_name);
//
//           // one type of relevant tables have "moodunud" string in their name, but not "pildid" or "koht" string
//
//           if (tableName.indexOf("moodunud") !== -1 &&
//             tableName.indexOf("pildid") === -1 &&
//             tableName.indexOf("koht") === -1) {
//
//             // push the relevant table names into the above array
//
//             tableNames.push(tableName);
//
//             // the other type of tables have a "moodunudkoht" string in their name
//
//           } else if (tableName.indexOf("moodunudkoht") !== -1) {
//
//             // push the relevant table names into the above array
//
//             tableNamesKoht.push(tableName);
//           }
//         }
//
//         // the tables have a timestamp in their name- sort the arrays in descending order
//
//         var sortedTableNames = tableNames.reverse();
//
//         var sortedTableNamesKoht = tableNamesKoht.reverse();
//
//         // obtain all the name properties of the text inputs on the "arhiiv" page
//
//         var keysTekstid = Object.keys(req.body);
//
//         // create an empty array, where the name properties of the dynamic text inputs will be stored
//
//         var keysLoik = [];
//         var keysLoikKoht = [];
//
//         // to get the "loik" input names, loop through all the input names obtained above
//
//         for (var a = 0; a < keysTekstid.length; a++) {
//
//           // capture each input name in a variable
//
//           var keyTekstid = keysTekstid[a];
//
//           // check if the input name contains the string "Loik" but not "Koht"
//
//           if (keyTekstid.indexOf("Loik") !== -1 && keyTekstid.indexOf("Koht") === -1) {
//
//             // if yes, store the input in the keysLoik array
//
//             keysLoik.push(keyTekstid);
//
//             // check if the input name contains the string "LoikKoht"
//
//           } else if (keyTekstid.indexOf("LoikKoht") !== -1) {
//
//             // if yes, store the input in the keysLoikKoht array
//
//             keysLoikKoht.push(keyTekstid);
//           }
//         }
//
//         // sort all "loik" input names into two arrays of objects, which at first will be empty
//
//         var sortedKeysLoik = [];
//         var sortedKeysLoikKoht = [];
//
//         // loop through all the "loik" input names
//
//         for (var e = 0; e < keysLoik.length; e++) {
//
//           // capture the index number of the database table that each of those input names are referring to-
//           // this will be a number in the input name after the word "moodunud" and before "Loik"
//
//           // determine where the letters "Loik" are in the input name
//
//           var loikIndex = keysLoik[e].indexOf("Loik");
//
//           // get the table index between the words "moodunud" and "loik"
//
//           var tableIndex = keysLoik[e].slice(8, loikIndex);
//
//           // the input name also has an element index, which determines the position of this particular entry in the database table-
//           // we find this number at the end of the input name, after either the letters "Est" or "En"
//
//           // check if the input name contains the letters "Est"
//
//           if (keysLoik[e].indexOf("Est") !== -1) {
//
//             // if yes, find out the position of those letters in the input name and add 3 to that index,
//             // because "Est" is three letters long and we need to know where is the end rather than the beginning of those three letters
//
//             var estEndIndex = keysLoik[e].indexOf("Est") + 3;
//
//             // now that we know where the end of the letters "Est" is, we can use it to obtain the element index number,
//             // which is situated right after those letters
//
//             var estElementIndex = keysLoik[e].slice(estEndIndex);
//
//             // for each input name create an object, which also holds the table and element indexes obtained above,
//             // then push this object into an array created above
//
//             sortedKeysLoik.push({
//               name: keysLoik[e],
//               tableIndex: tableIndex,
//               elementIndex: estElementIndex
//             });
//
//             // check if the input name contains the letters "En" (It should if it doesn't contain the letters "Est")
//
//           } else if (keysLoik[e].indexOf("En") !== -1) {
//
//             // if yes, find out where the last letter of the word "En" is located in the input name
//
//             var enEndIndex = keysLoik[e].indexOf("En") + 2;
//
//             // use that information to get the element index, which is located right after the letters "En" in the input name
//
//             var enElementIndex = keysLoik[e].slice(enEndIndex);
//
//             // for each input name create an object, which also holds the table and element indexes obtained above,
//             // then push this object into an array created above
//
//             sortedKeysLoik.push({
//               name: keysLoik[e],
//               tableIndex: tableIndex,
//               elementIndex: enElementIndex
//             });
//           }
//         }
//
//         // loop through all the "loikKoht" input names
//
//         for (var f = 0; f < keysLoikKoht.length; f++) {
//
//           // capture the index number of the database table that each of those input names are referring to-
//           // this will be a number in the input name after the word "moodunud" and before "Loik"
//
//           // determine where the letters "Loik" are in the input name
//
//           var loikIndexKoht = keysLoikKoht[f].indexOf("Loik");
//
//           // get the table index between the words "moodunud" and "loik"
//
//           var tableIndexKoht = keysLoikKoht[f].slice(8, loikIndexKoht);
//
//           // the input name also has an element index, which determines the position of this particular entry in the database table-
//           // we find this number at the end of the input name, after either the letters "Est" or "En"
//
//           // check if the input name contains the letters "Est"
//
//           if (keysLoikKoht[f].indexOf("Est") !== -1) {
//
//             // if yes, find out the position of those letters in the input name and add 3 to that index,
//             // because "Est" is three letters long and we need to know where is the end rather than the beginning of those three letters
//
//             var estEndIndexKoht = keysLoikKoht[f].indexOf("Est") + 3;
//
//             // now that we know where the end of the letters "Est" is, we can use it to obtain the element index number,
//             // which is situated right after those letters
//
//             var estElementIndexKoht = keysLoikKoht[f].slice(estEndIndexKoht);
//
//             // for each input name create an object, which also holds the table and element indexes obtained above,
//             // then push this object into an array created above
//
//             sortedKeysLoikKoht.push({
//               name: keysLoikKoht[f],
//               tableIndex: tableIndexKoht,
//               elementIndex: estElementIndexKoht
//             });
//
//             // check if the input name contains the letters "En"
//
//           } else if (keysLoikKoht[f].indexOf("En") !== -1) {
//
//             // if yes, find out where the last letter of the word "En" is located in the input name
//
//             var enEndIndexKoht = keysLoikKoht[f].indexOf("En") + 2;
//
//             // use that information to get the element index, which is located right after the letters "En" in the input name
//
//             var enElementIndexKoht = keysLoikKoht[f].slice(enEndIndexKoht);
//
//             // for each input name create an object, which also holds the table and element indexes obtained above,
//             // then push this object into an array created above
//
//             sortedKeysLoikKoht.push({
//               name: keysLoikKoht[f],
//               tableIndex: tableIndexKoht,
//               elementIndex: enElementIndexKoht
//             });
//
//             // check if the input name contains the letters "Link"
//
//           } else if (keysLoikKoht[f].indexOf("Link") !== -1) {
//
//             // if yes, find out the position of those letters in the input name and add 4 to that index,
//             // because "Link" is four letters long and we need to know where is the end rather than the beginning of those three letters
//
//             var linkEndIndexKoht = keysLoikKoht[f].indexOf("Link") + 4;
//
//             // now that we know where the end of the letters "Link" is, we can use it to obtain the element index number,
//             // which is situated right after those letters
//
//             var linkElementIndexKoht = keysLoikKoht[f].slice(linkEndIndexKoht);
//
//             // for each input name create an object, which also holds the table and element indexes obtained above,
//             // then push this object into an array created above
//
//             sortedKeysLoikKoht.push({
//               name: keysLoikKoht[f],
//               tableIndex: tableIndexKoht,
//               elementIndex: linkElementIndexKoht
//             });
//           }
//         }
//
//         // create an empty array for all the database tables, where the "moodunudLoik" entries are stored
//         // and another for the one, where the "moodunudLoikKoht" entries are located
//
//         var currentTableNames = [];
//         var currentTableNamesKoht = [];
//
//
//         // create empty arrays for the data about "Est", "En" and "Link" inputs
//
//         var estDataArray = [];
//         var enDataArray = [];
//         var estDataKohtArray = [];
//         var enDataKohtArray = [];
//         var linkDataKohtArray = [];
//
//         // using the sortedKeysLoik array, obtain the data about "Est" inputs-
//         // only every second object in the array will be an "Est" object, that is why the iterator will always be increased by 2 in the loop
//
//         for (let g = 0; g < sortedKeysLoik.length; g += 2) {
//
//           // for every "Est" object obtain the tableIndex, which will be used to select a relevant database table,
//           // also subtract 1 from this index, because javascript starts counting from 0
//
//           var currentTableIndex = sortedKeysLoik[g].tableIndex - 1;
//
//           // using this index, get the name of the database table that contains the data about the current input,
//           // the database names have already been stored and sorted in an array named sortedTableNames
//
//           var currentTableName = sortedTableNames[currentTableIndex];
//
//           // push the table name into the array created above
//
//           currentTableNames.push(currentTableName);
//
//           // for each input, obtain the user-inputted value (using the req.body object of multer)
//
//           var estValue = req.body[sortedKeysLoik[g].name];
//
//           // get the element index from each input
//
//           var estIndex = sortedKeysLoik[g].elementIndex;
//
//           // subtract 1 from this index, because javascript starts counting from 0
//
//           var currentEstIndex = estIndex - 1;
//
//           // add 1 to this index, since the relevant entries start from position 1 onwards
//
//           var realEstIndex = currentEstIndex + 1;
//
//           // using the obtained data, create a javascript object
//
//           var estData = {
//             value: estValue,
//             elementIndex: realEstIndex
//           };
//
//           // push this object into the array created above
//
//           estDataArray.push(estData);
//         }
//
//         // for the "En" inputs loop through the sortedKeysLoik array way once more, but this time the iterator will start on position 1 not 0
//
//         for (let h = 1; h < sortedKeysLoik.length; h += 2) {
//
//           // capture the user-inputted value for each input
//
//           var enValue = req.body[sortedKeysLoik[h].name];
//
//           // capture the element index for each input
//
//           var enIndex = sortedKeysLoik[h].elementIndex;
//
//           // subtract 1 from this index, because javascript starts counting from 0
//
//           var currentEnIndex = enIndex - 1;
//
//           // add 1 to this index, since the relevant entries start from position 1 onwards
//
//           var realEnIndex = currentEnIndex + 1;
//
//           // using the obtained data, create a javascript object
//
//           var enData = {
//             value: enValue,
//             elementIndex: realEnIndex
//           };
//
//           // push this object into the array created above
//
//           enDataArray.push(enData);
//         }
//
//
//         // using the sortedKeysLoikKoht array, repeat the above process with the "loikKoht" inputs,
//         // only that this time we also have the "link" input, which means we increase the iterator always by 3
//
//         for (let j = 0; j < sortedKeysLoikKoht.length; j += 3) {
//
//           // for every "Est" object obtain the tableIndex, which will be used to select a relevant database table,
//           // also subtract 1 from this index, because javascript starts counting from 0
//
//           var currentTableIndexKoht = sortedKeysLoikKoht[j].tableIndex - 1;
//
//           // using this index, get the name of the database table that contains the data about the current input,
//           // the database names have already been stored and sorted in an array named sortedTableNames
//
//           var currentTableNameKoht = sortedTableNamesKoht[currentTableIndexKoht];
//
//           // push the table name into the array created above
//
//           currentTableNamesKoht.push(currentTableNameKoht);
//
//           // for each input, obtain the user-inputted value (using the req.body object of multer)
//
//           var estValueKoht = req.body[sortedKeysLoikKoht[j].name];
//
//           // get the element index from each input
//
//           var estIndexKoht = sortedKeysLoikKoht[j].elementIndex;
//
//           // subtract 1 from this index, because javascript starts counting from 0
//
//           var currentEstIndexKoht = estIndexKoht - 1;
//
//           // using the obtained data, create a javascript object
//
//           var estDataKoht = {
//             value: estValueKoht,
//             elementIndex: currentEstIndexKoht
//           };
//
//           // push this object into the array created above
//
//           estDataKohtArray.push(estDataKoht);
//         }
//
//         // for the "En" inputs loop through the sortedKeysLoikKoht array way once more, but this time the iterator will start on position 1 not 0
//
//         for (let k = 1; k < sortedKeysLoikKoht.length; k += 3) {
//
//           // capture the user-inputted value for each input
//
//           var enValueKoht = req.body[sortedKeysLoikKoht[k].name];
//
//           // capture the element index for each input
//
//           var enIndexKoht = sortedKeysLoikKoht[k].elementIndex;
//
//           // subtract 1 from this index, because javascript starts counting from 0
//
//           var currentEnIndexKoht = enIndexKoht - 1;
//
//           // using the obtained data, create a javascript object
//
//           var enDataKoht = {
//             value: enValueKoht,
//             elementIndex: currentEnIndexKoht
//           };
//
//           // push this object into the array created above
//
//           enDataKohtArray.push(enDataKoht);
//         }
//
//         // for the "Link" inputs loop through the sortedKeysLoikKoht array way once more, but this time the iterator will start on position 2
//
//         for (let p = 2; p < sortedKeysLoikKoht.length; p += 3) {
//
//           // capture the user-inputted value for each input
//
//           var linkValueKoht = req.body[sortedKeysLoikKoht[p].name];
//
//           // capture the element index for each input
//
//           var linkIndexKoht = sortedKeysLoikKoht[p].elementIndex;
//
//           // subtract 1 from this index, because javascript starts counting from 0
//
//           var currentLinkIndexKoht = linkIndexKoht - 1;
//
//           // using the obtained data, create a javascript object
//
//           var linkDataKoht = {
//             value: linkValueKoht,
//             elementIndex: currentLinkIndexKoht
//           };
//
//           // push this object into the array created above
//
//           linkDataKohtArray.push(linkDataKoht);
//         }
//
//         // to update the correct entries in the correct database tables, loop through the currentTableNames array,
//         // which now contains all the relevant table names in the right order-
//         // use the keyword "let" for the iterator, because this way the iterator can be passed into the con.query callback
//
//         for (let l = 0; l < currentTableNames.length; l++) {
//
//           // query for all entries in each of the tables
//
//           con.query("SELECT * FROM " + currentTableNames[l] + " ORDER by id", async function(err, result) {
//             if (err) throw err;
//
//             // get the correct entry from the table using the elementIndex property created above-
//             // in this case we loop through the estDataArray object, to update all the estonian inputs
//
//             var nameProperty = result[estDataArray[l].elementIndex].name;
//
//             // create a values variable for the sql text to update the database table-
//             // this will consist of the user-inputted value and the name property created above
//
//             var values = [estDataArray[l].value, nameProperty];
//
//             // create the sql text using the relevant entry from the currentTableNames array
//
//             var sql = "UPDATE " + currentTableNames[l] + " SET est = ? WHERE name = ?";
//
//             // update the database using the sql text values object created above
//
//             await updateDatabase(sql, values);
//           });
//         }
//
//
//         // loop through the currentTableNames array once more, but this time the english inputs will be updated
//
//         for (let m = 0; m < currentTableNames.length; m++) {
//
//           // query for all entries in each of the tables
//
//           con.query("SELECT * FROM " + currentTableNames[m] + " ORDER by id", async function(err, result) {
//             if (err) throw err;
//
//             // get the correct entry from the table using the elementIndex property created above-
//             // in this case we loop through the enDataArray object, to update all the english inputs
//
//             var nameProperty = result[enDataArray[m].elementIndex].name;
//
//             // create a values variable for the sql text to update the database table-
//             // this will consist of the user-inputted value and the name property created above
//
//             var values = [enDataArray[m].value, nameProperty];
//
//             // create the sql text using the relevant entry from the currentTableNames array
//
//             var sql = "UPDATE " + currentTableNames[m] + " SET en = ? WHERE name = ?";
//
//             // update the database using the sql text values object created above
//
//             await updateDatabase(sql, values);
//           });
//         }
//
//         // repeat the above process with "loikKoht" inputs
//
//         for (let n = 0; n < currentTableNamesKoht.length; n++) {
//
//           // query for all entries in each of the tables
//
//           con.query("SELECT * FROM " + currentTableNamesKoht[n] + " ORDER by id", async function(err, result) {
//             if (err) throw err;
//
//             // get the correct entry from the table using the elementIndex property created above-
//             // in this case we loop through the estDataKohtArray object, to update all the estonian inputs
//
//             var nameProperty = result[estDataKohtArray[n].elementIndex].name;
//
//             // create a values variable for the sql text to update the database table-
//             // this will consist of the user-inputted value and the name property created above
//
//             var values = [estDataKohtArray[n].value, nameProperty];
//
//             // create the sql text using the relevant entry from the currentTableNamesKoht array
//
//             var sql = "UPDATE " + currentTableNamesKoht[n] + " SET est = ? WHERE name = ?";
//
//             // update the database using the sql text values object created above
//
//             await updateDatabase(sql, values);
//           });
//         }
//
//
//         // loop through the currentTableNamesKoht array once more, but this time the english inputs will be updated
//
//         for (let o = 0; o < currentTableNamesKoht.length; o++) {
//
//           // query for all entries in each of the tables
//
//           con.query("SELECT * FROM " + currentTableNamesKoht[o] + " ORDER by id", async function(err, result) {
//             if (err) throw err;
//
//             // get the correct entry from the table using the elementIndex property created above-
//             // in this case we loop through the enDataKohtArray object, to update all the english inputs
//
//             var nameProperty = result[enDataKohtArray[o].elementIndex].name;
//
//             // create a values variable for the sql text to update the database table-
//             // this will consist of the user-inputted value and the name property created above
//
//             var values = [enDataKohtArray[o].value, nameProperty];
//
//             // create the sql text using the relevant entry from the currentTableNames array
//
//             var sql = "UPDATE " + currentTableNamesKoht[o] + " SET en = ? WHERE name = ?";
//
//             // update the database using the sql text values object created above
//
//             await updateDatabase(sql, values);
//           });
//         }
//
//         // loop through the currentTableNamesKoht array once more, but this time the "link" inputs will be updated
//
//         for (let q = 0; q < currentTableNamesKoht.length; q++) {
//
//           // query for all entries in each of the tables
//
//           con.query("SELECT * FROM " + currentTableNamesKoht[q] + " ORDER by id", async function(err, result) {
//             if (err) throw err;
//
//             // get the correct entry from the table using the elementIndex property created above-
//             // in this case we loop through the enDataKohtArray object, to update all the english inputs
//
//             var nameProperty = result[linkDataKohtArray[q].elementIndex].name;
//
//             // create a values variable for the sql text to update the database table-
//             // this will consist of the user-inputted value and the name property created above
//
//             var values = [linkDataKohtArray[q].value, nameProperty];
//
//             // create the sql text using the relevant entry from the currentTableNames array
//
//             var sql = "UPDATE " + currentTableNamesKoht[q] + " SET link = ? WHERE name = ?";
//
//             // update the database using the sql text values object created above
//
//             await updateDatabase(sql, values);
//           });
//         }
//
//         // loop through all the (sorted) "moodunud" table names again
//
//         for (var r = 0; r < sortedTableNames.length; r++) {
//
//           // capture each table name in a variable
//
//           var thisTableName = sortedTableNames[r];
//
//           // for the user-inputted values, we need to know all the input names, which all have an index number in them,
//           // use the iterator and add 1 to it (because the index numbers start from 1 not 0) to get this number
//
//           var indexNumberPealkiri = r + 1;
//
//           // construct the input names
//
//           var pealkiriEstKey = "moodunud" + indexNumberPealkiri + "PealkiriEst";
//           var pealkiriEnKey = "moodunud" + indexNumberPealkiri + "PealkiriEn";
//
//           // capture the values of these inputs
//
//           var estPropertyPealkiri = req.body[pealkiriEstKey];
//           var enPropertyPealkiri = req.body[pealkiriEnKey];
//
//           // create an array of these values
//
//           var valuesPealkiri = [estPropertyPealkiri, enPropertyPealkiri];
//
//           // create the sql text for updating the "pealkiri" entries
//
//           var sqlPealkiri = "UPDATE " + thisTableName + " SET est = ?, en = ? WHERE name = 'pealkiri'";
//
//           // update the database
//
//           await updateDatabase(sqlPealkiri, valuesPealkiri);
//         }
//
//         // send a server response
//
//         res.send("OK!");
//       });
//     });
//   });
// });
//
//
//
// // delete a subform from the "möödunud sündmused" section on the "arhiiv" page
//
// app.post("/upload/moodunud/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted subform
//
//   var deleteSubformData = JSON.parse(req.body.data);
//
//   // to find the right result, we need to know the subform's index number-
//   // this will be the id number of the deleted subform minus 1 (since js starts to count from 0 not 1)
//
//   var indexNumber = deleteSubformData.idNumber - 1;
//
//   // create the sql text for querying the database for the tables related to the "moodunud" subforms
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // there will be two arrays of table names, with equal length,
//     // first create these as empty arrays and they will later be populated by relevant table names
//
//     var tableNames = [];
//     var tableNamesKoht = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // firstly, capture the tables that have "moodunud" string in their name, but not "pildid" or "koht" strings
//
//       if (tableName.indexOf("moodunud") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("koht") === -1) {
//
//         // push the table names into the above array
//
//         tableNames.push(tableName);
//
//
//         // then capture the tables that have "moodunudkoht" string in their name
//
//       } else if (tableName.indexOf("moodunudkoht") !== -1) {
//
//         // push the table names into the above array
//
//         tableNamesKoht.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort both arrays in descending order
//
//     var sortedTableNames = tableNames.reverse();
//
//     var sortedTableNamesKoht = tableNamesKoht.reverse();
//
//     // get the tables from both arrays that correspond to the deleted subform using the retrieved index number
//
//     var currentResult = sortedTableNames[indexNumber];
//     var currentResultKoht = sortedTableNamesKoht[indexNumber];
//
//     // the retrieved table names will be included in the sql texts as variables
//
//     var nameProperty = currentResult;
//     var namePropertyKoht = currentResultKoht;
//
//     // create the sql text for deleting the database tables
//
//     var sqlDelete = "DROP TABLE " + nameProperty;
//     var sqlDeleteKoht = "DROP TABLE " + namePropertyKoht;
//
//     // delete both tables
//
//     updateDatabase(sqlDelete);
//     updateDatabase(sqlDeleteKoht);
//   });
//
//   // the image on the deleted subform is stored in a different table- get all the images in this table as an array
//
//   con.query("SELECT * FROM moodunudpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // the correct result can be found with the index number retrieved previously
//
//     var currentResult = result[indexNumber];
//
//     // get the name property for the correct image
//
//     var nameProperty = currentResult.name;
//
//     // create the sql text for deleting the corresponding entry from the database table
//
//     var sqlDelete = "DELETE FROM moodunudpildid WHERE name = '" + nameProperty + "'";
//
//     // delete the entry from the database
//
//     updateDatabase(sqlDelete);
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });
//
//
// // delete a subform from the "möödunud sündmused" section on the "arhiiv" page and restore it to the "sundmused" page
//
// app.post("/upload/moodunud/restore/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the restored subform
//
//   var deleteSubformData = JSON.parse(req.body.data);
//
//   // to find the right result, we need to know the subform's index number-
//   // this will be the id number of the deleted subform minus 1 (since js starts to count from 0 not 1)
//
//   var indexNumber = deleteSubformData.idNumber - 1;
//
//   // create the sql text for querying the database for the tables related to the "moodunud" subforms
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // there will be two arrays of table names, with equal length,
//     // first create these as empty arrays and they will later be populated by relevant table names
//
//     var tableNames = [];
//     var tableNamesKoht = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // firstly, capture the tables that have "moodunud" string in their name, but not "pildid" or "koht" strings
//
//       if (tableName.indexOf("moodunud") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("koht") === -1) {
//
//         // push the table names into the above array
//
//         tableNames.push(tableName);
//
//         // then capture the tables that have "moodunudkoht" string in their name
//
//       } else if (tableName.indexOf("moodunudkoht") !== -1) {
//
//         // push the table names into the above array
//
//         tableNamesKoht.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort both arrays in descending order
//
//     var sortedTableNames = tableNames.reverse();
//
//     var sortedTableNamesKoht = tableNamesKoht.reverse();
//
//     // get the tables from both arrays that correspond to the restored subform using the retrieved index number
//
//     var currentResult = sortedTableNames[indexNumber];
//     var currentResultKoht = sortedTableNamesKoht[indexNumber];
//
//     // the retrieved table names will be included in the sql texts as variables
//
//     var nameProperty = currentResult;
//     var namePropertyKoht = currentResultKoht;
//
//     // obtain the timestamps from the table names
//
//     var timeStamp = nameProperty.slice(8);
//     var timeStampKoht = namePropertyKoht.slice(12);
//
//     // construct new table names, which will be contain the obtained timestamp
//
//     var newNameProperty = "sundmused" + timeStamp;
//     var newNamePropertyKoht = "sundmusedkoht" + timeStampKoht;
//
//     // create the sql text for renaming the database tables
//
//     var sqlAlter = "ALTER TABLE " + nameProperty + " RENAME TO " + newNameProperty;
//     var sqlAlterKoht = "ALTER TABLE " + namePropertyKoht + " RENAME TO " + newNamePropertyKoht;
//
//     // rename both tables
//
//     updateDatabase(sqlAlter);
//     updateDatabase(sqlAlterKoht);
//   });
//
//   // the image on the restored subform is stored in a different table- get all the images in this table as an array
//
//   con.query("SELECT * FROM moodunudpildid ORDER by id", function(err, result) {
//     if (err) throw err;
//
//     // the correct result can be found with the index number retrieved previously
//
//     var currentResult = result[indexNumber];
//
//     // get the properties for the correct image
//
//     var nameProperty = currentResult.name;
//     var idProperty = currentResult.id;
//     var urlProperty = currentResult.url;
//
//     /// create the sql text for inserting those properties into the database table, which holds past events
//
//     var sql = "INSERT INTO sundmusedpildid (id, name, url) VALUES ('" + idProperty + "', '" + nameProperty + "', '" + urlProperty + "')";
//
//     // insert the properties to the "new" database table
//
//     con.query(sql, function(err, result) {
//       if (err) throw err;
//
//       // create the sql text for deleting these properties from the "old" database table
//
//       var sql = "DELETE FROM moodunudpildid WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//
//       // send a server response
//
//       res.send("OK!");
//     });
//   });
// });
//
// // add a new "rida" element to the "moodunud" subform on the "arhiiv" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/moodunud" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant table has a "moodunud" string in their name, but not "pildid" or "koht" string
//
//       if (tableName.indexOf("moodunud") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("koht") === -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in descending order
//
//     var sortedTableNames = tableNames.reverse();
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est and en properties will be empty strings, while the name property will be "rida" + current timestamp
//
//     var nameProperty = "rida" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "')";
//
//     // // insert the new entry into the corresponding database table
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "rida" element from the "moodunud" subform on the "arhiiv" page-
// // because this is a dynamic route handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/moodunud" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "moodunud" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have a "moodunud" string in their name, but not "pildid" or "koht" string
//
//       if (tableName.indexOf("moodunud") !== -1 &&
//         tableName.indexOf("pildid") === -1 &&
//         tableName.indexOf("koht") === -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in descending order
//
//     var sortedTableNames = tableNames.reverse();
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "rida" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // because the "rida" entries start from position 1 onwards (position 0 occupied by "pealkiri" entry), add 1 to the index number
//
//       var realIndex = currentIndex + 1;
//
//       // get the database entry of the deleted "rida" element
//
//       var currentResult = result[realIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//
//       // send a server response
//
//       res.send("OK!");
//     });
//   });
// });
//
//
// // add a new "koht" element to the "moodunud" subform on the "arhiiv" page-
// // because this is a dynamic route, handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
//
// app.post("/upload/moodunud/koht" + ":number/new", function(req, res) {
//
//   // create the sql text that selects all the tables in the database
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant table has a "moodunudkoht" string in their name
//
//       if (tableName.indexOf("moodunudkoht") !== -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in descending order
//
//     var sortedTableNames = tableNames.reverse();
//
//     // req.params is a number that is captured from the post route that the ajax call is made to,
//     // while indexNumber is the same number - 1 (because of course programmers start to count from 0)
//
//     var indexNumber = req.params.number - 1;
//
//     // use the indexNumber to get the relevant database table
//
//     var currentResult = sortedTableNames[indexNumber];
//
//     // create variables for the new entry that will be added to the relevant table-
//     // est, en and link properties will be empty strings, while the name property will be "koht" + current timestamp
//
//     var nameProperty = "koht" + Date.now();
//     var estProperty = "";
//     var enProperty = "";
//     var linkProperty = "";
//
//     // create the sql text with the variables created above
//
//     var sql = "INSERT INTO " + currentResult + " (name, est, en, link) VALUES ('" + nameProperty + "', '" + estProperty + "', '" + enProperty + "', '" + linkProperty + "')";
//
//     // // insert the new entry into the corresponding database table
//
//     updateDatabase(sql);
//   });
//
//   // send a server response
//
//   res.send("OK!");
// });
//
//
// // delete a "koht" element from the "moodunud" subform on the "arhiiv" page-
// // because this is a dynamic route handling several user-created databases, it also uses a custom parameter, which is the ":number" part
//
// app.post("/upload/moodunud/koht" + ":number/delete", function(req, res) {
//
//   // retrieve and parse the data sent by the browser via an ajax call- this will contain the id number of the deleted element
//
//   var deleteLoikData = JSON.parse(req.body.data);
//
//   // create the sql text to query the database for table names (we eventually need the ones named "moodunudkoht" + timestamp)
//
//   var sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + process.env.DB_DB + "'";
//
//   // make the database query
//
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//
//     // create an empty array that will be populated by the names of the relevant tables in the database
//
//     var tableNames = [];
//
//     // loop through all the tables in the database
//
//     for (var i = 0; i < result.length; i++) {
//
//       // capture the name of each table in a variable
//
//       var tableName = (result[i].table_name);
//
//       // the relevant tables have a "moodunudkoht" string in their name
//
//       if (tableName.indexOf("moodunudkoht") !== -1) {
//
//         // push the relevant table names into the tableNames array
//
//         tableNames.push(tableName);
//       }
//     }
//
//     // the tables have a timestamp in their name- sort the array in descending order
//
//     var sortedTableNames = tableNames.reverse();
//
//     // get the relevant table's position in the array, using the custom route parameter (which is a number)
//
//     var indexNumber = req.params.number - 1;
//
//     // get the relevant table
//
//     var currentTableName = sortedTableNames[indexNumber];
//
//     // query the selected table for all the "koht" entries
//
//     con.query("SELECT * FROM " + currentTableName + " ORDER by id", function(err, result) {
//       if (err) throw err;
//
//       // to find the right result, we need to know its index number-
//       // this will be the id number of the deleted element minus 1 (since js starts to count from 0 not 1)
//
//       var currentIndex = deleteLoikData.idNumber - 1;
//
//       // get the database entry of the deleted "koht" element
//
//       var currentResult = result[currentIndex];
//
//       // get the name property of the database entry
//
//       var nameProperty = currentResult.name;
//
//       // create the sql text
//
//       var sql = "DELETE FROM " + currentTableName + " WHERE name = '" + nameProperty + "'";
//
//       // delete the entry from the database
//
//       updateDatabase(sql);
//
//       // send a server response
//
//       res.send("OK!");
//     });
//   });
// });
//
//
//
//
// // retrieve the data that was sent from the form on "telli" page and send an email containing this data
//
// app.post("/upload/telli/email", function(req, res, next) {
//
//   // get the data from the client-side
//
//   var text = JSON.parse(req.body.text);
//
//   // configure the mail options
//
//   var mailOptions = {
//     from: 'joosep_trumm@hotmail.com',
//     to: 'joosep_trumm@hotmail.com',
//     subject: 'Uus tellimus Nooruse kodulehelt',
//     html: text
//   };
//
//   // send the email
//
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       next(error);
//     } else {
//       res.send("OK");
//     }
//   });
// });
//
//
// // retrieve the data that was sent from the form on "kontakt" page and send an email containing this data
//
// app.post("/upload/kontakt/email", function(req, res, next) {
//
//   var text = JSON.parse(req.body.text);
//   var mailOptions = {
//     from: 'joosep_trumm@hotmail.com',
//     to: 'joosep_trumm@hotmail.com',
//     subject: 'Ettelaulmisele registreerimine',
//     html: text
//   };
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       next(error);
//     } else {
//       res.send("OK");
//     }
//   });
// });
//
//
// // handle the login to the admin page
//
// app.post("/upload/login", function(req, res) {
//
//   // get the client-inputted data
//
//   var data = JSON.parse(req.body.data);
//
//   // extract the inputted username and password from the data
//
//   var username = data.username;
//   var password = data.password;
//
//   // query the database for the username and password hash
//
//   con.query("SELECT * FROM kasutajad ORDER BY id", function(err, result) {
//
//     // obtain the username and hash from the database
//
//     var loadedUsername = result[0].username;
//     var hash = result[0].password;
//
//     // use bcrypt to compare the inputted password with the hash obtained from the database
//     // if they match, the comparison variable will automatically be set to true
//
//     bcrypt.compare(password, hash, function(err, comparison) {
//
//       // check if the credentials in the database match those posted from the client-side
//
//       if (result[0].username === username && comparison === true) {
//
//         // if yes, create a session with these credentials
//
//         req.session.loggedIn = true;
//
//         // send a server response, that will indicate that we are logged in
//
//         res.send("logged in");
//
//         // if the credentials are wrong, send a response indicating this fact
//
//       } else {
//         res.send("wrong credentials");
//       }
//     });
//   });
// });
//
//
// // handle the logout from the admin page
//
// app.post("/upload/logout", function(req, res) {
//
//   // destroy the login session
//
//   req.session.destroy(function(err) {
//     if (err) throw err;
//
//     // send a server response
//
//     res.send("OK!");
//   });
// });


// start server

app.listen(3000, function() {
  console.log("Server is now running");
});
