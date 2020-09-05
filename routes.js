"use strict";

const express = require("express");
const router = express.Router();

const assessment = require("./controllers/assessment.js");
const about = require("./controllers/about.js");
const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");

router.get("/", accounts.index);
router.get("/logout", accounts.logout);
router.get("/signup", accounts.signup);
router.post("/register", accounts.register);
router.get("/login", accounts.login);
router.post("/authenticate", accounts.authenticate);

router.get("/assessments/:id", assessment.index);
router.post('/assessment/:id/addassessment', assessment.addAssessment);
router.get("/assessment/:id", assessment.index);

router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
module.exports = router;