/* jshint esversion: 8 */

const express = require('express');
const router = express.Router();

const reqData = require("./../reqData");


    // Estonian routes

    router.get("/", async (req, res) => {
      const data = await reqData("home", "est");
      res.render("home", {
        data: data
      });
    });

    router.get("/koorist", async (req, res) => {
      const data = await reqData("about", "est");
      res.render("about", {
        data: data
      });
    });

    router.get("/sundmused", async (req, res) => {
      const data = await reqData("events", "est");
      res.render("events", {
        data: data
      });
    });

    router.get("/kontakt", async (req, res) => {
      const data = await reqData("contact", "est");
      res.render("contact", {
        data: data
      });
    });

    router.get("/pood", async (req, res) => {
      const data = await reqData("shop", "est");
      data.pageInfo.pageType = "public shop";
      res.render("shop", {
        data: data
      });
    });

    router.get("/telli", async (req, res) => {
      const data = await reqData("order", "est");
      data.selected = req.query.selected;
      data.pageInfo.pageType = "public order";
      res.render("order", {
        data: data
      });
    });

    // English routes

    router.get("/en", async (req, res) => {
      const data = await reqData("home", "en");
      res.render("home", {
        data: data
      });
    });

    router.get("/en/about", async (req, res) => {
      const data = await reqData("about", "en");
      res.render("about", {
        data: data
      });
    });

    router.get("/en/events", async (req, res) => {
      const data = await reqData("events", "en");
      res.render("events", {
        data: data
      });
    });

    router.get("/en/contact", async (req, res) => {
      const data = await reqData("contact", "en");
      res.render("contact", {
        data: data
      });
    });

    router.get("/en/shop", async (req, res) => {
      const data = await reqData("shop", "en");
      data.pageInfo.pageType = "public shop";
      res.render("shop", {
        data: data
      });
    });

    router.get("/en/order", async (req, res) => {
      const data = await reqData("order", "en");
      data.selected = req.query.selected;
      data.pageInfo.pageType = "public order";
      res.render("order", {
        data: data
      });
    });

module.exports = router;
