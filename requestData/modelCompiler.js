/*jshint esversion: 8 */

// This module exports an object, with two methods which compile several similar models into one larger one.
// The first method returns an object and is used to generate models for static elements on the webpage.
// The second method returns an array and is used to compile a model for dynamic elements.

const modelCompiler = {

  // This method compiles the models into an object.

  objectCompiler(result, model, keys, language) {

    // Create an empty container object that will be populated by properties and eventually returned.

    const container = {};

    // Loop through the array of keys and turn them into properties on the container object.
    // For assigning the value for each of these properties, call the provided constructor function
    // and pass into it both the result array and the iterator that corresponds to the particular object name.

    for (let i = 0; i < keys.length; i++) {
      container[keys[i]] = new model(result, i, language);
    }

    // When the container object is returned, it is populated with properties,
    // each of which is a model for a single renderable javascript object.

    return container;
  },

  // This method compiles the models into an array

  arrayCompiler(result, model, keys, language) {

    // Create an empty container array that will be populated by items and eventually returned.

    const container = [];

    // Loop through the array of key names and push them into the container array.
    // For assigning the value for each of these items, call the provided constructor function
    // and pass into it both the result array and the iterator that corresponds to the particular array index.

    for (let i = 0; i < keys.length; i++) {
      container[i] = new model(result, i, language);
    }

    // When the container array is returned, it is populated with objects,
    // each of which is a model for a single renderable javascript object.

    return container;
  }
};

// Export the object.

module.exports = modelCompiler;
