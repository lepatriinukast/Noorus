/* jshint esversion: 8 */

// This module exports objects that are used for uploading images with multer.
// These objects contain the names of the inputs which upload the images,
// and a maxCount property, which specifies how many images one input can upload.

const fields = {

  home: [{
      name: "favicon",
      maxCount: 1
    },
    {
      name: "logo",
      maxCount: 1
    },
    {
      name: "homeBackgroundImg",
      maxCount: 1
    }
  ],
  about: [{
    name: "aboutBackgroundImg",
    maxCount: 1
  }]
};

// Export the object.

module.exports = fields;
