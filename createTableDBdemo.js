require('dotenv').config();
var con = require("./database/connection");


  var sql = "CREATE TABLE archive_content (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), heading_est VARCHAR(255), heading_en VARCHAR(255), est VARCHAR(3000), en VARCHAR(3000))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
