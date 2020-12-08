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
  var sql = "CREATE TABLE kontaktsissejuhatus (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), est VARCHAR(3000), en VARCHAR(3000), PRIMARY KEY(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
