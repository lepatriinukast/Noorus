/*jshint esversion: 8 */

// This module exports a function, which compiles several similar models into one larger one.

const modelCompiler = (result, model, keys, language) => {
  console.log(model);

  // Create an empty container object that will be populated by properties and eventually returned.

  const container = {};

  // Loop through the array of object names and turn them into properties on the container object.
  // For assigning the value for each of these properties, call the provided constructor function
  // and pass into it both the result array and the iterator that corresponds to the particular object name.

  for (let i = 0; i < keys.length; i++) {
    container[keys[i]] = new model(result, i, language);
  }

  // When the container object is returned, it is populated with properties,
  // each of which is a model for a single renderable javascript object.

  return container;
};

// Export the function.

module.exports = modelCompiler;
