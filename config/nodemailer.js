/* jshint esversion: 8 */

// This module sets up an e-mail sending procedure.
// The necessary information is hidden in the .env file.

// Require the nodemailer module.

const nodemailer = require("nodemailer");

// setup an e-mail transporter.

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

// Function for sending the email using the specified options.

const send = (mailOptions) => {
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) throw err;
  });

};


// Export the function.

module.exports = send;
