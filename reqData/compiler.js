/*jshint esversion: 8 */

// This module is a link between getting content from the database and rendering it on the screen.
// Basically it is a simplifier, which has access to both queryDB.js and models.js and makes them communicate.

// The outcome is a javascript object- a model populated with relevant content from a particular database table,
// which will then be pushed into a container array along with other similar objects that originate from that database table.

// This module needs access to the following files to work:

const query = require("./../database/query");
const models = require("./models");


// The function takes in three arguments: Firstly the table name, where the desired data is located,
// secondly a constructor function from the models module
// and lastly a string that specifies the language for the object that is returned.
// If the object's structure doesn't depend on language, this argument is ignored.

// This function also needs to be asynchronous, because it needs to wait for the database to finish sending the data.

const compiler = async (tableName, Model, language) => {

  // Query the specified table name for results.

  const result = await query(tableName);

// Create an empty array, which will be used as a container for similarily structured javascript objects containing data from the database.

  const container = [];

  // Loop through the array of results and using the specified model,
  // create a new javascript object for each entry in the database.
  // Finally, push all these objects into the empty container array.

  for (let i = 0; i < result.length; i++) {
    container[i] = new Model(result, i, language);
  }

  // Return the data in an array.

    return container;
};

// Export the function.

module.exports = compiler;
