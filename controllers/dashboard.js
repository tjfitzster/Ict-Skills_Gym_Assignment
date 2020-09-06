"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");

const userinfo = require("../models/user-store");
const user_assessmentStore = require("../models/assessment-store");
const user_bmi = require("../models/bmi_info");
const uuid = require("uuid");
const bmiC = require("../utils/bmiCatagory");
const weightAssessment= require("../utils/isidealWeight");

const dashboard = {

  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

      if (user_assessmentStore.getUserAssessments(loggedInUser.id).length > 0)
          {
            const viewData = {
              assessments: user_assessmentStore.getUserAssessments(loggedInUser.id),
              user: userinfo.getUserById(loggedInUser.id),
              bmiInfo: user_bmi.getUserbmi_info(loggedInUser.id),
            };
            response.render("dashboard", viewData);

          }
        else
        {
          const dataView = {
           userdata: userinfo.getUserById(loggedInUser.id),
            bmi: Math.round(bmiC.calculate_firstbmi(loggedInUser.id)),
            bmiCatagory: bmiC.getCatagory(Math.round(bmiC.calculate_firstbmi(loggedInUser.id))),
            isIdealWeight: weightAssessment.isidealWeightCalc(loggedInUser.id),
          }
          response.render("firsttimedashboard", dataView);
        }
  },

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
      const bmi = Math.round(Number(((request.body.weight) / (loggedInUser.height * loggedInUser.height))));
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

  addnewAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    const newAssessment = {
      "id": uuid.v1(),
      "userid": loggedInUser.id,
      "assessment": [{
        id: uuid.v1(),
        Weight: request.body.weight,
        Chest: request.body.chest,
        Thigh: request.body.thigh,
        UpperArm: request.body.upperarm,
        Waist: request.body.waist,
        Hips: request.body.hips
      }]

    };
    const bmi = Math.round(Number(((request.body.weight) / (loggedInUser.height * loggedInUser.height))));
    const bmiCatagory = bmiC.getCatagory(bmi);
    const bmiInfo = user_bmi.getUserbmi_info(loggedInUser.id);
    const new_bmi = {
      userid: loggedInUser.id,
      bmi: bmi,
      bmiCatagory: bmiCatagory
    };
   user_bmi.addfirst_bmi_info(new_bmi);

      user_assessmentStore.addnew_user_Assessment(newAssessment);

    const viewData = {
      assessments: user_assessmentStore.getUserAssessments(loggedInUser.id),
      user: userinfo.getUserById(loggedInUser.id),
      bmiInfo: user_bmi.getUserbmi_info(loggedInUser.id),
   };
    response.render("dashboard", viewData);

    },

  deleteAssessment(request, response) {
    const assessmentid = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    user_assessmentStore.removeAssessment(assessmentid, loggedInUser.id);
    response.redirect("/dashboard");

  },
};

module.exports = dashboard;