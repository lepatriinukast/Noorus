 /* jshint esversion: 8 */

 // This file is the main file of the reqData module,
 // which is a middleware between getting content from the database
 // and sending it to the server to be rendered inside a route.

// This file has access to both the database data via the compiler and models modules
// and the raw language-specific data from the routeInfo module.

// This module compiles both into a large container object.
// Each template will get its own container object.

// Inside a route one can specify the template and the language
// and in return get a corresponding container object which can be rendered on the page.


// Require all submodules:

const routeInfo = require("./routeInfo");
const models = require("./models");
const compiler = require("./compiler");
const getPageInfo = require("./getPageInfo");


// The function that is returned by the module creates a different data object for each template.
// The getPageInfo module is used for generating some boilerplate data for the public routes.

const reqData = async (templateName, language) => {

  if (templateName === "home") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      staticSections: await compiler("static_sections", models.SectionModel),
      eventsImages: await compiler("events_images", models.ImageModel),
      eventsContent: await compiler("events_content", models.SectionModel),
      archiveContent: await compiler("archive_content", models.SectionModel),
      pageInfo: getPageInfo(templateName, language),
      language: language
    };
  } else if (templateName === "about") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      staticSections: await compiler("static_sections", models.SectionModel),
      intros: await compiler("intros", models.TextModel),
      membersGrid: await compiler("members_grid", models.SectionModel),
      membersSections: await compiler("members_sections", models.SectionModel),
      conductorsImages: await compiler("conductors_images", models.ImageModel),
      conductorsSections: await compiler("conductors_sections", models.SectionModel),
      historySections: await compiler("history_sections", models.SectionModel),
      mediaSections: await compiler("media_sections", models.SectionModel),
      iframes: await compiler("iframes", models.MediaItemModel),
      sponsorsLogos: await compiler("sponsors_logos", models.ImageLinkModel),
      pageInfo: getPageInfo(templateName, language),
      language: language
    };
  } else if (templateName === "events") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      aboutMembersGrid: await compiler("members_grid", models.SectionModel),
      eventsImages: await compiler("events_images", models.ImageModel),
      eventsContent: await compiler("events_content", models.SectionModel),
      archiveImages: await compiler("archive_images", models.ImageModel),
      archiveContent: await compiler("archive_content", models.SectionModel),
      pageInfo: getPageInfo(templateName, language),
      language: language
    };
  } else if (templateName === "contact") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      contactSections: await compiler("contact_sections", models.SectionModel),
      contactForm: await compiler("contact_form", models.FormFieldModel),
      miscellaneous: await compiler("miscellaneous", models.TextModel),
      pageInfo: getPageInfo(templateName, language),
      language: language
    };
  } else if (templateName === "shop") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      shopItems: await compiler("shop_items", models.ShopItemModel),
      shopImages: await compiler("shop_images", models.ImageModel),
      pageInfo: getPageInfo(templateName, language),
      language: language,
    };
  } else if (templateName === "order") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      shopItems: await compiler("shop_items", models.ShopItemModel),
      orderForm: await compiler("order_form", models.FormFieldModel),
      miscellaneous: await compiler("miscellaneous", models.TextModel),
      pageInfo: getPageInfo(templateName, language),
      language: language
    };
  } else if (templateName === "login") {
    return {
      staticImages: await compiler("static_images", models.ImageModel),
      pageInfo: {
        pageType: "login",
        appName: routeInfo.appName.est,
        pageTitle: "Sisselogimine"
      }
    };
  } else if (templateName === "admin-home") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Avaleht"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      staticSections: await compiler("static_sections", models.SectionModel),
    };
  } else if (templateName === "admin-about") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Koorist",
        href: "koorist"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      staticSections: await compiler("static_sections", models.SectionModel)
    };
  } else if (templateName === "admin-members") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Liikmed",
        href: "koorist#liikmed"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      membersGrid: await compiler("members_grid", models.SectionModel),
      membersSections: await compiler("members_sections", models.SectionModel)
    };
  } else if (templateName === "admin-conductors") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Dirigendid",
        href: "koorist#dirigendid"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      conductorsImages: await compiler("conductors_images", models.ImageModel),
      conductorsSections: await compiler("conductors_sections", models.SectionModel),
    };
  } else if (templateName === "admin-history") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Ajalugu",
        href: "koorist#ajalugu"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      historySections: await compiler("history_sections", models.SectionModel),
    };
  } else if (templateName === "admin-media") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Meedia",
        href: "koorist#meedia"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      iframes: await compiler("iframes", models.MediaItemModel),
      mediaSections: await compiler("media_sections", models.SectionModel),
    };
  } else if (templateName === "admin-sponsors") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Toetajad",
        href: "koorist#toetajad"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      sponsorsLogos: await compiler("sponsors_logos", models.ImageLinkModel)
    };
  } else if (templateName === "admin-events") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Sündmused",
        href: "sundmused"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      eventsImages: await compiler("events_images", models.ImageModel),
      eventsContent: await compiler("events_content", models.SectionModel),
    };
  } else if (templateName === "admin-contact") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Kontakt",
        href: "kontakt"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      contactSections: await compiler("contact_sections", models.SectionModel),
      contactForm: await compiler("contact_form", models.FormFieldModel),
      miscellaneous: await compiler("miscellaneous", models.TextModel)
    };
  } else if (templateName === "admin-shop") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        pageTitle: "Admin/Pood",
        appName: routeInfo.appName.est,
        href: "pood"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      shopImages: await compiler("shop_images", models.ImageModel),
      shopItems: await compiler("shop_items", models.ShopItemModel),
      orderForm: await compiler("order_form", models.FormFieldModel),
      miscellaneous: await compiler("miscellaneous", models.TextModel)
    };
  } else if (templateName === "admin-order") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Telli",
        href: "telli"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      orderForm: await compiler("order_form", models.FormFieldModel),
      miscellaneous: await compiler("miscellaneous", models.TextModel)
    };
  } else if (templateName === "admin-archive") {
    return {
      pageInfo: {
        pageType: "admin",
        languageAttribute: "est",
        appName: routeInfo.appName.est,
        pageTitle: "Admin/Arhiiv",
        href: "sundmused#moodunud"
      },
      staticImages: await compiler("static_images", models.ImageModel),
      intros: await compiler("intros", models.TextModel),
      archiveImages: await compiler("archive_images", models.ImageModel),
      archiveContent: await compiler("archive_content", models.SectionModel),
    };
  } else if (templateName === "success") {
    return {
      pageInfo: {
        pageType: "message",
        languageAttribute: routeInfo.languageAttribute[language],
        appName: routeInfo.appName[language],
        pageTitle: routeInfo.pageTitles.success[language],
        miscellaneous: routeInfo.miscellaneous.success[language]
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  } else if (templateName === "failure") {
    return {
      pageInfo: {
        pageType: "message",
        languageAttribute: routeInfo.languageAttribute[language],
        appName: routeInfo.appName[language],
        pageTitle: routeInfo.pageTitles.failure[language],
        miscellaneous: routeInfo.miscellaneous.failure[language]
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  }  else if (templateName === "error") {
    return {
      pageInfo: {
        pageType: "message",
        appName: routeInfo.appName.est,
        pageTitle: "404",
      },
      staticImages: await compiler("static_images", models.ImageModel)
    };
  }
};

// Export the function.

module.exports = reqData;
