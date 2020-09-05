"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");


const playlistStore = require("../models/playlist-store");
const userinfo = require("../models/user-store");
const user_assessmentStore = require("../models/assessment-store");
const user_bmi = require("../models/bmi_info");
const uuid = require("uuid");

const bmiC = require("../utils/bmiCatagory");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);


    const viewData = {
      assessments: user_assessmentStore.getUserAssessments(loggedInUser.id),
      user: userinfo.getUserById(loggedInUser.id),
      bmiInfo: user_bmi.getUserbmi_info(loggedInUser.id),
    };
    response.render("dashboard", viewData);
  },

 // deletePlaylist(request, response) {
  //  const playlistId = request.params.id;
  //  playlistStore.removePlaylist(playlistId);
 //   response.redirect("/dashboard");
 // },

  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    const newAssessment = {
       id: uuid.v1(),
        Weight: request.body.weight,
        Chest: request.body.chest,
        Thigh: request.body.thigh,
        UpperArm: request.body.upperarm,
        Waist: request.body.waist,
        Hips: request.body.hips
    };

    user_assessmentStore.addAssessment(loggedInUser.id, newAssessment);

      const bmi = Number(((request.body.weight) / (loggedInUser.height * loggedInUser.height)));
      const bmiCatagory = bmiC.getCatagory(bmi);
      const bmiInfo = user_bmi.getUserbmi_info(loggedInUser.id);
      const new_bmi = {
      userid: loggedInUser.id,
      bmi: bmi,
      bmiCatagory: bmiCatagory
    };
    user_bmi.updatebmi_info(bmiInfo, new_bmi);


    response.redirect("/dashboard");
  },

  //addPlaylist(request, response) {
  //  const loggedInUser = accounts.getCurrentUser(request);
  //  const newPlayList = {
  //    id: uuid.v1(),
     // userid: loggedInUser.id,
   //   title: request.body.title,
   //   songs: []
   // };
  //  playlistStore.addPlaylist(newPlayList);
   // response.redirect("/dashboard");
  //}

};

module.exports = dashboard;