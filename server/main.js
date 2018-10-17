import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import "../imports/api/users";
import "../imports/api/notes"; //import notes for server side usage
import "../imports/startup/simple-schema-configuration.js";

Meteor.startup(() => {});
