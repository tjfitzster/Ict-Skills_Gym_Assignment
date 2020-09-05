'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {
  store: new JsonStore('./models/member-store.json', { Membercollection: [] }),
  collection: 'Membercollection',

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMemberassessments(memberid) {
    return this.store.findOneBy(this.collection, { id: memberid });
  },
  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },
  addAssessment(id, assessment) {
    const Membercollection = this.getMemberassessments(id);
    Membercollection.assessments.push(assessment);
    let bmi = Number(((assessment.Weight) / ((Membercollection.height)*(Membercollection.height))));
    Membercollection.bmi = Math.round(bmi);

    this.store.save();
  },
  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { id: userid });
  },

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },
}

module.exports = memberStore;