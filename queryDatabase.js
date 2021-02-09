/*jshint esversion: 8 */

// Require the connection object from a custom module.

var con = require("./dbConnection.js");

// This function returns a promise, which will resolve into an array containing all data in a specified database table.

const queryDatabase = (tableName) => {
  let promise = new Promise((resolve, reject) => {
    con.query(`SELECT * FROM ${tableName} ORDER BY id`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
};

module.exports = queryDatabase;
