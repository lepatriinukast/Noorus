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
  var sql = "INSERT INTO sissejuhatusTekstid (name, est, en) VALUES ?";
  var values = [
    ["pealkiri", "weess", "hdoru"],
    ["loik" + Date.now(), "aaa", "bsd"]
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
});
