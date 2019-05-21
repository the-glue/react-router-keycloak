import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../index';

jest.mock('../keycloak');

describe('Login', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      userLoggedIn: jest.fn()
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
