require('dotenv').config();
var con = require("./dbConnection");


  var sql = "CREATE TABLE about_section_headings (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), est VARCHAR(255), en VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
