"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const userinfo = require("../models/user-store");
const user_assessmentStore = require("../models/assessment-store");

const dashboard = {

  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);

    const viewData = {
      assessments : user_assessmentStore.getAllassessments(),
      users: userinfo.getAllUsers()
    };

    response.render("trainerdashboard", viewData);
  },

  settings(request, response) {
    const viewData = {
      loggedInUser : accounts.getCurrentUser(request)
    };

    response.render("trainersettings", viewData);
  },

  deleteUser(request, response) {
    const userId = request.params.id;
    userinfo.removeUser(userId);
    response.redirect("/trainerdashboard");
  },

};

module.exports = dashboard;