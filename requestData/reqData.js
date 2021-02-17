/* jshint esversion: 8 */

// This module is the last step between getting content from the database
// and sending it to the server to be rendered inside a route.

// It has access to both the database data via the compiler module
// and the raw language-specific data from the routeInfo module.

// This module compiles both into a large container object.
// Each template will get its own container object.

// Inside a route one can specify the template and the language
// and in return get a corresponding container object, which can be rendered on the page.


// This module needs access to the following modules:

const routeInfo = require("./routeInfo");
const models = require("./models");


// This function creates a boilerplate-
// a block of code that is the same regardless of the route.

const getPageInfo = (templateName, language) => {
  return {
    appName: routeInfo.appName[language],
    pageTitle: routeInfo.pageTitles[templateName][language],
    buttonText: routeInfo.buttonText[language],
    navigation: {
      linkTexts: routeInfo.navigation.linkTexts[language],
      ariaLabels: routeInfo.navigation.ariaLabels[language],
      hrefs: {
        links: routeInfo.navigation.hrefs.links[language],
        dropdown: routeInfo.navigation.hrefs.dropdown[language],
        changeLanguage: routeInfo.navigation.hrefs.changeLanguage[language],
      }
    },
    miscellaneous: routeInfo.miscellaneous[templateName][language]
  };
};

// The function that is returned by the module creates a different data object for each template.

const reqData = async (templateName, language) => {

  if (templateName === "home") {
    return {
      dropdownMenu: await reqData("dropdownMenu", models.TextModel, language),
      staticImages: await reqData("staticImages", models.ImageModel),
      staticTextWithHeading: await reqData("staticTextWithHeading", models.TextWithHeadingModel, language),
      eventsImages: await reqData("eventsImages", models.ImageModel),
      eventsContent: await reqData("eventsContent", models.TextWithHeadingModel, language),
      pastEventsContent: await reqData("pastEventsContent", models.TextWithHeadingModel, language),
      pageInfo: getPageInfo("home", "est")
    };
  } else if (templateName === "about") {
    return {
      dropdownMenu: await reqData("dropdownMenu", models.TextModel, language),
      staticImages: await reqData("staticImages", models.ImageModel),
      staticText: await reqData("staticText", models.TextModel, language),
      staticTextWithHeading: await reqData("staticTextWithHeading", models.TextWithHeadingModel, language),
      membersSections: await reqData("MembersSections", models.TextWithHeadingModel, language),
      conductorsImages: await reqData("conductorsImages", models.ImageModel),
      conductorsSections: await reqData("conductorsSections", models.TextWithHeadingModel, language),
      historySections: await reqData("historySections", models.TextWithHeadingModel, language),
      mediaSections: await reqData("mediaSections", models.TextWithHeadingModel, language),
      iframes: await reqData("iframes", models.mediaItemModel),
      sponsorsLogos: await reqData("sponsorsLogos", models.imageLinkModel),
      pageInfo: getPageInfo("home", "est")
    };
  }
};

// Export the function.

module.exports = reqData;
