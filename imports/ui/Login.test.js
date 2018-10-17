import { Meteor } from "meteor/meteor";
import React from "react";
import expect from "expect";
import { mount } from "enzyme";

import { Login } from "./Login";

if (Meteor.isClient) {
  describe("Login", function() {
    //enzyme api setstate
    it("should show error messages", function() {
      const error = "This is not working";
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      expect(wrapper.find("p").text()).toBe(error);
      //finds all p tags

      wrapper.setState({ error: "" });
      expect(wrapper.find("p").length).toBe(0);
    });

    it("should call loginWithPassword with the form data", function() {
      const email = "bryan@test.com";
      const password = "password123";
      const spy = expect.createSpy();
      //value for loginwithpassword
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref("email").node.value = email; //enzyme wrapper to a dom element to manipulate
      wrapper.ref("password").node.value = password;
      wrapper.find("form").simulate("submit"); //simulate form with submit

      expect(spy.calls[0].arguments[0]).toEqual({ email }); //first assertion
      expect(spy.calls[0].arguments[1]).toBe(password); //check that the second argument is password from about
    });

    //will verify that when callback function gets fired. will verify when an error is caught
    //and when its not, it will get cleared
    it("should set loginWithPassword callback errors", function() {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find("form").simulate("submit");

      spy.calls[0].arguments[2]({});
      expect(wrapper.state("error").length).toNotBe(0);

      spy.calls[0].arguments[2]();
      expect(wrapper.state("error").length).toBe(0);
    });
  });
  //by using enzyme and its methods, assertion is more efficient
}
