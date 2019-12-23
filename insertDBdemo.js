// insert default values into database

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "segakoorNoorus"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO avalehtHupikaken (name, est, en) VALUES ?";
  var values = [
    ["avalehtHupikaknaPealkiri", "Oled Nooruse vilistlane? Registreeri end meililisti!", "Former singer of Noorus? Sign up for the mailing list!"],
    ["avalehtHupikaken1", "Eesnimi", "First name"],
    ["avalehtHupikaken2", "Perekonnanimi", "Family name"],
    ["avalehtHupikaken3", "E-maili aadress", "E-mail"],
    ["avalehtHupikaken4", "Millal laulsid Nooruses", "When did you sing for us?"],
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
});
