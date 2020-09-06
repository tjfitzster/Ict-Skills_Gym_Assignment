"use strict";

const user_assessmentStore = require("../models/assessment-store");
const assessments = {
  index(request, response) {

    const userid = request.params.id;
    const viewData = {
      title: "Assessments",
      assessments: user_assessmentStore.getUserAssessments(userid),
    };
    response.render("assessments", viewData);
  }
};
  module.exports = assessments;