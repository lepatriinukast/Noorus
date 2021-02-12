/*jshint esversion: 8 */

// a function that filters out language-specific properties from a database entry

const chooseLanguage = (result, iterator, language, heading) => {
  if (heading) {
    return result[iterator][`heading_${language}`];
  } else {
    return result[iterator][language];
  }
};

// the exportable object, which contains constructor functions for making javascript objects from database entries

const modelConstructors = {

  // a constructor for creating a model of a single image

  ImageModel: function (result, iterator) {
    if (result) {
      this.url = result[iterator].url;
      this.filename = "";
    }
  },

  // a constructor for creating a model of a single text element

  TextModel: function (result, iterator) {
    if (result) {
      return chooseLanguage(result, iterator, language, false);
    }
  },

  // a constructor for creating a model of a single text element with a separate heading

  TextWithHeadingModel: function (result, iterator, language) {
    if (result) {
      this.heading = chooseLanguage(result, iterator, language, true);
      this.content = chooseLanguage(result, iterator, language, false);
    }
  },

  // a constructor for creating a model of a single clickable image

  ImageLinkModel: function (result, iterator) {
    if (result) {
      this.url = result[iterator].url;
      this.filename = "";
      this.link = result[iterator].link;
    }
  },

  // a constructor for creating a model of a single form field

  FormFieldModel: function (result, iterator, language) {
    if (result) {
      this.content = chooseLanguage(result, iterator, language, false);
      this.required = result[iterator].required;
      this.expandable = result[iterator].expandable;
    }
  },

  // a constructor for creating a model of a single iframe on the media section of the about page

  MediaItemModel: function (result, iterator) {
    if (result) {
      this.link = result[iterator].link;
    }
  },

  // a constructor for creating a model of a single item on the shop page

  ShopItemModel: function (result, iterator) {
    if (result) {
      this.heading = chooseLanguage(result, iterator, language, true);
      this.content = chooseLanguage(result, iterator, language, false);
    }
  }
};

module.exports = modelConstructors;
