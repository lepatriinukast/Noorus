/* jshint esversion: 8 */

// This module exports a function which updates a specified database table
// using text-based form data that is parsed with multer.
// This function only handles data that has heading and content.

// Require from the database folder the function that updates the database
// and the one that queries the database table for entries.

const update = require("./../database/update");
const query = require("./../database/query");

// Three arguments are passed into the function:
// The body object, which contains the form data, the name of the database table name that will be updated,
// and the index of the entry that needs to be updated in the database.

const updateSection = async (body, tableName, index) => {

  // If an index is not provided, it reverts to zero.

  index = index || 0;

  // The body object contains the form data in key-value pairs.
  // Get the names of the keys.

  const keys = Object.keys(body);

  // Get the value of each property by using the obtained keys.

  const headingEst = body[keys[0]];
  const headingEn = body[keys[1]];
  const est = body[keys[2]];
  const en = body[keys[3]];

  // Query the specified database table for entries.

  const result = await query(tableName);

  // Use the provided index to get the id of the relevant entry in the database table.

  const id = result[index].id;

  // Use the obtained information to create a sql text updating the database.

  const sql = `UPDATE ${tableName} SET heading_est = '${headingEst}', heading_en = '${headingEn}', est = '${est}', en = '${en}' WHERE id = '${id}'`;

  // Use the sql text to update the database. Wait for the function to complete.

  await update(sql);
};

// Export the function.

module.exports = updateSection;
