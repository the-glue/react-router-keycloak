import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from '../index';

describe('Logout', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      redirectTo: '/dummy',
      userLoggedOut: jest.fn()
    };
    const wrapper = shallow(<Logout {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
