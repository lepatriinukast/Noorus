
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "segakoorNoorus",
  charset: "utf8mb4"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var sqlDB = "ALTER DATABASE segakoorNoorus CHARACTER SET utf8 COLLATE utf8_unicode_ci";

con.query(sqlDB, function(err, result){
  if (err) throw err;
});


var sqlQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'segakoorNoorus'";

con.query(sqlQuery, function(err, result){
  if (err) throw err;

  for (var i = 0; i < result.length; i++) {
    var tableName = result[i].table_name;

var sqlAlter = "ALTER TABLE "+ tableName +" CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";

    con.query(sqlAlter, function(err, result){
      if (err) throw err;

    });
  }
});
