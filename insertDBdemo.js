// insert default values into database

var con = require("./dbConnection");


  var sql = "INSERT INTO about_section_headings (name) VALUES ?";
  var values = [
    ["heading_1"], ["heading_2"], ["heading_3"], ["heading_4"], ["heading_5"], ["heading_6"]
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
