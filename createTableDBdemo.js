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
  var sql = "CREATE TABLE telliankeet (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), est VARCHAR(255), en VARCHAR(255), checked VARCHAR(255), PRIMARY KEY(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
