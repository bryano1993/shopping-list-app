import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import { browserHistory } from "react-router";

import { routes, onAuthChange } from "../imports/routes/routes";
import "../imports/startup/simple-schema-configuration.js";

//changes when auth status changes
// when there is change we will be able to see the new value
// keep track overtime using methods globalonchange and globalonenter
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get("currentPagePrivacy");

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

//watch for a change in selected noteid and when it does change, update url
Tracker.autorun(() => {
  const selectedNoteId = Session.get("selectedNoteId");
  Session.set("isNavOpen", false);
  //use selectenoteid session var to firgure out what note gets shown and what id is in the browser and what time is highlighted
  if (selectedNoteId) {
    //update url accordingly
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});
//allows you to run a function that depends on reactive data sources
Tracker.autorun(() => {
  const isNavOpen = Session.get("isNavOpen");

  document.body.classList.toggle("is-nav-open", isNavOpen);
});

Meteor.startup(() => {
  //sessions are used to store things
  //we store selectednoteid
  Session.set("selectedNoteId", undefined);
  Session.set("isNavOpen", false);
  ReactDOM.render(routes, document.getElementById("app"));
});
