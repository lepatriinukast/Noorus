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
  var sql = "INSERT INTO pealkirjad (name, est, en) VALUES ?";
  var values = [
    ["pealkiri1", "a", "u"],
    ["pealkiri2", "a", "u"],
    ["pealkiri3", "a", "u"],
    ["pealkiri4", "a", "u"],
    ["pealkiri5", "a", "u"],
    ["pealkiri6", "a", "u"]
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
});
