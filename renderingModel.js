/*jshint esversion: 8 */

// require the connection object from a custom module

var con = require("./dbConnection.js");


// MODULE INTRODUCTION

// The information about what to render on the webpage is stored in the many tables of the database.
// When a database is queried for this information, an array of results is returned to the server.

// To use this array directly for rendering the content of the webpage would however be impractical
// and it is makes much more sense to turn this array into semantically meaningful javascript objects.

// However, many of those javascript objects will be very similar and share the same structure,
// thus it is optimal to categorise them and sort them into several groups based on their structure.


// In order to quickly create many similar javascript objects, a model can be built for each group.
// The purpose of this module is to export an object containing all of those different models.

// Each renderable javascript object is populated with data coming from the database.
// A database query returns an array containing all data in a particular table.

// Each element in the array corresponds to the data used to create one single renderable javascript object.
// Thus, every model must have access to both the array from the database (result) and the correct iterator (iterator).

// To create these models, it is convenient to use constructor functions:


// a constructor for creating a model of a single image

function ImageModel(result, iterator) {
  this.url = result[iterator].url;
  this.filename = result[iterator].url.slice(5);
}

// a constructor for creating a model of a single text element

function TextModel(result, iterator) {
  this.est = result[iterator].est;
  this.en = result[iterator].en;
}

// a constructor for creating a model of a single link or iframe element

function LinkModel(result, iterator) {
  this.est = result[iterator].est;
  this.en = result[iterator].en;
  this.link = result[iterator].link;
}


// In reality each of these models will be used to create not one but many renderable javascript objects.
// The next step would be to create a function that takes in one particular model,
// has knowledge about which objects will be created using this model, and compiles them into one larger container object.
// A model for a single renderable javascript object would then become a named property on this container object.

// This function takes in three arguments- the array returned from the database (result),
// one of construction functions that create models (model),
// and an array of names for the objects that will be created using this model (objectNames).

const compileModel = (result, model, objectNames) => {

  // Create an empty container object that will be populated by properties and eventually returned.

  const container = {};

  // Loop through the array of object names and turn them into properties on the container object.
  // For assigning the value for each of these properties, call the provided constructor function
  // and pass into it both the result array and the iterator that corresponds to the particular object name.

  for (let i = 0; i < objectNames.length; i++) {
    container[objectNames[i]] = new model(result, i);
  }

  // When the container object is returned, it is populated with properties,
  // each of which is a model for a single renderable javascript object.

  return container;
};


// Write out (or populate with a loop) the object name arrays that will be passed into the compiler function.

const staticImageNames = ["favicon", "logo", "homeBackgroundImage", "aboutBackgroundImage"];

const staticTextSectionNames = ["aboutIntroduction", "aboutMembers", "contact", "shop"];

const homeTextNames = ["headingPrimary", "introduction", "section1Heading", "section2Heading", "section1Content", "section2Content"];

const aboutSectionHeadingNames = [];

for (let i = 0; i < 7; i++) {
  let name = `heading${i + 1}`;
  aboutHeadingNames.push(name);
}

const membersTextNames = ["sopranosHeading", "altosHeading", "tenorsHeading", "bassesHeading", "sopranosContent", "altosContent", "tenorsContent", "bassesContent"];

// Lastly, create the module exports object, which will become available in the server file.

// Each method in this object will call the compiler function
// and pass into it one of the constructor functions as well as a corresponding array of object names.
// When used inside a database query, each method will return a collection of similar renderable javascript objects,
// now fully populated with relevant data queried from the database.

const renderingModel = {

  // return all static images

  getStaticImages(result) {
    return compileModel(result, ImageModel, staticImageNames);
  },

  // return all static text sections

  getStaticTextSections(result) {
    return compileModel(result, TextModel, staticSectionNames);
  },

  // return the static text content from the home page

  getHomeText(result) {
    return compileModel(result, TextModel, homeTextNames);
  },

  // return the static text content from the members section on the about page

  getMembersText(result) {
    return compileModel(result, TextModel, membersTextNames);
  },

  // return the big section headings on the about page

  getAboutSectionHeadings(result) {
    return compileModel(result, TextModel, aboutSectionHeadingNames);
  },













};


module.exports = renderingModel;
