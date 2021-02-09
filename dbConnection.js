/*jshint esversion: 8 */

// This module connects the application to the mysql database.

// Call the config method on the dotenv module in order to be able to use environmental variables in the .env file.

require('dotenv').config();

// Require the mysql module which is used to setup a database connection.

const mysql = require("mysql");

// Use the mysql module to setup a connection object using the environmental variables.

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB
});

// Connect to the database.

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// Export the connection object. Every module that requires this file, will have access to the database.

module.exports = con;
