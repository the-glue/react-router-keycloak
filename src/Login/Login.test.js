import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../index';
import { configureKeycloak } from '../keycloak';

describe('Login', () => {
  beforeAll(() => {
    configureKeycloak();
  });
  it('renders without crashing given the required props', () => {
    const props = {
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
