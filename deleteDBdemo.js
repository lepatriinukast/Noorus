// delete from db

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "segakoorNoorus"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE avalehtTekstid";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
