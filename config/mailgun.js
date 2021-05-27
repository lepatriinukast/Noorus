/* jshint esversion: 8 */

// This module sets up an e-mail sending procedure.
// The necessary information is hidden in the .env file.

// Require the mailgun-js module.

const mailgun = require("mailgun-js");

// setup an e-mail transporter.
// The delicate details are located in the .env file.

const mg = mailgun({
  apiKey: process.env.MG_API_KEY,
  domain: process.env.MG_DOMAIN
});

// Function for sending the email using the specified options.

const send = (data) => {
  mg.messages().send(data, (error, body) => {
  });
};

// Export the function.

module.exports = send;
