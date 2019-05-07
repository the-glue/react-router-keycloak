import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { PrivateRoute } from "./privateRoute";

describe("Private Route", () => {
  it("renders without crashing given the required props", () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
