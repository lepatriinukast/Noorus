/*jshint esversion: 8 */

// In order to work, this module needs to import the function that queries the database.

const query = require("./queryDatabase");

// This module assigns keys to the javascript objects that can be rendered on the webpage with ejs.

// Many renderable objects can be added and deleted by the admin of the website and are thus dynamic.
// so the only way to get access to the names and number of these elements, is to make a database query.
// The data that they contain (including a name property) is stored in a database,

// The following function queries a specified database, awaits for the result array to be returned,
// Then loops through the result array, finds the names of all the renderable objects,
// and finally returns an array that is populated with these object names.

const getDynamicKeys = async (tableName) => {
  const result = await query(tableName);
  const keys = [];
  for (let i = 0; i < result.length; i++) {
    let key = result[i].name;
    keys.push(key);
  }
  return keys;
};

// Return all the key arrays in an exportable object.

const keyArrays = {

  // Some of the object names are static and are already known in advance.
  // Write them out into arrays.

  staticImages: ["favicon", "logo", "homeBackgroundImage", "aboutBackgroundImage"],
  staticText: [
    "aboutIntroductionSection", "aboutMembersSection", "aboutMediaSection", "contactSection", "shopSection", "orderSection",
    "contactFormHeading", "orderFormHeading", "orderPreamble", "orderPostamble"
  ],
  staticTextWithHeading: [
    "homeIntroduction", "homeSection1", "homeSection2",
    "membersSopranos", "membersAltos", "membersTenors", "membersBasses"
  ],
  dropdownMenu: ["heading1", "heading2", "heading3", "heading4", "heading5", "heading6"],

  // Now get all the dynamic key arrays using the function at the top of the module.

  membersSections: getDynamicKeys("members_sections"),
  conductorsSections: getDynamicKeys("conductors_sections"),
  conductorsImages: getDynamicKeys("conductors_sections"),
  historySections: getDynamicKeys("history_sections"),
  mediaSections: getDynamicKeys("media_sections"),
  contactSections: getDynamicKeys("contact_sections"),
  shopItems: getDynamicKeys("shop_items"),
  shopImages: getDynamicKeys("shop_images"),
  eventsContent: getDynamicKeys("events_content"),
  eventsImages: getDynamicKeys("events_images"),
  pastEventsContent: getDynamicKeys("past_events_content"),
  pastEventsImages: getDynamicKeys("past_events_images"),
  contactFormFields: getDynamicKeys("contact_form_fields"),
  orderFormFields: getDynamicKeys("order_form_fields"),
  iframes: getDynamicKeys("iframes"),
  sponsorsLogos: getDynamicKeys("sponsors_logos")
};

// Export the object.

module.exports = keyArrays;
