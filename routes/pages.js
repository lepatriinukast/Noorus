/* jshint esversion: 8 */

const express = require('express');
const router = express.Router();

const reqData = require("./../reqData");


    // PAGE ROUTES

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
      res.render("shop", {
        data: data
      });
    });

    router.get("/telli", async (req, res) => {
      const data = await reqData("order", "est");
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
      res.render("shop", {
        data: data
      });
    });

    router.get("/en/order", async (req, res) => {
      const data = await reqData("order", "en");
      res.render("order", {
        data: data
      });
    });


    // LOGIN ROUTE

    router.get("/login", async (req, res) => {
      const data = await reqData("login");
      res.render("login", {
        data: data
      });
    });


    // MESSAGE PAGE ROUTES

    router.get("/kontakt/edu", async (req, res) => {
      const data = await reqData("contact-success", "est");
      res.render("message", {
        data: data
      });
    });

    router.get("/contact/success", async (req, res) => {
      const data = await reqData("contact-success", "en");
      res.render("message", {
        data: data
      });
    });

    router.get("/kontakt/torge", async (req, res) => {
      const data = await reqData("contact-failure", "est");
      res.render("message", {
        data: data
      });
    });

    router.get("/contact/failure", async (req, res) => {
      const data = await reqData("contact-failure", "en");
      res.render("message", {
        data: data
      });
    });

    router.get("/telli/edu", async (req, res) => {
      const data = await reqData("order-success", "est");
      res.render("message", {
        data: data
      });
    });

    router.get("/order/success", async (req, res) => {
      const data = await reqData("order-success", "en");
      res.render("message", {
        data: data
      });
    });

    router.get("/telli/torge", async (req, res) => {
      const data = await reqData("order-failure", "est");
      res.render("message", {
        data: data
      });
    });

    router.get("/order/failure", async (req, res) => {
      const data = await reqData("order-failure", "en");
      res.render("message", {
        data: data
      });
    });


    // ERROR PAGE

    router.get("*", async (req, res) => {
      const data = await reqData("error");
      res.render("error", {
        data: data
      });
    });

module.exports = router;
