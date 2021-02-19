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
const compiler = require("./compiler");


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
      aboutSectionHeadings: await compiler("about_section_headings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      staticTextWithHeading: await compiler("static_text_with_heading", models.TextWithHeadingModel, language),
      eventsImages: await compiler("events_images", models.ImageModel),
      eventsContent: await compiler("events_content", models.TextWithHeadingModel, language),
      pastEventsContent: await compiler("past_events_content", models.TextWithHeadingModel, language),
      pageInfo: getPageInfo("home", "est")
    };
  } else if (templateName === "about") {
    return {
      aboutSectionHeadings: await compiler("about_section_headings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      staticText: await compiler("static_Text", models.TextModel, language),
      staticTextWithHeading: await compiler("static_text_with_heading", models.TextWithHeadingModel, language),
      membersSections: await compiler("Members_sections", models.TextWithHeadingModel, language),
      conductorsImages: await compiler("conductors_images", models.ImageModel),
      conductorsSections: await compiler("conductors_sections", models.TextWithHeadingModel, language),
      historySections: await compiler("history_sections", models.TextWithHeadingModel, language),
      mediaSections: await compiler("media_sections", models.TextWithHeadingModel, language),
      iframes: await compiler("iframes", models.mediaItemModel),
      sponsorsLogos: await compiler("sponsors_logos", models.imageLinkModel),
      pageInfo: getPageInfo("home", "est")
    };
  }
};

// Export the function.

module.exports = reqData;
