/* jshint esversion: 8 */

const info = require("./routeInfo");
const mod = require("./modelConstructors");
const reqData = require("./requestData");

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

const compileRouteData = async (templateName, language) => {

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
  }
};

module.exports = compileRouteData;
