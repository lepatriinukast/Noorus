var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "segakoorNoorus"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE ankeet (id int NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
