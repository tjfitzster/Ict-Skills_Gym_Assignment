~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");
const  assessments= require("./controllers/assessments.js");
const about = require("./controllers/about.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.post("/dashboard/addassessment", dashboard.addAssessment);
router.post("/dashboard/addnewassessment", dashboard.addnewAssessment);

router.get("/trainerdashboard", trainerdashboard.index);
router.get("/trainerdashboard/deleteusers/:id", trainerdashboard.deleteUser);
router.get("/settings", trainerdashboard.settings);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);
router.get("/assessments/:id", assessments.index);

router.get("/about", about.index);
module.exports = router;
