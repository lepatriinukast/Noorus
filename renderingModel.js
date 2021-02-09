/*jshint esversion: 8 */

// require the connection object from a custom module

var con = require("./dbConnection");

var queryDB = require("./queryDatabase");


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


// a constructor for creating a model of a single link element

function LinkModel(result, iterator) {
  this.est = result[iterator].est;
  this.en = result[iterator].en;
  this.link = result[iterator].link;
}

// a constructor for creating a model of a single clickable image

function ImageLinkModel(result, iterator) {
  this.url = result[iterator].url;
  this.filename = result[iterator].url.slice(5);
  this.link = result[iterator].link;
}

// a constructor for creating a model of a single form field

function FormFieldModel(result, iterator) {
  this.est = result[iterator].est;
  this.en = result[iterator].en;
  this.required = result[iterator].required;
  this.expandable = result[iterator].expandable;
}

// a constructor for creating a model of a single iframe on the media section of the about page

function MediaItemModel(result, iterator) {
  this.link = result[iterator].link;
}

// a constructor for creating a model of a single item on the shop page

function ShopItemModel(result, iterator) {
  this.est = result[iterator].est;
  this.en = result[iterator].en;
  this.price = result[iterator].price;
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


// Some of the object names are static and are already known in advance.
// Either write them out into an array or create an array with a loop.

const staticImageNames = ["favicon", "logo", "homeBackgroundImage", "aboutBackgroundImage"];

const staticTextSectionNames = ["aboutIntroduction", "aboutMembers", "aboutMedia", "aboutLinks", "contact", "shop", "order"];

const homeTextNames = ["headingPrimary", "introduction", "section1Heading", "section2Heading", "section1Content", "section2Content"];

const aboutSectionHeadingNames = [];

for (let i = 0; i < 7; i++) {
  let name = `heading${i + 1}`;
  aboutSectionHeadingNames.push(name);
}

const membersTextNames = ["sopranosHeading", "altosHeading", "tenorsHeading", "bassesHeading", "sopranosContent", "altosContent", "tenorsContent", "bassesContent"];
const formHeadingNames = ["contactFormHeading", "orderFormHeading"];
const orderTextNames = ["preamble", "postamble"];


// Many renderable objects can be added and deleted by the admin of the website and are thus dynamic.
// so the only way to get access to the names and number of these elements, is to make a database query.
// The data that they contain (including a name property) is stored in a database,

// The following function queries a specified database, awaits for the result array to be returned,
// Then loops through the result array, finds the names of all the renderable objects,
// and finally returns an array that is populated with these object names.


const getDynamicNames = async (tableName) => {
    const result = await queryDB(tableName);
    const names = [];
    for (let i = 0; i < result.length; i++) {
      let name = result[i].name;
      names.push(name);
    }
    return names;
  };

  // Now get all the dynamic object name arrays using the above function.

const membersHeadingNames = getDynamicNames("members_headings");
const membersSectionNames = getDynamicNames("members_sections");

const conductorsHeadingNames = getDynamicNames("conductors_headings");
const conductorsSectionNames = getDynamicNames("conductors_sections");
const conductorsImageNames = getDynamicNames("conductors_sections");

const historyHeadingNames = getDynamicNames("history_headings");
const historySectionNames = getDynamicNames("history_sections");

const contactHeadingNames = getDynamicNames("contact_headings");
const contactSectionNames = getDynamicNames("contact_sections");

const shopHeadingNames = getDynamicNames("shop_headings");
const shopItemNames = getDynamicNames("shop_items");
const shopImageNames = getDynamicNames("shop_images");

const eventsHeadingNames = getDynamicNames("events_headings");
const eventsContentNames = getDynamicNames("events_content");
const eventsImageNames = getDynamicNames("events_images");

const contactFormFieldNames = getDynamicNames("contact_form_fields");
const orderFormFieldNames = getDynamicNames("order_form_fields");

const mediaHeadingNames = getDynamicNames("media_headings");
const mediaSectionNames = getDynamicNames("media_sections");

const iframeNames = getDynamicNames("iframes");

const sponsorsLogoNames = getDynamicNames("sponsors_logos");

  // Lastly, create the module exports object, which will become available in the server file.

  // Each method in this object will call the compiler function
  // and pass into it one of the constructor functions as well as a corresponding array of object names.
  // When used inside a database query, each method will return a collection of similar renderable javascript objects,
  // now fully populated with relevant data queried from the database.

  const renderingModel = {

    // Return all static images.

    getStaticImages(result) {
      return compileModel(result, ImageModel, staticImageNames);
    },

    // Return all static text sections.

    getStaticTextSections(result) {
      return compileModel(result, TextModel, staticSectionNames);
    },

    // Return the static text content from the home page.

    getHomeText(result) {
      return compileModel(result, TextModel, homeTextNames);
    },

    // Return the static text content on the members section of the about page.

    getMembersText(result) {
      return compileModel(result, TextModel, membersTextNames);
    },

    // Return the big section headings on the about page.

    getAboutSectionHeadings(result) {
      return compileModel(result, TextModel, aboutSectionHeadingNames);
    },

    // Return the dynamic section headings on the members section of the about page.

    getMembersHeadings(result) {
      return compileModel(result, TextModel, membersHeadingNames);
    },

    // Return the dynamic text sections on the members section of the about page.

    getMembersSections(result) {
      return compileModel(result, TextModel, membersSectionNames);
    },

    // Return the dynamic section headings on the conductors section of the about page.

    getConductorsHeadings(result) {
      return compileModel(result, TextModel, conductorsHeadingNames);
    },

    // Return the dynamic text sections on the conductors section of the about page.

    getConductorsSections(result) {
      return compileModel(result, TextModel, conductorsSectionNames);
    },

    // Return the dynamic images on the conductors section of the about page.

    getConductorsImages(result) {
      return compileModel(result, ImageModel, conductorsImagesNames);
    },

    // Return the dynamic section headings on the history section of the about page.

    getHistoryHeadings(result) {
      return compileModel(result, TextModel, historyHeadingNames);
    },

    // Return the dynamic text sections on the history section of the about page.

    getHistorySections(result) {
      return compileModel(result, TextModel, historySectionNames);
    },

    // Return the dynamic section headings on the media section of the about page.

    getMediaHeadings(result) {
      return compileModel(result, TextModel, mediaHeadingNames);
    },

    // Return the dynamic text sections on the media section of the about page.

    getMediaSections(result) {
      return compileModel(result, TextModel, mediaSectionNames);
    },

    // Return the dynamic section headings on the contact page.

    getContactHeadings(result) {
      return compileModel(result, TextModel, contactHeadingNames);
    },

    // Return the dynamic text sections on the contact page.

    getContactSections(result) {
      return compileModel(result, TextModel, contactSectionNames);
    },

    // Return the dynamic event headings on the events page.

    getEventsHeadings(result) {
      return compileModel(result, TextModel, eventsHeadingNames);
    },

    // Return the dynamic event descriptions on the events page.

    getEventsText(result) {
      return compileModel(result, TextModel, eventsTextNames);
    },

    // Return the dynamic images on the events page.

    getEventsImages(result) {
      return compileModel(result, ImageModel, eventsImagesNames);
    },

    // Return the dynamic shop item headings on the shop page.

    getShopHeadings(result) {
      return compileModel(result, TextModel, contactShopNames);
    },

    // Return the dynamic shop item content on the shop page.

    getShopItems(result) {
      return compileModel(result, ShopItemModel, shopItemNames);
    },

    // Return the dynamic images on the shop page.

    getShopImages(result) {
      return compileModel(result, ImageModel, shopImagesNames);
    },

    // Return the dynamic iframes on the media section of the about page.

    getIframes(result) {
      return compileModel(result, MediaItemModel, iframeNames);
    },

    // Return the dynamic sponsor logos on the sponsors section of the about page.

    getSponsorsLogos(result) {
      return compileModel(result, ImageLinkModel, sponsorsLogoNames);
    },

    // Return the dynamic form fields on the contact page.

    getContactFormFields(result) {
      return compileModel(result, FormFieldModel, contactFormFieldNames);
    },

    // Return the dynamic form fields on the order page.

    getOrderFormFields(result) {
      return compileModel(result, FormFieldModel, orderFormFieldNames);
    },




















  };



module.exports = renderingModel;
