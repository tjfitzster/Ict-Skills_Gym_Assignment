"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");
const userinfo = require("../models/user-store");
const user_assessmentStore = require("../models/assessment-store");

const uuid = require("uuid");

const dashboard = {
  index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
      assessments: user_assessmentStore.getUserAssessments(loggedInUser.id),
      user: userinfo.getUserById(loggedInUser.id)
    };
    response.render("dashboard", viewData);
  },

  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },

  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: []
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;