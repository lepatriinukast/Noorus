/* jshint esversion: 8 */

// This module exports an object which contains several upload and update functions.
// They are configurations of the multer middleware and can be used in API routes.

// Require the multer middleware (with custom configuration) to handle HTTP requests.

const multer = require("./../config/multer");

// Export a function which returns an object containing methods for different updates and uploads.

const upload = (fields) => {

// Return an object containing multer methods.

  return {

    // Setup a multer function which handles text-only requests.

    text: multer().none(),

    // Setup a multer function which handles both text-based data and image uploads.
    // In the fields array, specify the name attibutes of the inputs, from where the files will be uploaded.

    multipart: multer({
      storage: multer.storage
    }).fields(fields)
  };
};

// Export the object.

module.exports = upload;
