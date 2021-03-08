// insert default values into database

var con = require("./reqData/dbConnection");


  var sql = "INSERT INTO miscellaneous (name) VALUES ?";
  var values = [
    ["contact_form_heading"], ["order_form_heading"]
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
