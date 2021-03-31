/* jshint esversion: 8 */

const express = require('express');
const router = express.Router();

const reqData = require("./../reqData");

// All the routes in this module have a page type of "public", which will be passed into the data enquiry functions.
// Some routes have another page type definition as well, which will be concatenated after the default page type.

const pageType = "public";


    // Estonian routes

    router.get("/", async (req, res) => {
      const data = await reqData("home", pageType, "est");
      res.render("home", {
        data: data
      });
    });

    router.get("/koorist", async (req, res) => {
      const data = await reqData("about", pageType, "est");
      res.render("about", {
        data: data
      });
    });

    router.get("/sundmused", async (req, res) => {
      const data = await reqData("events", pageType, "est");
      res.render("events", {
        data: data
      });
    });

    router.get("/kontakt", async (req, res) => {
      const data = await reqData("contact", pageType, "est");
      res.render("contact", {
        data: data
      });
    });

    router.get("/pood", async (req, res) => {
      const data = await reqData("shop", pageType + " shop", "est");
      res.render("shop", {
        data: data
      });
    });

    router.get("/telli", async (req, res) => {
      const data = await reqData("order", pageType + " order", "est");
      res.render("order", {
        data: data
      });
    });

    // English routes

    router.get("/en", async (req, res) => {
      const data = await reqData("home", pageType, "en");
      res.render("home", {
        data: data
      });
    });

    router.get("/en/about", async (req, res) => {
      const data = await reqData("about", pageType, "en");
      res.render("about", {
        data: data
      });
    });

    router.get("/en/events", async (req, res) => {
      const data = await reqData("events", pageType, "en");
      res.render("events", {
        data: data
      });
    });

    router.get("/en/contact", async (req, res) => {
      const data = await reqData("contact", pageType, "en");
      res.render("contact", {
        data: data
      });
    });

    router.get("/en/shop", async (req, res) => {
      const data = await reqData("shop", pageType + " shop", "en");
      res.render("shop", {
        data: data
      });
    });

    router.get("/en/order", async (req, res) => {
      const data = await reqData("order", pageType + " order", "en");
      res.render("order", {
        data: data
      });
    });

module.exports = router;
