/*jshint esversion: 8 */

// This module exports a function that queries the database and returns a promise.
// Once the query is complete, the promise resolves into an array of results.
// To access the results, this module needs to be used in an async function with the await keyword.

// Require the connection object from a custom module.

var con = require("./databaseConnection.js");

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

// Export the function.

module.exports = queryDatabase;
