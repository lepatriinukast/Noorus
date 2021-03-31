require('dotenv').config();
var con = require("./database/connection");


  var sql = "CREATE TABLE test (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), password VARCHAR(255), timestamp TIMESTAMP)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
