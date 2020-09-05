"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const logger = require("../utils/logger");

//const playlistStore = {
  //store: new JsonStore("./models/playlist-store.json", {
 // store: new JsonStore("./models/assessment-store.json", {
   // playlistCollection: []
  //}),
 // collection: "playlistCollection",
//}

const user_assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
   listofAssessments: []
  }),
  collection: "listofAssessments",

  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addAssessment(id, assessment) {
    logger.info("===============");
    logger.info("user id " + id);
    const userAssessment = this.listuserAssessments(id);
    userAssessment.assessment.push(assessment);
    this.store.save();
  },

  listuserAssessments(userid) {
    return this.store.findOneBy(this.collection, { userid: userid });

  },


}
//module.exports = playlistStore;
module.exports = user_assessmentStore;