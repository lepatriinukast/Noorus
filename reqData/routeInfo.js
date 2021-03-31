/* jshint esversion: 8 */

// This module contains some of the raw hardcoded data that will be rendered on the webpage.
// Each piece of data in this module has two versions- Estonian and English.
// The module gives basic structure to this data.

const routeInfo = {
  languageAttribute: {
    est: "et",
    en: "en"
  },
  appName: {
    est: "Segakoor Noorus ",
    en: "Mixed Choir Noorus"
  },
  pageTitles: {
    home: {
      est: "Avaleht",
      en: "Home"
    },
    about: {
      est: "Koorist",
      en: "About us"
    },
    events: {
      est: "Sündmused",
      en: "Events"
    },
    contact: {
      est: "Kontakt",
      en: "Contact"
    },
    shop: {
      est: "Pood",
      en: "Shop"
    },
    order: {
      est: "Telli",
      en: "Order"
    },
    success: {
      est: "Edu",
      en: "Success"
    },
    failure: {
      est: "Tõrge",
      en: "Failure"
    },
  },
  buttonText: {
    est: "Loe edasi",
    en: "Read more"
  },
  navigation: {
    linkTexts: {
      est: ["Koorist", "Sündmused", "Kontakt", "Pood", "EN"],
      en: ["About us", "Events", "Contact", "Shop", "EST"]
    },
    ariaLabels: {
      est: ["Ava lisavalikud", "Näita valikuid", "Avalehele", "Facebooki link", "Instagrami link", "In English"],
      en: ["Open submenu", "Show menu", "To the home page", "Facebook link", "Instagram link", "Eesti keeles"]
    },
    hrefs: {
      links: {
        est: ["", "koorist", "sundmused", "kontakt", "pood"],
        en: ["en", "en/about", "en/events", "en/contact", "en/shop"]
      },
      dropdown: {
        est: ["koorist#liikmed", "koorist#dirigendid", "koorist#ajalugu", "koorist#meedia", "koorist#toetajad"],
        en: ["en/about#members", "en/about#conductors", "en/about#history", "en/about#media", "en/about#sponsors"]
      },
      changeLanguage: {
        home: {
          est: "en",
          en: ""
        },
        about: {
          est: "en/about",
          en: "koorist"
        },
        events: {
          est: "en/events",
          en: "sundmused"
        },
        contact: {
          est: "en/contact",
          en: "kontakt"
        },
        shop: {
          est: "en/shop",
          en: "pood"
        },
        order: {
          est: "en/order",
          en: "telli"
        },
      }
    }
  },
  miscellaneous: {
    home: {
      est: ["Segakoor Nooruse Logo", "sundmused#moodunud"],
      en: ["Logo of Mixed Choir Noorus", "events#past"]
    },
    about: {
      est: ["liikmed", "dirigendid", "ajalugu", "meedia", "toetajad", "Segakoor Noorus"],
      en: ["members", "conductors", "history", "media", "sponsors", "Mixed Choir Noorus"]
    },
    events: {
      est: ["Sündmus", "Möödunud sündmused", "Möödunud sündmus"],
      en: ["Event", "Past events", "Past event"]
    },
    contact: {
      est: ["Saada"],
      en: ["Send"]
    },
    shop: {
      est: ["Loe edasi...", "Telli siit"],
      en: ["Read more...", "Order here"]
    },
    order: {
      est: ["pood", "Kokku", "Telli"],
      en: ["en/shop", "Total", "Order"]
    },
    contactSuccess: {
      est: ["Andmed edastatud!", "Täname registreerimast! Võtame teiega ühendust esimesel võimalusel.", "kontakt", "Tagasi"],
      en: ["The message has been sent!", "Thank you for your registration! We will be contacting you shortly.", "en/contact", "Back"]
    },
    contactFailure: {
      est: ["Midagi läks sassi!", "Registreerimine ebaõnnestus. Palun proovige uuesti.", "kontakt", "Tagasi"],
      en: ["Something went wrong!", "Registration was unsuccessful. Please try again.", "en/contact", "Back"]
    },
    orderSuccess: {
      est: ["Teie tellimus on edastatud!", "Täname tellimuse eest! Võtame teiega ühendust esimesel võimalusel.", "pood", "Tagasi"],
      en: ["Your order has been submitted!", "Thank you for the order! We will be contacting you shortly.", "en/shop", "Back"]
    },
    orderFailure: {
      est: ["Midagi läks sassi!", "Tellimuse esitamine ebaõnnestus. Palun proovige uuesti!", "pood", "Tagasi"],
      en: ["Something went wrong!", "The order could not be processed. Please try again!", "en/shop", "Back"]
    },
  },
};

// Export the object.

module.exports = routeInfo;
