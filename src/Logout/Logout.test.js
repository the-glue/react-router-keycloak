import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from '../index';
import { configureKeycloak } from '../keycloak/keycloak';

describe('Logout', () => {
  beforeAll(() => {
    configureKeycloak('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', () => {
    const props = {
      redirectTo: '/dummy',
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    const wrapper = shallow(<Logout {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
