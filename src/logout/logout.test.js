import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Logout } from "./logout";

describe("Logout", () => {
  it("renders without crashing given the required props", () => {
    const props = {
      userLoggedOut: jest.fn()
    };
    const wrapper = shallow(<Logout {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
