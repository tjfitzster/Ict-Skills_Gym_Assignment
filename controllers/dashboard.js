"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store.js");
const accounts = require("./accounts.js");
const uuid = require('uuid');

const dashboard = {

  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info(loggedInUser.id);
    const viewData = {
      title: "Assessment Dashboard",
      memberAssessments: memberStore.getUserAssessments(loggedInUser.id)
    };
    logger.info("about to render", memberStore.getUserAssessments(loggedInUser.id));
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
