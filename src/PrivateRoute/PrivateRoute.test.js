import React from 'react';
import { shallow } from 'enzyme';
import { PrivateRoute } from '../index';

describe('Private Route', () => {
  it('renders without crashing given the required props', () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});