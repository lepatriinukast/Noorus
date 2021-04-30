/* jshint esversion: 8 */

// This module exports a function that creates fields objects used for uploading images with multer.
// These objects contain the names of the inputs which upload the images,
// and a maxCount property, which specifies how many images one input can upload.

// Create the exports function.

  const getFields = (templateName, index) => {

    if (templateName === "home") {
      return [{
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
        ];
    } else if (templateName === "about") {
      return [{
        name: "aboutBackgroundImg",
        maxCount: 1
      }];
    } else {
      const fields = [];
      for (let i = 1; i < 50; i++) {
        fields.push({
          name: templateName + "Img" + i,
        maxCount: 1});
      }
      return fields;
    }
  };

// Export the function.

module.exports = getFields;
