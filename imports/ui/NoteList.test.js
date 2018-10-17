import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import { Meteor } from "meteor/meteor";

import { notes } from "../fixtures/fixtures";
import { NoteList } from "./NoteList";

if (Meteor.isClient) {
  describe("NoteList", function() {
    //make sure when there are notes in notes array we get 2 instances of notelistitem rendered to the screen
    it("should render NoteListItem for each note", function() {
      const wrapper = mount(<NoteList notes={notes} />);

      //assertions
      expect(wrapper.find("NoteListItem").length).toBe(2);
      expect(wrapper.find("NoteListEmptyItem").length).toBe(0);
    });
    // test when there are no notes in notes array. In that case no instance of notelistitem and one instance of notelistemptyitem
    it("should render NoteListEmptyItem if zero notes", function() {
      const wrapper = mount(<NoteList notes={[]} />);

      //assertions
      expect(wrapper.find("NoteListItem").length).toBe(0);
      expect(wrapper.find("NoteListEmptyItem").length).toBe(1);
    });
  });
}
