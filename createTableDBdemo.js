require('dotenv').config();
var con = require("./reqData/DBConnection");


  var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
