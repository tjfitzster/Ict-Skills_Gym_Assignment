"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const logger = require("../utils/logger");


const user_assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
   listofAssessments: []
  }),
  collection: "listofAssessments",

  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  getAllassessments() {
    return this.store.findAll(this.collection);
  },

  addAssessment(id, assessment) {
    const userAssessment = this.listuserAssessments(id);

    userAssessment.assessment.push(assessment);
    this.store.save();
  },

  addnew_user_Assessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  listuserAssessments(userid) {
    return this.store.findOneBy(this.collection, { userid: userid });
  },

removeAssessment(assessmentid, userid){

  const userassessments = this.getUserAssessments(userid);
 const assessments = userassessments;

 // _.remove(assessments, { assessments.id: assessmentid });
  //this.store.save();
}


}
//module.exports = playlistStore;
module.exports = user_assessmentStore;