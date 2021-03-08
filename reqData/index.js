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
          changeLanguage: routeInfo.navigation.hrefs.changeLanguage[templateName][language],
        }
      },
      miscellaneous: routeInfo.miscellaneous[templateName][language]
    };
};

// The function that is returned by the module creates a different data object for each template.

const reqData = async (templateName, language) => {

  if (templateName === "home") {
    return {
      aboutSubheadings: await compiler("about_subheadings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      homeText: await compiler("home_text", models.TextWithHeadingModel, language),
      eventsImages: await compiler("events_images", models.ImageModel),
      eventsContent: await compiler("events_content", models.TextWithHeadingModel, language),
      pastEventsContent: await compiler("past_events_content", models.TextWithHeadingModel, language),
      pageInfo: getPageInfo(templateName, language)
    };
  } else if (templateName === "about") {
    return {
      aboutSubheadings: await compiler("about_subheadings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel, language),
      membersGrid: await compiler("members_grid", models.TextWithHeadingModel, language),
      membersSegments: await compiler("members_segments", models.TextWithHeadingModel, language),
      conductorsImages: await compiler("conductors_images", models.ImageModel),
      conductorsSegments: await compiler("conductors_segments", models.TextWithHeadingModel, language),
      historySegments: await compiler("history_segments", models.TextWithHeadingModel, language),
      mediaSegments: await compiler("media_segments", models.TextWithHeadingModel, language),
      iframes: await compiler("iframes", models.mediaItemModel),
      sponsorsLogos: await compiler("sponsors_logos", models.imageLinkModel),
      pageInfo: getPageInfo(templateName, language)
    };
  } else if (templateName === "events") {
    return {
      aboutSubheadings: await compiler("about_subheadings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel, language),
      aboutMembersGrid: await compiler("members_grid", models.TextWithHeadingModel, language),
      eventsImages: await compiler("events_images", models.ImageModel),
      eventsContent: await compiler("events_content", models.TextWithHeadingModel, language),
      pastEventsImages: await compiler("past_events_images", models.ImageModel),
      pastEventsContent: await compiler("past_events_content", models.TextWithHeadingModel, language),
      pageInfo: getPageInfo(templateName, language)
    };
  } else if (templateName === "contact") {
    return {
      aboutSubheadings: await compiler("about_subheadings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel, language),
      contactSections: await compiler("contact_sections", models.TextWithHeadingModel, language),
      contactForm: await compiler("contact_form", models.FormFieldModel, language),
      pageInfo: getPageInfo(templateName, language)
    };
  } else if (templateName === "shop") {
    return {
      aboutSubheadings: await compiler("about_subheadings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel, language),
      shopItems: await compiler("shop_items", models.TextWithHeadingModel, language),
      pageInfo: getPageInfo(templateName, language),
      language: language,
    };
  } else if (templateName === "order") {
    return {
      aboutSubheadings: await compiler("about_subheadings", models.TextModel, language),
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel, language),
      shopItems: await compiler("shop_items", models.TextWithHeadingModel, language),
      orderForm: await compiler("order_form", models.FormFieldModel, language),
      pageInfo: getPageInfo(templateName, language),
    };
  } else if (templateName === "login") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      pageInfo: {
        appName: routeInfo.appName.est,
      }
    };
  } else if (templateName === "admin-home") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-about") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-members") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-conductors") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-history") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-media") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-sponsors") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-events") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-contact") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "admin-shop") {
    return {
      pageInfo: {
        appName: routeInfo.appName.est
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  }
};

// Export the function.

module.exports = reqData;
