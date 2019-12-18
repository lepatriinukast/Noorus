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
  var sql = "INSERT INTO avalehtTekstid (name, est, en) VALUES ?";
  var values = [
    ["suurPealkiri", "Segakoor Noorus", "Mixed Choir Noorus"],
    ["jatkuPealkiri", "...on hulk toredaid inimesi, kes armastavad üle kõige laulda!", "...is a group of wonderful people, who above all else enjoy singing!"],
    ["sektsiooniPealkiri1", "Tulevased sündmused", "Upcoming events"],
    ["sektsiooniTekst1", "", ""],
    ["sektsiooniPealkiri2", "Möödunud sündmused", "Past events"],
    ["sektsiooniTekst2", "Segakoor Nooruse hooaja jooksul toimub mitmeid traditsioonilisi või vähem traditsioonilisi üritusi. Vaata, millistes projektides oleme kaasa löönud!", "Throughout its season, mixed choir Noorus has taken part in a lot of traditional and not so traditional events. Have a look at the kinds of projects we have been involved in over the years!"],
  ];
  con.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("Inserted into database");
  });
});
