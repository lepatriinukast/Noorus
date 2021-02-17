/*jshint esversion: 8 */

// This module exports models for creating javascript objects populated with content coming from a database table.


// A function that filters out language-specific properties from a database entry.

const chooseLanguage = (result, iterator, language, heading) => {
  if (heading) {
    return result[iterator][`heading_${language}`];
  } else {
    return result[iterator][language];
  }
};

// The exportable object, which contains constructor functions for making javascript objects from database entries.

const models = {

  // A constructor for creating a model of a single image.
  // If the url is not a valid one for the image, the filename property will revert to null.

  ImageModel: function (result, iterator) {
    if (result) {
      this.url = result[iterator].url;
      if (this.url) {
        if (this.url.indexOf("img/") !== 0) {
          this.filename = result[iterator].url.slice(5);
        } else {
          this.filename = null;
        }
      } else {
        this.filename = null;
      }
    }
  },

  // A constructor for creating a model of a single text element.

  TextModel: function (result, iterator, language) {
    if (result) {
      return chooseLanguage(result, iterator, language, false);
    }
  },

  // A constructor for creating a model of a single text element with a separate heading.

  TextWithHeadingModel: function (result, iterator, language) {
    if (result) {
      this.heading = chooseLanguage(result, iterator, language, true);
      this.content = chooseLanguage(result, iterator, language, false);
    }
  },

  // A constructor for creating a model of a single clickable image.
  // When the url for the image is not valid, the filename property reverts to null.

  ImageLinkModel: function (result, iterator) {
    if (result) {
      this.link = result[iterator].link;
      this.url = result[iterator].url;
      if (this.url) {
        if (this.url.indexOf("img/") !== 0) {
          this.filename = result[iterator].url.slice(5);
        } else {
          this.filename = null;
        }
      } else {
        this.filename = null;
      }
    }
  },

  // A constructor for creating a model of a single form field.

  FormFieldModel: function (result, iterator, language) {
    if (result) {
      this.content = chooseLanguage(result, iterator, language, false);
      this.required = result[iterator].required;
      this.expandable = result[iterator].expandable;
    }
  },

  // A constructor for creating a model of a single iframe on the media section of the about page.

  MediaItemModel: function (result, iterator) {
    if (result) {
      this.link = result[iterator].link;
    }
  },

  // A constructor for creating a model of a single item on the shop page.

  ShopItemModel: function (result, iterator) {
    if (result) {
      this.heading = chooseLanguage(result, iterator, language, true);
      this.content = chooseLanguage(result, iterator, language, false);
    }
  }
};

// Export the object.

module.exports = models;
