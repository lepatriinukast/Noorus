// update values in database

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "segakoorNoorus"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE avalehtHupikaken SET est = 'Oled Nooruse vilistlane? Registreeri end meililisti!' WHERE name ='avalehtHupikaknaPealkiri'";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Database updated!");
  });
});
