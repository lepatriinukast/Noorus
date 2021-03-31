/* jshint esversion: 8 */

// Require the connection object from a custom module.

var con = require("./connection.js");

// A function for updating the database when provided with valid sql text and possibly a values array.
// This function should be used inside an async function and called with the await keyword.

const update = (sql, values) => {
   con.query(sql, values, (err, result) => {
    if (err) throw err;
  });
};

// Export the function.

module.exports = update;
