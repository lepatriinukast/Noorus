/* jshint esversion: 8 */

// This module exports a router which renders the admin pages.


// Require the express framework and initialize a router object.

const express = require('express');
const router = express.Router();

// Require the express-session middleware configuration from the config folder.

const session = require("./../config/session");

// Setup the express-session framework as middleware for the router object.

router.use(session);

// Require the reqData custom module which will be used for getting the data displayed on the admin pages.

const reqData = require("./../reqData");

// All the routes in this module have a page type of "admin", which will be passed into the data enquiry functions.

const pageType = "admin";

// In every admin route, there will first be a check for a session cookie which indicates that the user is logged in.
// If the cookie exists, the required page will be rendered.
// If there is no cookie, the user will be redirected to the login page.
// The route /admin will redirect to the /admin/home page.

router.get("/", async (req, res) => {
  if (req.session.loggedIn === true) {
  res.redirect("/admin/home");
} else {
  res.redirect("/login");
}
});

router.get("/home", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-home", pageType);
  res.render("admin/admin-home", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/about", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-about", pageType);
  res.render("admin/admin-about", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/members", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-members", pageType);
  res.render("admin/admin-members", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/conductors", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-conductors", pageType);
  res.render("admin/admin-conductors", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/history", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-history", pageType);
  res.render("admin/admin-history", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/media", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-media", pageType);
  res.render("admin/admin-media", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/sponsors", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-sponsors", pageType);
  res.render("admin/admin-sponsors", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/events", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-events", pageType);
  res.render("admin/admin-events", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/contact", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-contact", pageType);
  res.render("admin/admin-contact", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/shop", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-shop", pageType);
  res.render("admin/admin-shop", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

router.get("/archive", async (req, res) => {
  if (req.session.loggedIn === true) {
  const data = await reqData("admin-archive", pageType);
  res.render("admin/admin-archive", {
    data: data
  });
} else {
  res.redirect("/login");
}
});

// Export the modified router object.

module.exports = router;
