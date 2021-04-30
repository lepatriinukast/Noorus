/* jshint esversion: 8 */

// This module will export a function that creates a boilerplate for the reqData module.
// This will return a block of code that is the same regardless of the route.

// This module needs access to the following modules:

const routeInfo = require("./routeInfo");

// Create the function.

const getPageInfo = (templateName, language) => {

    return {
      pageType: "public",
      languageAttribute: routeInfo.languageAttribute[language],
      appName: routeInfo.appName[language],
      pageTitle: routeInfo.pageTitles[templateName][language],
      aboutSubheadings: routeInfo.aboutSubheadings[language],
      buttonText: routeInfo.buttonText[language],
      navigation: {
        linkTexts: routeInfo.navigation.linkTexts[language],
        ariaLabels: routeInfo.navigation.ariaLabels[language],
        hrefs: {
          links: routeInfo.navigation.hrefs.links[language],
          dropdown: routeInfo.navigation.hrefs.dropdown[language],
          changeLanguage: routeInfo.navigation.hrefs.changeLanguage[templateName][language],
        }
      },
      miscellaneous: routeInfo.miscellaneous[templateName][language]
    };
};

// Export the function.

module.exports = getPageInfo;
