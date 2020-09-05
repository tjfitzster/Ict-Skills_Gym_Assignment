"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const userinfo = require("../models/user-store");
const dashboard = {

  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);


    const viewData = {
    somestrings : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    };
    response.render("trainerdashboard", viewData);
  },

  settings(request, response) {

    const viewData = {
      somestrings : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      loggedInUser : accounts.getCurrentUser(request)
    };

    response.render("trainersettings", viewData);
  },
};

module.exports = dashboard;