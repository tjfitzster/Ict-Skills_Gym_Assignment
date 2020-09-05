"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store.js");
const uuid = require('uuid');

const assessment = {
  index(request, response) {
    const memberId = request.params.id;
   logger.debug("Assessment id = ", memberId);
    const viewData = {
      title: "Member",
      memberAssessments: memberStore.getMemberassessments(memberId)
    };
    response.render("Assessment", viewData);
  },
  addAssessment(request, response) {
    const memberId = request.params.id;

    const assessment = memberStore.getMemberassessments(memberId);
    const newAssessment = {
      id: uuid.v1(),
      Weight: Number(request.body.weight),
      Chest: request.body.chest,
      Thigh: request.body.thigh,
      UpperArm: request.body.upperarm,
      Waist: request.body.waist,
      Hips: request.body.hips,
    };
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/Assessment/' + memberId);
  //  logger.debug('New Song = ', newSong);
  },
}

module.exports = assessment;
