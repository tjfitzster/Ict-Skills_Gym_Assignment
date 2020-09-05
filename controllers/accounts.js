"use strict";

const memberstore = require("../models/member-store");
const logger = require("../utils/logger");
const uuid = require("uuid");


const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },
  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },
  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },
  register(request, response) {
      const user = request.body;
      user.id = uuid.v1();
    memberstore.addUser(user);
      logger.info(`registering ${user.email}`);
      response.redirect("/");
  },
  authenticate(request, response) {
    const user = memberstore.getUserByEmail(request.body.email);
    if (user.password === request.body.password) {
      response.cookie("assessment", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/");
    }
  },
  logout(request, response) {
    response.cookie("assessment", "");
    response.redirect("/");
  },
  getCurrentUser(request) {
  const userEmail = request.cookies.assessment;
    return memberstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;