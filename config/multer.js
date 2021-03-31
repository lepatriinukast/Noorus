/* jshint esversion: 8 */

// This module sets up the multer middleware for image uploads.
// The multer object will be available and mutable from anywhere in the app.

// Require the multer middleware.

const multer = require("multer");

// Setup the multer storage engine for picture uploads (The default location for stored images will be public/img).

multer.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Export the object.

module.exports = multer;
