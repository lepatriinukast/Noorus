// insert default values into database

var con = require("./database/connection");

const bcrypt = require('bcrypt');
const saltRounds = 12;
const password = "lauldaonLahe";

bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
    var sql = "INSERT INTO users (user, password) VALUES ('segakoorNoorus', '"+ hash +"');";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Inserted into database");
    });

   });
});
