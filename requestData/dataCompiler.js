/* jshint esversion: 8 */

// This module is the last step between getting content from the database
// and sending it to the server to be rendered inside a route.

// It has access to both the database data via the requestData module
// and the raw language-specific data from the routeInfo module.

// This module compiles both into a large container object.
// Each template will get its own container object.

// Inside a route one can specify the template and the language
// and in return get a corresponding container object, which can be rendered on the page.



// This module needs access to the following modules:

const info = require("./routeInfo");
const mod = require("./modelConstructors");
const reqData = require("./requestData");


// This function creates a boilerplate-
// a block of code that is the same regardless of the route.

const getBasicInfo = (templateName, language) => {
  return {
    appName: info.appName[language],
    pageTitle: info.pageTitles[templateName][language],
    buttonText: info.buttonText[language],
    navigation: {
      linkTexts: info.navigation.linkTexts[language],
      ariaLabels: info.navigation.ariaLabels[language],
      hrefs: {
        links: info.navigation.hrefs.links[language],
        dropdown: info.navigation.hrefs.dropdown[language],
        changeLanguage: info.navigation.hrefs.changeLanguage[language],
      }
    }
  };
};

// The function that is returned by the module.
// It returns a different data object for each template.

const dataCompiler = async (templateName, language) => {

  if (templateName === "home") {
    return {
      dropdownMenu: await reqData("dropdownMenu", mod.TextModel, false, language),
      staticImages: await reqData("staticImages", mod.ImageModel, false),
      staticTextWithHeading: await reqData("staticTextWithHeading", mod.TextWithHeadingModel, false, language),
      eventsImages: await reqData("eventsImages", mod.ImageModel, false),
      eventsContent: await reqData("eventsContent", mod.TextWithHeadingModel, false, language),
      pastEventsContent: await reqData("pastEventsContent", mod.TextWithHeadingModel, false, language),
      pageInfo: {
        basicInfo: getBasicInfo("home", language),
        miscellaneous: info.miscellaneous.home[language]
      },
    };
  } else if (templateName === "about") {
    return {
      dropdownMenu: await reqData("dropdownMenu", mod.TextModel, false, language),
      staticImages: await reqData("staticImages", mod.ImageModel, false),
      staticTextWithHeading: await reqData("staticTextWithHeading", mod.TextWithHeadingModel, false, language),
      eventsImages: await reqData("eventsImages", mod.ImageModel, false),
      eventsContent: await reqData("eventsContent", mod.TextWithHeadingModel, false, language),
      pastEventsContent: await reqData("pastEventsContent", mod.TextWithHeadingModel, false, language),
      pageInfo: {
        basicInfo: getBasicInfo("home", language),
        miscellaneous: info.miscellaneous.home[language]
      },
    };
  }
};

// Export the function.

module.exports = dataCompiler;
