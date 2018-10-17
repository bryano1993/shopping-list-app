import React from "react";
import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";

import { notes } from "../fixtures/fixtures";
import { NoteListItem } from "./NoteListItem";

//checks to see if we are in the client
if (Meteor.isClient) {
  describe("NoteListItem", function() {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    //confirms when we create a title and timestamp
    it("should render title and timestamp", function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
      //assertion = there is a title and theres a formatted date
      expect(wrapper.find("h5").text()).toBe(notes[0].title);
      expect(wrapper.find("p").text()).toBe("2/03/17");
    });

    //when we dont pass in a title or its an empty string. will confirm that default is working as expected
    it("should set default title if no title set", function() {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);

      expect(wrapper.find("h5").text()).toBe("Untitled Item");
    });

    it("should call set on click", function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);

      wrapper.find("div").simulate("click");

      expect(Session.set).toHaveBeenCalledWith("selectedNoteId", notes[0]._id);
    });
  });
}
