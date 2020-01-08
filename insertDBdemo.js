// insert default values into database

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "segakoorNoorus"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO avalehtPildid (name, url) VALUES ?";
  var values = [
    ["paiseikoon", "/img/paiseikoon.png"],
    ["avalehtLogo", "/img/avalehtLogo.png"],
    ["avalehtTaustapilt", "/img/avalehtTaustapilt.jpg"]
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
});
