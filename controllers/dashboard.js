"use strict";

const logger = require("../utils/logger");
const AssessmentCollection = require("../models/assessment-store.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Assessment Dashbloard",
      assessments: AssessmentCollection
    };
    logger.info("about to render", AssessmentCollection);
    response.render("dashboard", viewData);
  },

};

module.exports = dashboard;
