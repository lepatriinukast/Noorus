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
  var sql = "CREATE TABLE dirigendid"+ Date.now() + " (id int NOT NULL AUTO_INCREMENT, name varchar(255), est varchar(3000), en varchar(3000), PRIMARY KEY(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
