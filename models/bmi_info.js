"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const logger = require("../utils/logger");

const user_bmi_info = {
  store: new JsonStore("./models/bmi_info.json", {
    bmiCollection: []
  }),
  collection: "bmiCollection",

 // getUserbmi_info(userid) {
  //  return this.store.findBy(this.collection, { userid: userid });
 // },

   getUserbmi_info(userid) {
     return this.store.findOneBy(this.collection, { userid: userid });
   },

  updatebmi_info(current_Bmi, updated_Bmi) {
    current_Bmi.userid = updated_Bmi.userid;
    current_Bmi.bmi = updated_Bmi.bmi;
    current_Bmi.bmiCatagory = updated_Bmi.bmiCatagory;
    this.store.save();
  }

}


module.exports = user_bmi_info;