import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Session } from "meteor/session";

import Signup from "../ui/Signup";
import Dashboard from "../ui/Dashboard";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";

//nextState involves information about the page you are going to switch into
const onEnterNotePage = nextState => {
  Session.set("selectedNoteId", nextState.params.id);
};
//prevents notes from being left on the screen when page exit
const onLeaveNotePage = () => {
  Session.set("selectedNoteId", undefined);
};
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === "unauth";
  const isAuthenticatedPage = currentPagePrivacy === "auth";

  //determine what kind of page we are on and act accordingly
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace("/dashboard");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace("/");
  }
};
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

//nexstate stores information on where app is going to go
//prevstate what stage we are coming from
export const globalOnEnter = nextState => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set("currentPagePrivacy", lastRoute.privacy);
};
//unauth = auth not required
//auth = must be auth
//do something for onEnter and onChange for all our routes
//enalbes routes with dymanic routes inside of them
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth" />
      <Route path="/dashboard" component={Dashboard} privacy="auth" />
      <Route
        path="/dashboard/:id"
        component={Dashboard}
        privacy="auth"
        onEnter={onEnterNotePage}
        onLeave={onLeaveNotePage}
      />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
