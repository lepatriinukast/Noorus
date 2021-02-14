require('dotenv').config();
var con = require("./requestData/databaseConnection");


  var sql = "CREATE TABLE past_events_images (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), url VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
