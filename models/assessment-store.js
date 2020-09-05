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

}
//module.exports = playlistStore;
module.exports = user_assessmentStore;