import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from './Logout';

describe('Logout', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      userLoggedOut: jest.fn()
    };
    const wrapper = shallow(<Logout {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
