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
  var sql = "INSERT INTO telliankeet (name, est, en, checked) VALUES ?";
  var values = [
    ["jarelloik", "a", "u", ""],
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
});
