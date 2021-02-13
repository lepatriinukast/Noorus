/*jshint esversion: 8 */

// This module needs access to the following files to work:

const query = require("./queryDatabase");
const keys = require("./keyArrays");
const compiler = require("./modelCompiler");

// A function that turns a camelcase string into snakecase.
// This is used for converting a javascript variable name into a database table name

const camelToSnakeCase = string => string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

// Create the module exports object, which will become available in the server file.
// This object is a function and can be called in whichever file this module is required.

// The function takes in four arguments: Firstly a string (target), which is the variable name for the object keys array.
// Secondly a constructor function (model) from the modelcontstructors module,
// thirdly, a boolean (dynamic), which determines whether the data will be returned in an array or an object
// (static elements use objects, while dynamic elements use arrays).
// Lastly a string (language) that specifies the language for the object that is returned.
// If the object's structure doesn't depend on language, this argument is ignored.

// This function also needs to be asynchronous, because it needs to wait for the database to finish sending the data.

const requestData = async (target, model, dynamic, language) => {

  // Use the provided target string to get the correct array from the keys module.

  const currentKeys = keys[target];

  // Convert the provided target string into camelcase, in order to get the database table name.

  const tableName = camelToSnakeCase(target);

  // Call the compiler function with the provided model and language.
  // The function also takes in the constructed database table name and keys array.
  // When the function has finished, return the outcome.

  if (dynamic) {

    // if the element is dynamic, return the data in an array.

    return compiler.arrayCompiler(await query(tableName), model, currentKeys, language);

  } else {

    // if the element is static, return the data in an object.

    return compiler.objectCompiler(await query(tableName), model, currentKeys, language);
  }
};

// Export the function.

module.exports = requestData;
