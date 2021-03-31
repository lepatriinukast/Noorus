// insert default values into database

var con = require("./database/connection");


var sql = "SELECT 'ALTER TABLE ' + table_name + ' ADD timestamp VARCHAR(255)' FROM information_schema.tables WHERE table_type = 'BASE TABLE'"
    // var sql = "INSERT INTO test (timestamp) VALUES ('" + Date.now() + "');";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Inserted into database");
    });
