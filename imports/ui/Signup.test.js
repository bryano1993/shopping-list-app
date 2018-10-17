import { Meteor } from "meteor/meteor";
import React from "react";
import expect from "expect";
import { mount } from "enzyme";
//login and signup component are similar so similar tests
import { Signup } from "./Signup";

if (Meteor.isClient) {
  describe("Signup", function() {
    it("should show error messages", function() {
      const error = "This is not working";
      const wrapper = mount(<Signup createUser={() => {}} />);

      wrapper.setState({ error });
      expect(wrapper.find("p").text()).toBe(error);

      wrapper.setState({ error: "" });
      expect(wrapper.find("p").length).toBe(0);
    });

    it("should call createUser with the form data", function() {
      const email = "bryan@test.com";
      const password = "password123";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />); //render sign up

      wrapper.ref("email").node.value = email;
      wrapper.ref("password").node.value = password;
      wrapper.find("form").simulate("submit");

      expect(spy.calls[0].arguments[0]).toEqual({ email, password }); //object we are expecting as email and password
    });

    it("should set error if short password", function() {
      const email = "bryan@test.com";
      const password = "123                       ";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("email").node.value = email;
      wrapper.ref("password").node.value = password;
      wrapper.find("form").simulate("submit");

      expect(wrapper.state("error").length).toBeGreaterThan(0); //assert that error state equals some value of length and that its not equal to 0
    });

    //refers to  this.props.createUser
    it("should set createUser callback errors", function() {
      const password = "password123!";
      const reason = "This is why it failed";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("password").node.value = password;
      wrapper.find("form").simulate("submit");

      spy.calls[0].arguments[1]({ reason }); //reason prop is provided
      expect(wrapper.state("error")).toBe(reason); //error state equals reason above

      spy.calls[0].arguments[1]();
      expect(wrapper.state("error").length).toBe(0);
    });
  });
}
